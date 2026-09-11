"use client";

import { useEffect, useState } from "react";
import { useConsent } from "../../lib/consent/ConsentContext";
import ConsentSwitch from "./ConsentSwitch";
import styles from "./CookiePreferencesPanel.module.css";

export default function CookiePreferencesPanel() {
  const { consent, closePreferences, savePreferences, acceptAll, rejectAll } = useConsent();
  const [analytics, setAnalytics] = useState(consent.analytics);

  useEffect(() => {
    setAnalytics(consent.analytics);
  }, [consent.analytics]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") closePreferences();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePreferences]);

  function handleSave() {
    savePreferences({ analytics });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
      className={styles.overlay}
      onClick={closePreferences}
    >
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.head}>
          <h2 id="cookie-preferences-title" className={styles.title}>
            Preferencias de cookies
          </h2>
          <button type="button" onClick={closePreferences} aria-label="Cerrar" className={styles.close}>
            ×
          </button>
        </div>

        <div className={styles.list}>
          <div className={styles.item}>
            <div>
              <p className={styles.itemTitle}>Necesarias</p>
              <p className={styles.itemText}>
                Imprescindibles para el funcionamiento y la seguridad básica del sitio. No pueden
                desactivarse.
              </p>
            </div>
            <span className={styles.alwaysOn}>Siempre activas</span>
          </div>

          <div className={styles.item}>
            <div>
              <p className={styles.itemTitle}>Analíticas</p>
              <p className={styles.itemText}>
                Hoy no utilizamos ninguna herramienta de analítica. Esta categoría queda preparada
                para cuando se active una en el futuro — hasta entonces no tiene ningún efecto.
              </p>
            </div>
            <ConsentSwitch
              id="cookie-analytics"
              checked={analytics}
              onChange={setAnalytics}
              label="Analíticas"
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" onClick={acceptAll} className={`btn ${styles.acceptBtn} ${styles.footerBtn}`}>
            Aceptar todas
          </button>
          <button type="button" onClick={handleSave} className={`btn btnSecondary ${styles.footerBtn}`}>
            Guardar preferencias
          </button>
          <button type="button" onClick={rejectAll} className={styles.rejectLink}>
            Rechazar todas
          </button>
        </div>
      </div>
    </div>
  );
}
