// Eventos semánticos de Docusia Diagnosis, listos para conectar a una
// plataforma de analítica futura. No hay ninguna plataforma instalada hoy:
// `track()` solo registra en consola (modo desarrollo) y no envía nada a
// ningún servicio. Cuando se integre analítica real, sustituir el cuerpo de
// `track()` por la llamada correspondiente sin tocar los puntos de uso.
//
// Eventos disponibles:
//   diagnosis_started        — el usuario pulsa "Empezar análisis"
//   diagnosis_step_completed — el usuario completa un paso (payload: { step, questionId })
//   diagnosis_completed      — se muestra la pantalla de resultado
//   diagnosis_lead_started   — el usuario abre el formulario de contacto tras el resultado
//   diagnosis_lead_submitted — el usuario envía el formulario (sin datos sensibles en el evento)

export const DIAGNOSIS_EVENTS = {
  STARTED: "diagnosis_started",
  STEP_COMPLETED: "diagnosis_step_completed",
  COMPLETED: "diagnosis_completed",
  LEAD_STARTED: "diagnosis_lead_started",
  LEAD_SUBMITTED: "diagnosis_lead_submitted",
};

export function track(eventName, payload = {}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(`[diagnosis analytics] ${eventName}`, payload);
  }
}
