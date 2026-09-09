// Punto de integración del formulario de contacto.
//
// Hoy no existe backend/API de formularios en el proyecto (solo
// /api/health, /api/login y /api/logout) ni un email oficial de Docusia
// configurado. Por eso esta función NO realiza ninguna llamada de red y NO
// simula un envío correcto: devuelve explícitamente `not_configured` para
// que la UI muestre un aviso honesto en vez de una falsa confirmación.
//
// Cuando exista integración real (n8n, email transaccional, CRM o un route
// handler propio como /api/contact), sustituir el cuerpo de esta función
// por la llamada correspondiente. La UI (ContactForm) ya está preparada
// para los tres desenlaces: éxito, error y "no configurado".
export async function submitContact(payload) {
  void payload;
  return { ok: false, reason: "not_configured" };
}
