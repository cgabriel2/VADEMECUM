// Service worker: guarda la app en el teléfono para que abra rápido y también sin conexión.
// Los datos (Supabase) y las fuentes siempre van por internet; acá solo se guardan los archivos de la app.
const CACHE = 'mednoe-v2';
const BASE = ['/', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // La página: primero internet (para tener siempre la última versión); sin conexión, la guardada
  if (req.mode === 'navigate'){
    e.respondWith(fetch(req).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put('/', copia)); return r; })
      .catch(() => caches.match('/')));
    return;
  }
  // Archivos de la app (tienen el nombre con versión): primero lo guardado
  e.respondWith(caches.match(req).then(guardado => guardado || fetch(req).then(r => {
    if (r.ok && (url.pathname.startsWith('/assets/') || BASE.includes(url.pathname))){ const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
    return r;
  })));
});

// Aviso del pomodoro que llega del servidor (aunque la app esté cerrada)
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.titulo || 'MedNoe', { body: d.cuerpo || '', icon: '/icon-192.png', badge: '/icon-192.png', tag: 'pomodoro', renotify: true, requireInteraction: true, vibrate: [300, 150, 300, 150, 300] }));
});
// Tocar la notificación del pomodoro trae la app al frente (o la abre)
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow('/')));
});
