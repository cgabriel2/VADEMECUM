import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Se lee antes de crear el cliente, que limpia la dirección al procesar el enlace del correo
export const esRecuperacion = location.hash.includes('type=recovery');

if (!url || !key) throw new Error('Faltan VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en .env.local');

// keepalive deja terminar el guardado aunque el celular cierre la app justo después.
// Solo para guardar los datos y el registro de uso, y si pesan menos de 50 KB (el navegador no permite más).
const enviar = (input, init = {}) => fetch(input, typeof init.body === 'string' && init.body.length < 50000 && /\/rest\/v1\/(user_data|usage_events)/.test(String(input.url || input)) ? { ...init, keepalive: true } : init);

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  global: { fetch: enviar }
});
