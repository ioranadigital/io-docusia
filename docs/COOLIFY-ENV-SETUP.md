# Coolify — Configuración de Variables de Entorno

> ⚠️ **ARCHIVO SENSIBLE** — Contiene credenciales. NO versionado.

## 📋 Resumen Rápido

**Proyecto:** io-docusia  
**Servicio:** Email automático desde formulario de contacto  
**Fecha de configuración:** 2026-09-18

---

## 🔧 Variables a Configurar en Coolify

Accede a tu panel de Coolify y copia estas 3 variables exactamente:

### Variable 1: Resend API Key
```
Name:  RESEND_API_KEY
Value: [Tu API key de Resend — comienza con re_]
```

### Variable 2: Email de Contacto (From)
```
Name:  DOCUSIA_CONTACT_EMAIL
Value: contacto@neosuma.com
```

### Variable 3: Email Admin (To)
```
Name:  DOCUSIA_ADMIN_EMAILS
Value: ricardo@neosuma.com
```

---

## 📝 Pasos en Coolify

1. **Abre tu panel de Coolify**
   - URL: Tu instancia de Coolify

2. **Navega a io-docusia**
   - Busca el proyecto en el listado

3. **Environment Variables**
   - Click en **Environment** o **Variables**
   - Busca la sección de **Environment variables**

4. **Agrega cada variable**
   - Click en **+ Add new variable** (o similar)
   - Copia el nombre exacto: `RESEND_API_KEY`
   - Pega el valor desde E:\master.env
   - Click en **Save**
   - **Repite para las otras 2 variables**

5. **Redeploy la aplicación**
   - Click en **Deployments** (o similar)
   - Busca io-docusia
   - Click en **Redeploy** o **Rebuild**
   - Espera 2-5 minutos

---

## ✅ Verificación Post-Deploy

1. **Abre la aplicación**
   - Navega a https://docusia.com/contacto

2. **Prueba el formulario**
   - Llena todos los campos
   - Click en **Enviar consulta**

3. **Resultados esperados:**
   - ✅ Sin error → Email enviado
   - ✅ Mensaje de "Consulta enviada" aparece
   - ✅ Email llega a ricardo@neosuma.com en 1-2 minutos

4. **Si hay error:**
   - Revisa la sección de **Troubleshooting** abajo

---

## 🔍 Troubleshooting

### Error: "Envío automático todavía no está conectado"
**Causa:** Alguna variable no está configurada correctamente.  
**Solución:**
1. Verifica que las 3 variables están en Coolify
2. Comprueba que no hay espacios extra en los valores
3. Redeploy nuevamente
4. Espera 2-3 minutos

### Error: "No hemos podido enviar tu consulta"
**Causa:** API key de Resend inválida o credenciales incorrectas.  
**Solución:**
1. Verifica que `RESEND_API_KEY` comienza con `re_`
2. Prueba copiando la clave directamente de https://resend.com/api-keys
3. Redeploy

### Email no llega a ricardo@neosuma.com
**Causa:** Carpeta de spam o error en la dirección de email.  
**Solución:**
1. Revisa carpeta de **Spam** en el email de ricardo
2. Verifica que `DOCUSIA_ADMIN_EMAILS=ricardo@neosuma.com` (sin espacios)
3. Comprueba que contacto@neosuma.com está verificado en Resend

---

## 📞 Testing Manual (Local)

Si quieres probar antes de deployer a producción:

1. **En tu máquina local:**
```bash
cd E:\git\interno\io-docusia
# Copiar desde E:\master.env:
# RESEND_API_KEY=<valor de E:\master.env>  (empieza por re_)
# DOCUSIA_CONTACT_EMAIL=contacto@neosuma.com
# DOCUSIA_ADMIN_EMAILS=ricardo@neosuma.com

pnpm dev
```

2. **Accede a http://localhost:3006/contacto** (desarrollo local)

3. **Llena y envía el formulario**

4. **Verifica el email en ricardo@neosuma.com**

---

## 📚 Referencias

- [Resend Dashboard](https://resend.com) — Monitorea emails enviados
- [Coolify Docs](https://coolify.io/docs) — Documentación oficial
- [io-docusia Email Config](./email-configuration.md) — Guía técnica completa

---

**Guardado en:** `docs/COOLIFY-ENV-SETUP.md`  
**Última actualización:** 2026-09-18

> **Nota de seguridad:** Las credenciales reales están en E:\master.env (no versionado).
> Este documento solo contiene placeholders para Coolify.
