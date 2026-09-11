import { CONSENT_VERSION, DEFAULT_CONSENT } from "./types";

const STORAGE_KEY = "docusia_cookie_consent";

export function readConsent() {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;

    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_CONSENT;

    return { ...DEFAULT_CONSENT, ...parsed, necessary: true };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function writeConsent(record) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage no disponible (navegación privada, storage bloqueado,
    // etc.). El banner simplemente volverá a mostrarse en la siguiente
    // visita.
  }
}
