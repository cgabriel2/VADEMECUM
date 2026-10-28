// Arranque de la app: inicio de sesión, carga y guardado de los datos en Supabase y registro de uso.
// Cuando la cuenta está lista, carga app.js (la app de estudio) con todo preparado en window.__VDM__.
import { supabase, esRecuperacion } from './supabase.js';

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
let uid = null, pendiente = null, guardando = false, ultimoSync = 0, timerGuardar = null;
const syncErr = $('#sync-err');
const cacheKey = () => 'vdm-cache-' + uid;
// Marca de "hay cambios en este dispositivo que todavía no llegaron a la nube" (con la hora del cambio).
// Si el celular cierra la app antes de subirlos, al volver a abrirla se usan estos y no la copia vieja de la nube.
const pendKey = () => 'vdm-pend-' + uid;
function guardar(S){
  pendiente = S;
  try { localStorage.setItem(cacheKey(), JSON.stringify(S)); localStorage.setItem(pendKey(), String(Date.now())); } catch (e) {}
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
    else try { localStorage.removeItem(pendKey()); } catch (e) {}
  }
}
window.addEventListener('online', () => { if (pendiente) subir(); });
// al cerrar o cambiar de app se intenta subir lo último (el pedido sigue aunque la página se cierre)
window.addEventListener('pagehide', () => { if (pendiente){ clearTimeout(timerGuardar); subir(); } enviarEventos(); });

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
let entrando = false, subirAlEntrar = false;
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
  } else if (fila){
    datos = fila.data; ultimoSync = Date.parse(fila.updated_at);
    // la última vez se cerró antes de subir: lo de este dispositivo es más nuevo que la nube
    let marca = 0; try { marca = Number(localStorage.getItem(pendKey())) || 0; } catch (e) {}
    if (cache && marca > ultimoSync){ datos = cache; subirAlEntrar = true; }
  }
  else if (cache) datos = cache;
  else inicio = await verBienvenida(perfil.nombre);
  // La terminología pesa bastante: si ya hay una copia guardada se abre con esa y se actualiza por detrás
  const guardado = glosarioGuardado(), fresco = cargarGlosario();
  const glosario = guardado || await fresco || [];
  await iniciarUso();
  track('ingreso', dispositivo());
  arrancar({ id: uid, nombre: perfil.nombre, email: perfil.email, isAdmin: !!perfil.is_admin }, datos, inicio, glosario);
  if (subirAlEntrar) guardar(datos);
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
  enviarEventos(); clearTimeout(timerGuardar); await subir();
  try { localStorage.removeItem(cacheKey()); } catch (e) {}
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
async function estadisticas(){ const { data, error } = await supabase.rpc('admin_stats'); if (error) throw new Error(errorTexto(error)); return data; }

function arrancar(user, data, inicio, glos){
  window.__VDM__ = { user, data, inicio, save: guardar, track, logout: salir, adminStats: estadisticas, glosario: glos || [], glosarioApi: glosario, imagenes };
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
