// Versión del esquema de consentimiento. Incrementar si se añade/quita una
// categoría real (p.ej. al instalar analítica de verdad): invalida el
// consentimiento guardado y vuelve a mostrar el banner.
export const CONSENT_VERSION = 1;

// Hoy Docusia no usa analítica, marketing ni contenido externo embebido —
// solo la cookie técnica de la propia elección de consentimiento. La
// categoría "analytics" se deja preparada (siempre en false por defecto)
// para el día en que se instale una herramienta real; no representa nada
// activo actualmente.
export const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  decided: false,
  timestamp: "",
  version: CONSENT_VERSION,
};
