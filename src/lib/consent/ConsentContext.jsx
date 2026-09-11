"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CONSENT_VERSION, DEFAULT_CONSENT } from "./types";
import { readConsent, writeConsent } from "./storage";

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [hydrated, setHydrated] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);
  }, []);

  const persist = useCallback((partial) => {
    const record = {
      necessary: true,
      analytics: partial.analytics,
      decided: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    writeConsent(record);
    setConsent(record);
    setPanelOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist({ analytics: true }), [persist]);
  const rejectAll = useCallback(() => persist({ analytics: false }), [persist]);
  const savePreferences = useCallback((choices) => persist(choices), [persist]);

  const openPreferences = useCallback(() => setPanelOpen(true), []);
  const closePreferences = useCallback(() => setPanelOpen(false), []);

  const value = {
    consent,
    // No mostramos nada hasta hidratar (evita parpadeo/mismatch de SSR).
    bannerVisible: hydrated && !consent.decided,
    panelOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent debe usarse dentro de <ConsentProvider>");
  return ctx;
}

// Helper de solo-lectura para módulos fuera del árbol de React (p.ej. si en
// el futuro se instala analítica y hay que comprobar el consentimiento
// antes de cargar el script).
export function hasAnalyticsConsent() {
  return readConsent().analytics === true;
}
