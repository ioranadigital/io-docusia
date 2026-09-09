// Eventos semánticos del formulario de contacto, listos para conectar a una
// plataforma de analítica futura. No hay ninguna plataforma instalada hoy:
// `track()` solo registra en consola (modo desarrollo) y no envía nada a
// ningún servicio.
//
// IMPORTANTE: nunca incluir en el payload nombre, email, teléfono, empresa
// ni el mensaje — solo metadatos no sensibles (p. ej. el motivo elegido).
//
// Eventos disponibles:
//   contact_form_started    — el usuario escribe en el primer campo del formulario
//   contact_form_submitted  — el envío pasa la validación (payload: { motive })
//   contact_form_error      — el envío no pudo procesarse
//   contact_diagnosis_clicked — el usuario pulsa "Analizar mi proceso" desde esta página

export const CONTACT_EVENTS = {
  STARTED: "contact_form_started",
  SUBMITTED: "contact_form_submitted",
  ERROR: "contact_form_error",
  DIAGNOSIS_CLICKED: "contact_diagnosis_clicked",
};

export function track(eventName, payload = {}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(`[contact analytics] ${eventName}`, payload);
  }
}
