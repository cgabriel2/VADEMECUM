-- Da permiso de administradora (ver el panel "Uso de la app") a una cuenta ya registrada.
-- Cambiá el email por el de la cuenta y corré esto en Supabase → SQL Editor.
update public.profiles set is_admin = true where email = 'EMAIL_DE_LA_CUENTA@ejemplo.com';

-- Para ver quiénes son administradoras:
-- select nombre, email, is_admin from public.profiles order by created_at;
