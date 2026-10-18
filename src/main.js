// Arranque de la app: inicio de sesión, carga y guardado de los datos en Supabase y registro de uso.
// Cuando la cuenta está lista, carga app.js (la app de estudio) con todo preparado en window.__VDM__.
import { supabase, esRecuperacion } from './supabase.js';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const authBox = $('#auth');
// Modo local, solo para desarrollo: http://localhost:5173/?local (sin cuenta ni nube)
const LOCAL = import.meta.env.DEV && new URLSearchParams(location.search).has('local');

/* ---------- pantallas de la cuenta ---------- */
const marca = `<div class="auth-brand"><img src="/icon.svg" alt="" width="40" height="40"><span>Vademécum</span></div>`;
function pantalla(html){ authBox.hidden = false; authBox.innerHTML = `<div class="auth-card">${marca}${html}</div>`; const f = authBox.querySelector('input'); f && f.focus(); }
const msg = (texto, tipo = 'err') => { const m = $('#auth-msg'); if (m){ m.textContent = texto; m.className = 'auth-msg ' + tipo; } };
const ocupado = (form, si, texto) => { const b = form.querySelector('[type=submit]'); if (!b) return; if (si){ b.dataset.txt = b.textContent; b.textContent = texto; } else if (b.dataset.txt) b.textContent = b.dataset.txt; b.disabled = si; };

function errorTexto(e){
  const c = (e && (e.code || '')) + ' ' + (e && e.message || '');
  if (/invalid_credentials|Invalid login credentials/i.test(c)) return 'El email o la contraseña no son correctos.';
  if (/user_already_exists|already registered/i.test(c)) return 'Ya existe una cuenta con ese email. Probá iniciar sesión.';
  if (/email_not_confirmed|not confirmed/i.test(c)) return 'Todavía no confirmaste tu email. Revisá tu correo (y la carpeta de spam).';
  if (/weak_password|at least 6|Password should/i.test(c)) return 'La contraseña tiene que tener al menos 6 caracteres.';
  if (/rate|over_email_send|429/i.test(c)) return 'Se hicieron muchos intentos seguidos. Esperá unos minutos y probá de nuevo.';
  if (/invalid.*email|email_address_invalid/i.test(c)) return 'Ese email no parece válido. Revisalo.';
  if (/fetch|network/i.test(c)) return 'No hay conexión con el servidor. Revisá tu internet.';
  return 'No se pudo completar. ' + (e && e.message ? e.message : 'Probá de nuevo.');
}

function verLogin(aviso){
  pantalla(`<h1>Iniciar sesión</h1><p class="muted small">Entrá con tu cuenta para ver tus materias y tu progreso.</p>
    <form class="stack" style="gap:12px" id="f-login">
      <label class="f">Email<input type="email" id="a-email" autocomplete="email" required></label>
      <label class="f">Contraseña<input type="password" id="a-pass" autocomplete="current-password" required></label>
      <p class="auth-msg ${aviso ? 'ok' : ''}" id="auth-msg">${esc(aviso || '')}</p>
      <button class="btn pri" type="submit">Entrar</button>
    </form>
    <div class="auth-links"><button class="auth-link" data-auth="registro">Crear una cuenta</button><button class="auth-link" data-auth="olvide">Olvidé mi contraseña</button></div>`);
}
function verRegistro(){
  pantalla(`<h1>Crear cuenta</h1><p class="muted small">Cada cuenta tiene sus propios datos: nadie más ve tus materias ni tu progreso.</p>
    <form class="stack" style="gap:12px" id="f-registro">
      <label class="f">Nombre<input type="text" id="a-nombre" autocomplete="given-name" required maxlength="40"></label>
      <label class="f">Email<input type="email" id="a-email" autocomplete="email" required></label>
      <label class="f">Contraseña<input type="password" id="a-pass" autocomplete="new-password" required minlength="6"><span class="small muted" style="font-weight:400">Al menos 6 caracteres.</span></label>
      <p class="note">Para mejorar la app registramos cuándo entrás, cuánto tiempo la usás y qué secciones visitás. No compartimos esos datos con nadie.</p>
      <p class="auth-msg" id="auth-msg"></p>
      <button class="btn pri" type="submit">Crear cuenta</button>
    </form>
    <div class="auth-links"><button class="auth-link" data-auth="login">Ya tengo cuenta</button></div>`);
}
function verOlvide(){
  pantalla(`<h1>Recuperar contraseña</h1><p class="muted small">Te mandamos un correo con un enlace para elegir una contraseña nueva.</p>
    <form class="stack" style="gap:12px" id="f-olvide">
      <label class="f">Email<input type="email" id="a-email" autocomplete="email" required></label>
      <p class="auth-msg" id="auth-msg"></p>
      <button class="btn pri" type="submit">Enviar enlace</button>
    </form>
    <div class="auth-links"><button class="auth-link" data-auth="login">Volver</button></div>`);
}
function verNuevaClave(){
  pantalla(`<h1>Contraseña nueva</h1><p class="muted small">Elegí la contraseña que vas a usar desde ahora.</p>
    <form class="stack" style="gap:12px" id="f-nueva">
      <label class="f">Contraseña nueva<input type="password" id="a-pass" autocomplete="new-password" required minlength="6"></label>
      <p class="auth-msg" id="auth-msg"></p>
      <button class="btn pri" type="submit">Guardar contraseña</button>
    </form>`);
}
function verBienvenida(nombre){
  return new Promise(resolve => {
    pantalla(`<h1>¡Hola${nombre ? ', ' + esc(nombre) : ''}!</h1><p class="muted small">¿Cómo querés empezar? Después podés cambiar todo lo que quieras.</p>
      <div class="stack" style="gap:10px">
        <button class="auth-opt" data-inicio="vacio"><b>Empezar de cero</b><span>Cargás tus materias, temas y fechas. Las fichas de fármacos y enfermedades ya vienen incluidas.</span></button>
        <button class="auth-opt" data-inicio="ejemplo"><b>Ver con datos de ejemplo</b><span>Arranca con materias, fechas y flashcards de muestra para recorrer la app. Las podés borrar cuando quieras.</span></button>
      </div>`);
    authBox.querySelectorAll('[data-inicio]').forEach(b => b.addEventListener('click', () => resolve(b.dataset.inicio)));
  });
}

authBox.addEventListener('click', e => {
  const b = e.target.closest('[data-auth]'); if (!b) return;
  ({ login: () => verLogin(), registro: verRegistro, olvide: verOlvide })[b.dataset.auth]();
});
authBox.addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target, email = ($('#a-email') || {}).value, pass = ($('#a-pass') || {}).value;
  if (f.id === 'f-login'){
    ocupado(f, true, 'Entrando…');
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pass });
    ocupado(f, false); if (error) return msg(errorTexto(error));
    entrar(data.user);
  }
  if (f.id === 'f-registro'){
    const nombre = $('#a-nombre').value.trim();
    ocupado(f, true, 'Creando…');
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password: pass, options: { data: { nombre }, emailRedirectTo: location.origin } });
    ocupado(f, false); if (error) return msg(errorTexto(error));
    if (data.session) entrar(data.user);
    else verLogin('Te mandamos un correo para confirmar tu cuenta. Abrí el enlace y después iniciá sesión acá.');
  }
  if (f.id === 'f-olvide'){
    ocupado(f, true, 'Enviando…');
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: location.origin });
    ocupado(f, false); if (error) return msg(errorTexto(error));
    msg('Listo. Si hay una cuenta con ese email, te llega un correo en unos minutos.', 'ok');
  }
  if (f.id === 'f-nueva'){
    ocupado(f, true, 'Guardando…');
    const { data, error } = await supabase.auth.updateUser({ password: pass });
    ocupado(f, false); if (error) return msg(errorTexto(error));
    entrar(data.user);
  }
});

/* ---------- guardado en la nube ---------- */
let uid = null, pendiente = null, guardando = false, ultimoSync = 0, timerGuardar = null;
const syncErr = $('#sync-err');
const cacheKey = () => 'vdm-cache-' + uid;
function guardar(S){
  pendiente = S;
  try { localStorage.setItem(cacheKey(), JSON.stringify(S)); } catch (e) {}
  clearTimeout(timerGuardar); timerGuardar = setTimeout(subir, 1500);
}
async function subir(){
  if (!pendiente || guardando) return;
  guardando = true; const datos = pendiente; pendiente = null;
  const ahora = new Date().toISOString();
  const { error } = await supabase.from('user_data').upsert({ user_id: uid, data: datos, updated_at: ahora });
  guardando = false;
  if (error){
    if (!pendiente) pendiente = datos;
    syncErr.textContent = 'No se pudo guardar en la nube. Tus cambios quedan en este dispositivo y se reintenta solo.'; syncErr.hidden = false;
    clearTimeout(timerGuardar); timerGuardar = setTimeout(subir, 15000);
  } else {
    ultimoSync = Date.parse(ahora); syncErr.hidden = true;
    if (pendiente){ clearTimeout(timerGuardar); timerGuardar = setTimeout(subir, 1500); }
  }
}
window.addEventListener('online', () => { if (pendiente) subir(); });

/* ---------- registro de uso ---------- */
let sesionId = null, tick = Date.now(), eventos = [], ocultoDesde = 0;
const dispositivo = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Celular' : 'Computadora';
async function iniciarUso(){
  const { data } = await supabase.from('usage_sessions').insert({ user_id: uid, device: dispositivo() }).select('id').single();
  sesionId = data ? data.id : null; tick = Date.now();
  setInterval(() => { if (document.visibilityState === 'visible') ping(); }, 60000);
  setInterval(enviarEventos, 30000);
}
function ping(){
  const seg = Math.min(120, Math.round((Date.now() - tick) / 1000)); tick = Date.now();
  if (sesionId && seg > 0) supabase.rpc('track_ping', { p_session: sesionId, p_seconds: seg }).then(() => {}, () => {});
}
function track(evento, detalle){ if (uid) eventos.push({ user_id: uid, evento: String(evento).slice(0, 40), detalle: detalle == null ? null : String(detalle).slice(0, 60) }); }
function enviarEventos(){ if (!eventos.length) return; const lote = eventos.splice(0, 200); supabase.from('usage_events').insert(lote).then(({ error }) => { if (error) eventos.unshift(...lote.slice(0, 200)); }); }
document.addEventListener('visibilitychange', async () => {
  if (LOCAL || !uid) return;
  if (document.visibilityState === 'hidden'){ ping(); enviarEventos(); clearTimeout(timerGuardar); subir(); ocultoDesde = Date.now(); return; }
  tick = Date.now();
  // Si se usó la app en otro dispositivo mientras tanto, recargar para traer lo último
  if (ocultoDesde && Date.now() - ocultoDesde > 120000 && !pendiente && !guardando){
    const { data } = await supabase.from('user_data').select('updated_at').eq('user_id', uid).maybeSingle();
    if (data && Date.parse(data.updated_at) > ultimoSync + 1000) location.reload();
  }
});

/* ---------- entrar a la app ---------- */
let entrando = false;
async function entrar(user){
  if (entrando) return; entrando = true;
  uid = user.id;
  pantalla('<p class="muted">Cargando tus datos…</p>');
  let { data: perfil } = await supabase.from('profiles').select('nombre, email, is_admin').eq('id', uid).maybeSingle();
  if (!perfil) perfil = { nombre: (user.user_metadata && user.user_metadata.nombre) || user.email.split('@')[0], email: user.email, is_admin: false };
  const { data: fila, error } = await supabase.from('user_data').select('data, updated_at').eq('user_id', uid).maybeSingle();
  let datos = null, inicio = null;
  let cache = null; try { cache = JSON.parse(localStorage.getItem(cacheKey())); } catch (e) {}
  if (error){
    if (!cache){ entrando = false; return pantalla(`<h1>No se pudo cargar</h1><p class="muted small">${esc(errorTexto(error))}</p><button class="btn pri" onclick="location.reload()">Reintentar</button>`); }
    datos = cache; syncErr.textContent = 'Sin conexión con la nube: estás viendo lo guardado en este dispositivo.'; syncErr.hidden = false;
  } else if (fila){ datos = fila.data; ultimoSync = Date.parse(fila.updated_at); }
  else if (cache) datos = cache;
  else inicio = await verBienvenida(perfil.nombre);
  await iniciarUso();
  track('ingreso', dispositivo());
  arrancar({ id: uid, nombre: perfil.nombre, email: perfil.email, isAdmin: !!perfil.is_admin }, datos, inicio);
}

async function salir(){
  enviarEventos(); clearTimeout(timerGuardar); await subir();
  try { localStorage.removeItem(cacheKey()); } catch (e) {}
  await supabase.auth.signOut(); location.reload();
}
async function estadisticas(){ const { data, error } = await supabase.rpc('admin_stats'); if (error) throw new Error(errorTexto(error)); return data; }

function arrancar(user, data, inicio){
  window.__VDM__ = { user, data, inicio, save: guardar, track, logout: salir, adminStats: estadisticas };
  import('./app.js').then(() => { authBox.hidden = true; authBox.innerHTML = ''; });
}

/* ---------- inicio ---------- */
// Permite instalar la app en el teléfono y abrirla sin conexión (solo en la versión publicada)
if (import.meta.env.PROD && 'serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));

if (LOCAL){
  let datos = null; try { datos = JSON.parse(localStorage.getItem('vdm-local')); } catch (e) {}
  window.__VDM__ = { user: null, data: datos, inicio: new URLSearchParams(location.search).get('local') === 'vacio' ? 'vacio' : 'ejemplo',
    save: S => { try { localStorage.setItem('vdm-local', JSON.stringify(S)); } catch (e) {} }, track: () => {}, logout: () => {}, adminStats: async () => ({ usuarios: [], diario: [], eventos: [] }) };
  import('./app.js').then(() => { authBox.hidden = true; });
} else {
  supabase.auth.getSession().then(({ data }) => {
    if (esRecuperacion && data.session) verNuevaClave(); // vino del correo para cambiar la contraseña
    else if (data.session) entrar(data.session.user);
    else verLogin(esRecuperacion ? '' : undefined);
  });
}
