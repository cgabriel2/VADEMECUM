// Manda los avisos del pomodoro que ya vencieron, como notificaciones push.
// La llama el cron de la base cada 30 segundos (solo cuando hay avisos vencidos) con un token secreto.
// Las claves VAPID viven en Vault: si todavia no existen, se generan aca la primera vez.
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
const b64u = (u8: Uint8Array) => btoa(String.fromCharCode(...u8)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const desdeB64u = (s: string) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));

type Config = { vapid_privada: string | null; vapid_publica: string | null; token: string | null };

async function conClaves(cfg: Config): Promise<Config> {
  if (cfg.vapid_privada && cfg.vapid_publica) return cfg;
  const par = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
  const jwk = await crypto.subtle.exportKey('jwk', par.privateKey);
  const publica = b64u(new Uint8Array([4, ...desdeB64u(jwk.x!), ...desdeB64u(jwk.y!)]));
  const { error } = await db.rpc('push_guardar_claves', { p_privada: jwk.d, p_publica: publica });
  if (error) throw error;
  const { data } = await db.rpc('push_config');
  return data as Config;
}

Deno.serve(async (req: Request) => {
  const { data: cfg0, error } = await db.rpc('push_config');
  if (error || !cfg0?.token || req.headers.get('x-token') !== cfg0.token) return new Response('No autorizado', { status: 401 });
  const cfg = await conClaves(cfg0 as Config);
  webpush.setVapidDetails('https://mednoe.vercel.app', cfg.vapid_publica!, cfg.vapid_privada!);

  // se marcan como enviadas al tomarlas, asi dos llamadas seguidas no mandan el mismo aviso dos veces
  const hasta = new Date(Date.now() + 5000).toISOString();
  const { data: alarmas, error: e1 } = await db.from('push_alarmas').update({ enviada: new Date().toISOString() })
    .is('enviada', null).lte('avisar_en', hasta).select('id, user_id, titulo, cuerpo');
  if (e1) return Response.json({ error: e1.message }, { status: 500 });

  let enviadas = 0, fallidas = 0;
  for (const a of alarmas ?? []) {
    const { data: subs } = await db.from('push_suscripciones').select('id, endpoint, p256dh, auth').eq('user_id', a.user_id);
    for (const s of subs ?? []) {
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify({ titulo: a.titulo, cuerpo: a.cuerpo }), { TTL: 900, urgency: 'high' });
        enviadas++;
      } catch (e) {
        fallidas++;
        const code = (e as { statusCode?: number }).statusCode;
        // el celular ya no acepta avisos (desinstalo la app o saco el permiso): se borra
        if (code === 404 || code === 410) await db.from('push_suscripciones').delete().eq('id', s.id);
        else console.error('push fallo', code, (e as { body?: string }).body ?? String(e));
      }
    }
  }
  // limpieza: avisos de mas de un dia
  await db.from('push_alarmas').delete().lt('created_at', new Date(Date.now() - 86400000).toISOString());
  return Response.json({ alarmas: alarmas?.length ?? 0, enviadas, fallidas });
});
