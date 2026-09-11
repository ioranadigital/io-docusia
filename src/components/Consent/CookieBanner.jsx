"use client";

import Link from "next/link";
import { useConsent } from "../../lib/consent/ConsentContext";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const { acceptAll, rejectAll, openPreferences } = useConsent();

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title" className={styles.banner}>
      <h2 id="cookie-banner-title" className={styles.title}>
        Tu privacidad
      </h2>
      <p className={styles.text}>
        Utilizamos cookies necesarias para el funcionamiento de la web. Puedes aceptar o rechazar el
        resto, y cambiar tu elección cuando quieras desde &quot;Preferencias de cookies&quot;.
      </p>

      <div className={styles.actions}>
        <button type="button" onClick={rejectAll} className={`btn btnSecondary ${styles.btn}`}>
          Rechazar todas
        </button>
        <button type="button" onClick={acceptAll} className={`btn btnPrimary ${styles.btn}`}>
          Aceptar todas
        </button>
      </div>

      <div className={styles.footer}>
        <button type="button" onClick={openPreferences} className={styles.link}>
          Configurar preferencias
        </button>

        <div className={styles.legalLinks}>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/cookies">Cookies</Link>
        </div>
      </div>
    </div>
  );
}
