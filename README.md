# MedNoe

App de estudio para estudiantes de Medicina: materias, calendario de exámenes, flashcards, cuestionarios, simulacros, cuaderno de errores, fichas, horario y Pomodoro. Cada persona entra con su cuenta y sus datos se guardan en la nube (Supabase).

**App publicada:** https://mednoe.vercel.app (Vercel la actualiza sola con cada cambio que se sube a GitHub).

## Carpetas

| Carpeta / archivo | Qué es |
|---|---|
| `index.html` | La página de la app |
| `src/app.js` | La app de estudio (pantallas y funciones) |
| `src/main.js` | Inicio de sesión, guardado en la nube y registro de uso |
| `src/supabase.js` | Conexión con Supabase |
| `src/style.css` | Diseño |
| `supabase/schema.sql` | La base de datos: se pega una vez en Supabase |
| `supabase/hacer-admin.sql` | Da acceso al panel "Uso de la app" a una cuenta |
| `prototipo/` | El prototipo original, como referencia |
| `.env.local` | URL y clave publicable de Supabase (no se sube a internet) |

## Usarla en tu compu

En una terminal, dentro de esta carpeta:

```
npm install
npm run dev
```

Después abrí http://localhost:5173

Para probar sin cuenta (solo en tu compu): http://localhost:5173/?local

## Configuración de Supabase (una sola vez)

1. **Base de datos:** Supabase → SQL Editor → New query → pegá todo `supabase/schema.sql` → Run.
2. **Dirección de la app:** Authentication → URL Configuration → Site URL: `https://mednoe.vercel.app`, y en Redirect URLs agregar `http://localhost:5173` para usarla en la compu.
3. **Confirmación por email (opcional):** Authentication → Sign In / Providers → Email → "Confirm email". Si está activada, cada cuenta nueva tiene que confirmar el correo. El servicio de correo gratis de Supabase manda pocos mails por hora.
4. **Administradoras:** después de registrarte en la app, corré `supabase/hacer-admin.sql` con tu email.

## Qué se registra del uso

Cuándo entra cada persona, cuánto tiempo tiene la app abierta y en pantalla, qué secciones visita y cuántas respuestas, simulacros y bloques de Pomodoro hace. Lo ven solo las administradoras en "Uso de la app". Los datos de estudio (materias, apuntes, respuestas) son privados de cada cuenta: ni las administradoras los ven.

## IA

Las funciones con IA están apagadas (`const IA = false` en `src/app.js`). Para encenderlas hace falta conectar la API de Claude desde un servidor; queda para más adelante.
