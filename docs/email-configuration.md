# Configuración de Email — Formulario de Contacto

## 📋 Resumen

El formulario de contacto de Docusia ahora está configurado para enviar correos automáticamente usando **Resend**, un servicio transaccional moderno optimizado para Next.js.

**Estado actual:**
- ✅ Endpoint `/api/contact` implementado
- ✅ Validación de formulario y datos
- ✅ Template HTML profesional
- ✅ Soporte para reply-to automático
- ⏳ Requiere configuración de variables de entorno en producción

---

## 🔧 Configuración Requerida

### 1. Obtener API Key de Resend

1. Ir a https://resend.com/signup
2. Crear cuenta (gratuito)
3. Copiar la API Key desde https://resend.com/api-keys
4. La clave debe empezar con `re_`

### 2. Verificar Email de "From"

**Importante:** En producción, el email de `DOCUSIA_CONTACT_EMAIL` debe estar verificado en Resend:

1. En el panel de Resend, ir a **Domains**
2. Hacer clic en **Add Domain** o **Verify Email**
3. Si es dominio propio (ej. `info@docusia.es`):
   - Agregar registros DNS indicados por Resend
   - Esperar verificación (5-30 minutos)
4. Si prefieres email de Resend (para pruebas):
   - Usar formato: `onboarding@resend.dev` (solo para testing)

### 3. Configurar Variables de Entorno

**En desarrollo** (`E:\master.env` o `.env.local`):

```env
RESEND_API_KEY=re_your_actual_api_key_here
DOCUSIA_CONTACT_EMAIL=info@docusia.es
DOCUSIA_ADMIN_EMAILS=team@docusia.es,backup@docusia.es
```

**En producción** (panel Coolify):

1. Ir al panel de producción de io-docusia
2. Environment variables → Add new
3. Agregar las 3 variables de arriba
4. Guardar y redeploy

---

## 📧 Flujo de Email

### Cuando se envía el formulario:

```
Usuario llena formulario en /contacto
         ↓
Validación en cliente (JavaScript)
         ↓
POST /api/contact {name, email, company, message, ...}
         ↓
Validación en servidor
         ↓
Enviar con Resend (from: DOCUSIA_CONTACT_EMAIL)
         ↓
Admin recibe en: DOCUSIA_ADMIN_EMAILS[0]
Reply-to automático: email del usuario
```

### Template de Email

- **From:** info@docusia.es (o tu dominio verificado)
- **To:** admin@docusia.es (primer email de DOCUSIA_ADMIN_EMAILS)
- **Reply-To:** email@usuario.com (automático)
- **Asunto:** `Nueva consulta: {motivo} — {nombre}`
- **Contenido:** Tabla HTML con todos los campos + mensaje

---

## 🚀 Testing Local

### Opción 1: Con Resend Real (Recomendado)

1. Configurar las variables en `.env.local`:
```env
RESEND_API_KEY=re_your_test_api_key
DOCUSIA_CONTACT_EMAIL=onboarding@resend.dev
DOCUSIA_ADMIN_EMAILS=tu-email@gmail.com
```

2. Reiniciar servidor:
```bash
cd E:\git\interno\io-docusia
pnpm dev
```

3. Ir a http://localhost:3006/contacto
4. Llenar y enviar formulario
5. Verificar email en tu bandeja

### Opción 2: Sin Email (Testing Rápido)

Si no tienes Resend configurado:
- El endpoint devuelve `reason: "email_not_configured"`
- El formulario muestra el estado "pending" (mensaje de integración pendiente)
- **No hay error visible** — es la UX honesta

Para testing de UI sin email, crear `.env.local`:
```env
# Dejar vacío o comentado RESEND_API_KEY
```

---

## 📝 Estructura de Datos

### Payload enviado por el cliente

```javascript
{
  name: "Juan García",
  email: "juan@empresa.com",
  company: "Empresa S.L.",
  phone: "+34 912 345 678",  // opcional
  motive: "consulta-general",
  message: "Necesitamos gestion documental...",
  tools: "Google Workspace, SAP"  // opcional
}
```

### Respuesta de éxito

```json
{ "ok": true }
```

### Respuestas de error

```json
{ "ok": false, "reason": "email_not_configured" }
{ "ok": false, "reason": "invalid_data", "fields": ["email", "message"] }
{ "ok": false, "reason": "send_failed" }
{ "ok": false, "reason": "server_error" }
```

---

## 🔍 Troubleshooting

### "Email not configured" en producción

**Causa:** `RESEND_API_KEY` no está configurada en Coolify.

**Solución:**
1. Ir al panel de producción
2. Agregar `RESEND_API_KEY` en Environment variables
3. Redeploy

### Email se envía pero va a spam

**Causa:** Dominio no verificado o configuración DKIM/SPF incompleta.

**Solución:**
1. En Resend → Domains → verificar registros DNS agregados
2. Esperar 5-30 minutos para propagación
3. Verificar registros con: `nslookup -type=TXT tu-dominio.es`

### Error 401/403 en logs

**Causa:** API key inválida o expirada.

**Solución:**
1. Verificar que `RESEND_API_KEY` comienza con `re_`
2. Regenerar clave en https://resend.com/api-keys
3. Actualizar variable de entorno

### Emails no llegan a admin

**Causa:** `DOCUSIA_ADMIN_EMAILS` incorrecto o no verificado.

**Solución:**
1. Verificar formato: `email@domain.com,otro@domain.com`
2. Usar primer email verificado en Resend
3. Revisar carpeta de spam

---

## 🛠️ Endpoints

### `POST /api/contact`

Envía un email del formulario de contacto.

**Respuesta exitosa (200):**
```json
{ "ok": true }
```

**Errores comunes:**

| Código | Reason | Causa |
|--------|--------|-------|
| 400 | `invalid_data` | Validación fallida |
| 503 | `email_not_configured` | `RESEND_API_KEY` vacío |
| 500 | `send_failed` | Error de Resend |
| 500 | `server_error` | Error interno |

---

## 📚 Referencias

- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Email Best Practices](https://resend.com/docs/help/smtp-setup)

---

**Última actualización:** 2026-09-18  
**Guardado en:** `docs/email-configuration.md`
