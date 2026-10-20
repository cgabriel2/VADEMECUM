-- =====================================================================
-- MedNoe: base de datos
-- Pegá todo este archivo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a correr sin romper nada (no borra datos).
-- =====================================================================

-- 1. Perfiles: una fila por cuenta, se crea sola al registrarse -------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

-- 2. Datos de estudio de cada cuenta (materias, flashcards, progreso, etc.) --
create table if not exists public.user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3. Registro de uso: sesiones (tiempo en la app) y eventos (qué hacen) -----
create table if not exists public.usage_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_ping_at timestamptz not null default now(),
  seconds integer not null default 0,
  device text
);
create index if not exists usage_sessions_user_idx on public.usage_sessions (user_id, started_at desc);

create table if not exists public.usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  evento text not null,
  detalle text
);
create index if not exists usage_events_time_idx on public.usage_events (created_at desc);
create index if not exists usage_events_user_idx on public.usage_events (user_id);

-- 4. ¿Quien pregunta es administradora? En un esquema privado: no se puede llamar desde la API
create schema if not exists private;
grant usage on schema private to authenticated;
create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = (select auth.uid())), false);
$$;
revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

-- 5. Crear el perfil automáticamente al registrarse -------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, nombre)
  values (new.id, new.email, coalesce(nullif(new.raw_user_meta_data->>'nombre', ''), split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 6. Seguridad: cada persona ve y modifica solo lo suyo ---------------------
alter table public.profiles enable row level security;
alter table public.user_data enable row level security;
alter table public.usage_sessions enable row level security;
alter table public.usage_events enable row level security;

drop policy if exists "perfil propio o admin" on public.profiles;
create policy "perfil propio o admin" on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()));
drop policy if exists "editar perfil propio" on public.profiles;
create policy "editar perfil propio" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
-- Nadie puede darse permisos de administradora desde la app: solo se puede cambiar el nombre
revoke update on public.profiles from authenticated, anon;
grant update (nombre) on public.profiles to authenticated;

-- Los datos de estudio son privados: ni las administradoras los ven
drop policy if exists "datos propios: leer" on public.user_data;
create policy "datos propios: leer" on public.user_data for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "datos propios: crear" on public.user_data;
create policy "datos propios: crear" on public.user_data for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "datos propios: actualizar" on public.user_data;
create policy "datos propios: actualizar" on public.user_data for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

drop policy if exists "sesiones: leer propias o admin" on public.usage_sessions;
create policy "sesiones: leer propias o admin" on public.usage_sessions for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));
drop policy if exists "sesiones: crear propias" on public.usage_sessions;
create policy "sesiones: crear propias" on public.usage_sessions for insert to authenticated with check (user_id = (select auth.uid()));

drop policy if exists "eventos: crear propios" on public.usage_events;
create policy "eventos: crear propios" on public.usage_events for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "eventos: leer admin" on public.usage_events;
create policy "eventos: leer admin" on public.usage_events for select to authenticated using ((select private.is_admin()));

-- 7. Sumar tiempo de uso (la app lo llama cada minuto mientras está en pantalla)
create or replace function public.track_ping(p_session uuid, p_seconds integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.usage_sessions
     set seconds = seconds + greatest(0, least(coalesce(p_seconds, 0), 120)), last_ping_at = now()
   where id = p_session and user_id = auth.uid();
  update public.profiles set last_seen_at = now() where id = auth.uid();
end $$;

-- 8. Estadísticas para el panel "Uso de la app" (solo administradoras) ------
create or replace function public.admin_stats()
returns json language plpgsql stable security definer set search_path = public as $$
declare r json;
begin
  if not private.is_admin() then raise exception 'No autorizado'; end if;
  select json_build_object(
    'usuarios', (select coalesce(json_agg(u order by u.ultimo desc nulls last), '[]'::json) from (
      select p.id, p.nombre, p.email, p.is_admin, p.created_at as registrada,
             greatest(p.last_seen_at, (select max(s.started_at) from public.usage_sessions s where s.user_id = p.id)) as ultimo,
             coalesce((select sum(s.seconds) from public.usage_sessions s where s.user_id = p.id), 0) as seg_total,
             coalesce((select sum(s.seconds) from public.usage_sessions s where s.user_id = p.id and s.started_at > now() - interval '7 days'), 0) as seg_7d,
             (select count(*) from public.usage_sessions s where s.user_id = p.id) as sesiones
        from public.profiles p) u),
    'diario', (select coalesce(json_agg(d order by d.dia), '[]'::json) from (
      select to_char((s.started_at at time zone 'America/Argentina/Buenos_Aires')::date, 'YYYY-MM-DD') as dia,
             count(distinct s.user_id) as usuarias, sum(s.seconds) as segundos
        from public.usage_sessions s
       where s.started_at > now() - interval '31 days'
       group by 1) d),
    'eventos', (select coalesce(json_agg(e), '[]'::json) from (
      select evento, detalle, count(*) as n
        from public.usage_events
       where created_at > now() - interval '30 days'
       group by evento, detalle) e)
  ) into r;
  return r;
end $$;

-- 9. Permisos de las funciones: nada se puede llamar sin haber iniciado sesión
revoke execute on function public.admin_stats() from public, anon;
revoke execute on function public.track_ping(uuid, integer) from public, anon;
grant execute on function public.admin_stats() to authenticated;
grant execute on function public.track_ping(uuid, integer) to authenticated;

-- 10. Terminología general compartida: la leen todas las cuentas, la editan solo administradoras
create table if not exists public.glossary_terms (
  id bigint generated always as identity primary key,
  term text not null check (length(trim(term)) > 0),
  definition text not null check (length(trim(definition)) > 0),
  category text,
  source text,
  term_key text generated always as (lower(trim(term))) stored unique,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists glossary_terms_created_by_idx on public.glossary_terms (created_by);
alter table public.glossary_terms enable row level security;
drop policy if exists "terminos: leer" on public.glossary_terms;
create policy "terminos: leer" on public.glossary_terms for select to authenticated using (true);
drop policy if exists "terminos: crear admin" on public.glossary_terms;
create policy "terminos: crear admin" on public.glossary_terms for insert to authenticated with check ((select private.is_admin()));
drop policy if exists "terminos: editar admin" on public.glossary_terms;
create policy "terminos: editar admin" on public.glossary_terms for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
drop policy if exists "terminos: borrar admin" on public.glossary_terms;
create policy "terminos: borrar admin" on public.glossary_terms for delete to authenticated using ((select private.is_admin()));
