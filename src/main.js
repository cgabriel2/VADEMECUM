// Arranque de la app: inicio de sesión, carga y guardado de los datos en Supabase y registro de uso.
// Cuando la cuenta está lista, carga app.js (la app de estudio) con todo preparado en window.__VDM__.
import { supabase, esRecuperacion } from './supabase.js';
import { crearSync } from './sync.js';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const authBox = $('#auth');
// Modo local, solo para desarrollo: http://localhost:5173/?local (sin cuenta ni nube)
const LOCAL = import.meta.env.DEV && new URLSearchParams(location.search).has('local');

/* ---------- pantallas de la cuenta ---------- */
const marca = `<div class="auth-brand"><img src="/icon.svg" alt="" width="40" height="40"><span>MedNoe</span></div>`;
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
let uid = null, sync = null;
const syncErr = $('#sync-err');
const guardar = S => { if (sync) sync.guardar(S); };
function prepararSync(){
  const fila = () => supabase.from('user_data');
  sync = crearSync({ uid, local: localStorage,
    nube: {
      leer: () => fila().select('data, updated_at').eq('user_id', uid).maybeSingle(),
      leerHora: () => fila().select('updated_at').eq('user_id', uid).maybeSingle(),
      // solo escribe si la nube sigue como la última vez que este dispositivo la vio
      escribir: (data, updated_at, hora) => fila().update({ data, updated_at }).eq('user_id', uid).eq('updated_at', hora).select('updated_at'),
      crear: (data, updated_at) => fila().upsert({ user_id: uid, data, updated_at }).select('updated_at')
    },
    alDatos: fn => (window.__VDM__ && window.__VDM__.alDatos ? window.__VDM__.alDatos(fn) : null),
    alEstado: txt => { if (txt) syncErr.textContent = txt; syncErr.hidden = !txt; } });
}
window.addEventListener('online', () => { if (sync) sync.subir(); });
// al cerrar o cambiar de app se intenta subir lo último (el pedido sigue aunque la página se cierre)
window.addEventListener('pagehide', () => { if (sync){ sync.cancelarEspera(); sync.subir(); } enviarEventos(); });

/* ---------- registro de uso ---------- */
let sesionId = null, tick = Date.now(), eventos = [];
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
  if (document.visibilityState === 'hidden'){ ping(); enviarEventos(); if (sync){ sync.cancelarEspera(); sync.subir(); } return; }
  tick = Date.now();
  // al volver: traer lo que se haya cargado en otro dispositivo
  if (sync) sync.traer().catch(() => {});
});
// con la app abierta también se revisa cada tanto, por si se está usando en otro dispositivo a la vez
setInterval(() => { if (!LOCAL && sync && document.visibilityState === 'visible') sync.traer().catch(() => {}); }, 45000);

/* ---------- entrar a la app ---------- */
let entrando = false;
async function entrar(user){
  if (entrando) return; entrando = true;
  uid = user.id; prepararSync();
  pantalla('<p class="muted">Cargando tus datos…</p>');
  let { data: perfil } = await supabase.from('profiles').select('nombre, email, is_admin').eq('id', uid).maybeSingle();
  if (!perfil) perfil = { nombre: (user.user_metadata && user.user_metadata.nombre) || user.email.split('@')[0], email: user.email, is_admin: false };
  const { data: fila, error } = await supabase.from('user_data').select('data, updated_at').eq('user_id', uid).maybeSingle();
  const ab = sync.abrir(fila, !!error);
  let datos = ab.datos, inicio = null;
  if (error){
    if (!datos){ entrando = false; return pantalla(`<h1>No se pudo cargar</h1><p class="muted small">${esc(errorTexto(error))}</p><button class="btn pri" onclick="location.reload()">Reintentar</button>`); }
    syncErr.textContent = 'Sin conexión con la nube: estás viendo lo guardado en este dispositivo.'; syncErr.hidden = false;
  } else if (!datos) inicio = await verBienvenida(perfil.nombre);
  // La terminología pesa bastante: si ya hay una copia guardada se abre con esa y se actualiza por detrás
  const guardado = glosarioGuardado(), fresco = cargarGlosario();
  const glosario = guardado || await fresco || [];
  await iniciarUso();
  track('ingreso', dispositivo());
  if (ab.rescatadas) track('rescate', ab.rescatadas);
  arrancar({ id: uid, nombre: perfil.nombre, email: perfil.email, isAdmin: !!perfil.is_admin }, datos, inicio, glosario, ab.rescatadas);
  if (ab.subir) guardar(datos);
  if (guardado) fresco.then(lista => { if (lista && window.__VDM__ && window.__VDM__.alGlosario) window.__VDM__.alGlosario(lista); });
}

/* ---------- terminología compartida (la cargan las administradoras) ---------- */
const GLOS_CACHE = 'vdm-glosario';
const CAMPOS_TERMINO = 'id, term, definition, category, source';
const glosarioGuardado = () => { try { const g = JSON.parse(localStorage.getItem(GLOS_CACHE)); return Array.isArray(g) && g.length ? g : null; } catch (e) { return null; } };
// Trae todos los términos (la nube entrega de a 1000): la primera página dice cuántos hay y el resto se pide en paralelo.
// Devuelve null si no hay conexión.
async function cargarGlosario(){
  const PAG = 1000, pagina = (desde, contar) => supabase.from('glossary_terms').select(CAMPOS_TERMINO, contar ? { count: 'exact' } : undefined).order('id').range(desde, desde + PAG - 1);
  try {
    const primera = await pagina(0, true);
    if (primera.error) throw primera.error;
    const total = primera.count ?? primera.data.length, resto = [];
    for (let desde = PAG; desde < total; desde += PAG) resto.push(pagina(desde));
    const todos = [...primera.data];
    for (const r of await Promise.all(resto)){ if (r.error) throw r.error; todos.push(...r.data); }
    try { localStorage.setItem(GLOS_CACHE, JSON.stringify(todos)); } catch (e) {}
    return todos;
  } catch (e) { return null; }
}
const limpiarTermino = t => ({ term: String(t.term || '').trim(), definition: String(t.definition || '').trim(), category: (t.category || '').trim() || null, source: (t.source || '').trim() || null });
const glosario = {
  async agregar(t){ const { data, error } = await supabase.from('glossary_terms').insert(limpiarTermino(t)).select(CAMPOS_TERMINO).single(); if (error) throw new Error(error.code === '23505' ? 'Ese término ya está cargado.' : errorTexto(error)); return data; },
  async editar(id, t){ const { data, error } = await supabase.from('glossary_terms').update(limpiarTermino(t)).eq('id', id).select(CAMPOS_TERMINO).single(); if (error) throw new Error(error.code === '23505' ? 'Ya hay otro término con ese nombre.' : errorTexto(error)); return data; },
  async borrar(id){ const { error } = await supabase.from('glossary_terms').delete().eq('id', id); if (error) throw new Error(errorTexto(error)); },
  async importar(lista){
    const nuevos = [];
    for (let i = 0; i < lista.length; i += 500){
      const { data, error } = await supabase.from('glossary_terms').upsert(lista.slice(i, i + 500).map(limpiarTermino), { onConflict: 'term_key', ignoreDuplicates: true }).select(CAMPOS_TERMINO);
      if (error) throw new Error(errorTexto(error)); nuevos.push(...(data || []));
    }
    return nuevos;
  }
};

async function salir(){
  enviarEventos(); if (sync){ sync.cancelarEspera(); await sync.subir(); }
  try { ['cache', 'pend', 'base'].forEach(k => localStorage.removeItem(`vdm-${k}-${uid}`)); } catch (e) {}
  await supabase.auth.signOut(); location.reload();
}
/* ---------- imágenes de las fichas: carpeta privada de cada cuenta en Supabase Storage ---------- */
const BUCKET_IMG = 'fichas', urlsImg = new Map();
const imagenes = {
  async subir(blob){
    const path = `${uid}/${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage.from(BUCKET_IMG).upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false });
    if (error) throw new Error(errorTexto(error)); return path;
  },
  // direcciones firmadas que duran una hora; se reutilizan mientras sirven
  async urls(paths){
    const ahora = Date.now(), faltan = paths.filter(p => !(urlsImg.get(p) && urlsImg.get(p).hasta > ahora));
    if (faltan.length){ const { data, error } = await supabase.storage.from(BUCKET_IMG).createSignedUrls(faltan, 3600); if (error) throw error;
      (data || []).forEach(d => { if (d.signedUrl) urlsImg.set(d.path, { url: d.signedUrl, hasta: ahora + 50 * 60 * 1000 }); }); }
    return paths.map(p => (urlsImg.get(p) || {}).url || '');
  },
  async borrar(paths){ if (paths.length) await supabase.storage.from(BUCKET_IMG).remove(paths); }
};
/* ---------- avisos del pomodoro con la app cerrada (notificaciones push) ----------
   El celular se registra una vez; al empezar un bloque se anota en la base "avisar a tal hora"
   y un programa en Supabase manda la notificación aunque la app esté cerrada o el celular bloqueado. */
const bytesB64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
const push = {
  disponible: () => import.meta.env.PROD && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window,
  // en el iPhone solo funciona con la app instalada en la pantalla de inicio
  esIphone: () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  instalada: () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
  async activo(){
    if (!push.disponible() || Notification.permission !== 'granted') return false;
    const reg = await navigator.serviceWorker.getRegistration(); return !!(reg && await reg.pushManager.getSubscription());
  },
  async activar(){
    let p = Notification.permission; if (p === 'default') p = await Notification.requestPermission();
    if (p !== 'granted') throw new Error('permiso');
    const reg = await navigator.serviceWorker.ready;
    const { data: clave, error } = await supabase.rpc('push_vapid_publica'); if (error || !clave) throw new Error('No se pudo preparar los avisos. Probá de nuevo en un rato.');
    const sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytesB64u(clave) });
    const j = sub.toJSON();
    const { error: e2 } = await supabase.from('push_suscripciones').upsert({ user_id: uid, endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth }, { onConflict: 'endpoint' });
    if (e2) throw new Error(errorTexto(e2));
  },
  async desactivar(){
    await push.cancelar();
    const reg = await navigator.serviceWorker.getRegistration(), sub = reg && await reg.pushManager.getSubscription();
    if (sub){ await supabase.from('push_suscripciones').delete().eq('endpoint', sub.endpoint); await sub.unsubscribe(); }
  },
  async programar(fecha, titulo, cuerpo){
    await supabase.from('push_alarmas').delete().eq('user_id', uid).is('enviada', null);
    const { error } = await supabase.from('push_alarmas').insert({ avisar_en: new Date(fecha).toISOString(), titulo, cuerpo });
    if (error) throw new Error(errorTexto(error));
  },
  async cancelar(){ await supabase.from('push_alarmas').delete().eq('user_id', uid).is('enviada', null); }
};
async function estadisticas(){ const { data, error } = await supabase.rpc('admin_stats'); if (error) throw new Error(errorTexto(error)); return data; }

function arrancar(user, data, inicio, glos, rescatadas){
  window.__VDM__ = { user, data, inicio, save: guardar, track, logout: salir, adminStats: estadisticas, glosario: glos || [], glosarioApi: glosario, imagenes, push, rescatadas };
  import('./app.js').then(() => { authBox.hidden = true; authBox.innerHTML = ''; });
}

/* ---------- inicio ---------- */
// Permite instalar la app en el teléfono y abrirla sin conexión (solo en la versión publicada)
if (import.meta.env.PROD && 'serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));

if (LOCAL){
  let datos = null; try { datos = JSON.parse(localStorage.getItem('vdm-local')); } catch (e) {}
  // Terminología de prueba guardada en este navegador; en modo local se actúa como administradora
  let glos = null; try { glos = JSON.parse(localStorage.getItem('vdm-local-glos')); } catch (e) {}
  if (!glos) glos = [
    { id: 1, term: 'Taquicardia', definition: 'Frecuencia cardíaca mayor a 100 latidos por minuto en reposo.', category: 'Signos y síntomas', source: 'Prueba local' },
    { id: 2, term: 'Bradicardia', definition: 'Frecuencia cardíaca menor a 60 latidos por minuto en reposo.', category: 'Signos y síntomas', source: 'Prueba local' },
    { id: 3, term: 'Disnea', definition: 'Sensación de falta de aire o dificultad para respirar.', category: 'Signos y síntomas', source: 'Prueba local' },
    { id: 4, term: 'Cianosis', definition: 'Coloración azulada de piel y mucosas por aumento de la hemoglobina desoxigenada.', category: 'Signos y síntomas', source: 'Prueba local' },
    { id: 5, term: '-itis', definition: 'Sufijo que indica inflamación, como en apendicitis.', category: 'Sufijos', source: 'Prueba local' },
    { id: 6, term: '-ectomía', definition: 'Sufijo que indica extirpación quirúrgica, como en apendicectomía.', category: 'Sufijos', source: 'Prueba local' }
  ];
  const guardarGlos = () => { try { localStorage.setItem('vdm-local-glos', JSON.stringify(glos)); } catch (e) {} };
  let sig = Math.max(0, ...glos.map(g => g.id)) + 1;
  const api = {
    async agregar(t){ const x = limpiarTermino(t); if (glos.some(g => g.term.toLowerCase() === x.term.toLowerCase())) throw new Error('Ese término ya está cargado.'); const row = { id: sig++, ...x }; glos.push(row); guardarGlos(); return row; },
    async editar(id, t){ const g = glos.find(x => x.id === id); Object.assign(g, limpiarTermino(t)); guardarGlos(); return { ...g }; },
    async borrar(id){ glos = glos.filter(x => x.id !== id); guardarGlos(); },
    async importar(lista){ const out = []; for (const t of lista){ const x = limpiarTermino(t); if (!glos.some(g => g.term.toLowerCase() === x.term.toLowerCase())){ const row = { id: sig++, ...x }; glos.push(row); out.push(row); } } guardarGlos(); return out; }
  };
  // En el modo de prueba las imágenes quedan en este navegador
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open('mednoe-local', 1); r.onupgradeneeded = () => r.result.createObjectStore('img'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const tx = (modo, f) => idb().then(db => new Promise((res, rej) => { const t = db.transaction('img', modo), q = f(t.objectStore('img')); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }));
  const urlsLocal = new Map();
  const imagenes = {
    async subir(blob){ const p = 'local/' + crypto.randomUUID() + '.jpg'; await tx('readwrite', st => st.put(blob, p)); return p; },
    async urls(paths){ return Promise.all(paths.map(async p => { if (!urlsLocal.has(p)){ const b = await tx('readonly', st => st.get(p)); urlsLocal.set(p, b ? URL.createObjectURL(b) : ''); } return urlsLocal.get(p); })); },
    async borrar(paths){ await tx('readwrite', st => { paths.forEach(p => st.delete(p)); }); }
  };
  window.__VDM__ = { imagenes, user: null, local: true, data: datos, inicio: new URLSearchParams(location.search).get('local') === 'vacio' ? 'vacio' : 'ejemplo',
    save: S => { try { localStorage.setItem('vdm-local', JSON.stringify(S)); } catch (e) {} }, track: () => {}, logout: () => {}, adminStats: async () => ({ usuarios: [], diario: [], eventos: [] }),
    glosario: glos.map(g => ({ ...g })), glosarioApi: api };
  import('./app.js').then(() => { authBox.hidden = true; });
} else {
  supabase.auth.getSession().then(({ data }) => {
    if (esRecuperacion && data.session) verNuevaClave(); // vino del correo para cambiar la contraseña
    else if (data.session) entrar(data.session.user);
    else verLogin(esRecuperacion ? '' : undefined);
  });
}
