# Handoff: formulario de contacto con Resend (para reutilizar en neosuma)

Objetivo: que el formulario de contacto de **neosuma.com** envíe el correo con Resend, usando la clave
global de `E:\master.env`, y que el mensaje llegue a **contacto@neosuma.com**.

Referencia ya implementada y desplegada: `io-docusia` (docusia.com), commits `6ced96d` y `c4131f7`.
Archivos de referencia: `src/app/api/contact/route.js`, `src/components/Contact/data/contactApi.js`,
`src/components/Contact/ContactForm.jsx`.

## 1. Credenciales (NO copiar valores a ficheros versionados)

| Dato | Dónde está |
|------|-----------|
| API key de Resend | `E:\master.env` -> `GLOBAL_RESEND_API_KEY` (mismo valor que `RESEND_API_KEY`) |
| Remitente (From) | `contacto@neosuma.com` |
| Destinatario (To) | `contacto@neosuma.com` (en docusia se usó `ricardo@neosuma.com`) |

Variables que debe leer el proyecto (nombres sugeridos para neosuma, no reusar los de DOCUSIA):
`RESEND_API_KEY`, `NEOSUMA_CONTACT_FROM`, `NEOSUMA_CONTACT_TO`.

## 2. Estado que NO está confirmado

- **No se ha probado un envío real** ni en docusia. Solo se comprobó que `/api/contact` responde 400 con
  payload vacío (implica que la clave está cargada).
- **Falta verificar el dominio `neosuma.com` en Resend** (panel Resend -> Domains: registros DKIM/SPF).
  Sin eso, Resend rechazará el remitente `contacto@neosuma.com`. Para una prueba rápida se puede usar
  `onboarding@resend.dev`, que solo entrega al correo del propietario de la cuenta.
- No se ha revisado el código del formulario actual de neosuma (el usuario indica que ya tiene ruta con
  Zod, rate limit, honeypot y escape). Primer paso de la sesión nueva: leerlo y localizar dónde se envía
  el correo hoy (en `E:\git` cada repo es independiente; `neosuma` no está en el índice
  `E:\git\CLAUDE.md`, localizar su carpeta y su `CLAUDE.md`).

## 3. Patrón implementado (Next.js 14 App Router)

1. `pnpm add resend` dentro del repo (no desde `E:\git`).
2. `POST /api/contact` (route handler):
   - Crear el cliente **dentro del handler**, no a nivel de módulo:
     `new Resend(key)` sin clave lanza error y **rompe `next build`** ("Missing API key").
   - Sin clave -> responder `503 { ok:false, reason:"email_not_configured" }`.
   - Validar en servidor (nombre, email con regex, mensaje...) -> `400 { ok:false, reason:"invalid_data", fields:[...] }`.
   - `resend.emails.send({ from, to, replyTo: data.email, subject, html })`; si `response.error`
     -> `500 { ok:false, reason:"send_failed" }`.
   - Éxito -> `{ ok:true }`.
3. Cliente (`contactApi.js`): `fetch("/api/contact", { method:"POST", body: JSON.stringify(payload) })`
   y devolver el JSON; en fallo de red `{ ok:false, reason:"network_error" }`.
4. UI: tratar `ok`, `email_not_configured` (aviso "pendiente") y cualquier otro fallo (mensaje de error).

## 3.1 Protecciones (ya aplicadas en docusia; neosuma ya las tiene según el usuario)

Según el usuario, el formulario de neosuma ya usa Zod, escapa HTML, tiene rate limiting + honeypot y el
patrón de respuesta `{ ok: true | false, error? }` (docusia usa `reason`). En neosuma **no hay que
rehacer nada de esto**: solo reutilizar `GLOBAL_RESEND_API_KEY` y apuntar el destinatario a
`contacto@neosuma.com`. Verificar leyendo su código que de verdad escapa cada campo interpolado en el HTML.

Aplicado en docusia (`src/app/api/contact/route.js`):
- Escape HTML de todos los campos y del mensaje en el correo.
- Motivo validado contra la lista `CONTACT_MOTIVES`; longitudes máximas y tipos string en servidor.
- Rate limit por IP (5 por hora, en memoria) -> `429 rate_limited`.
- Honeypot `website` comprobado en servidor (limitado: un bot que llame a la API sin ese campo lo esquiva;
  el freno real es el rate limit).
- Asunto en una sola línea y truncado.

## 4. Despliegue en el servidor (lecciones de esta sesión)

- Neosuma se sirve por Coolify + Traefik (`IO_NEOSUMA_COOLIFY_APP_UUID` en `E:\master.env`). Averiguar
  primero **cómo se despliega realmente** (Coolify app o docker compose en `/opt/...`) antes de tocar nada.
  Docusia usa `docker-compose.yml` + `.env` **no versionados** en `/opt/io-docusia` (VPS Interno).
- **Nunca sobrescribir el `.env` del servidor sin hacer antes copia** (`cp .env .env.bak`) y **añadir**
  solo las variables nuevas. En esta sesión se pisó el `.env` y se introdujeron `DOCUSIA_AUTH_*=changeme`,
  que habrían dejado el login con credenciales triviales (corregido).
- **No lanzar `docker compose up --build` por SSH en primer plano**: por timeout se cortó a mitad y dejó
  el contenedor parado (sitio caído). Hacer `docker compose build` con `nohup ... > /tmp/x.log &`, esperar
  a "Built", y solo entonces `docker compose up -d --no-build`.
- Si queda un contenedor renombrado tipo `344a27793c9f_io-docusia`, compose lo trata como suyo y da
  "name already in use": eliminarlo antes de `up`.
- Orden correcto: commit -> `git push` -> `git pull` en el servidor -> build -> up -> verificar.
- Las variables cargadas en el contenedor se ven con `docker exec <c> env | cut -d= -f1` (solo nombres).
- La API de Coolify: `GET /api/v1/projects/<id>/environments/<id>/applications` dio 404 con el token de
  `master.env`. No se probó `/api/v1/applications/<uuid>/envs`; verificarlo si se quiere usar la API.

## 5. Verificación al terminar

1. `curl -X POST <url>/api/contact -H 'Content-Type: application/json' -d '{}'` -> 400 `invalid_data`
   (503 significaría que falta la clave en el contenedor).
2. Enviar un formulario real y confirmar que llega a `contacto@neosuma.com` (revisar spam) y que el
   "Responder" apunta al email del visitante.
3. Panel Resend -> Logs: comprobar el estado de entrega.

## 6. Seguridad

- La clave de Resend se pegó en el chat de la sesión de docusia; si eso es un problema, rotarla en
  https://resend.com/api-keys y actualizar `GLOBAL_RESEND_API_KEY` y `RESEND_API_KEY` en `E:\master.env`
  y en el `.env` de `/opt/io-docusia`.
- `E:\master.env` contiene muchas credenciales en claro; no copiarlo entero a ningún repo ni a docs.
