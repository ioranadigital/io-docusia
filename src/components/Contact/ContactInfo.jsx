"use client";

import Link from "next/link";
import { CheckIcon, ArrowRightIcon } from "../icons";
import { CONTACT_EVENTS, track } from "./data/analytics";
import styles from "./ContactInfo.module.css";

const REASONS = [
  "Consultar una solución.",
  "Plantear un proyecto.",
  "Mejorar un proceso existente.",
  "Resolver una duda.",
  "Explorar una colaboración.",
];

// Sin email oficial de Docusia configurado todavía en el proyecto: no se
// inventa una dirección. En cuanto exista, añadirla aquí para que el
// bloque de email se muestre automáticamente.
const OFFICIAL_EMAIL = null;

export default function ContactInfo() {
  return (
    <div>
      <p className="eyebrow">Contacto</p>
      <h1 id="contact-title" className={styles.heroTitle}>
        Hablemos de lo que quieres mejorar.
      </h1>
      <p className={styles.heroLead}>
        Si tienes un proyecto, una consulta o un proceso que quieres
        mejorar, cuéntanos brevemente qué está ocurriendo.
      </p>
      <p className={styles.heroNote}>
        No necesitas preparar una solución técnica. Conocer el contexto es
        suficiente para empezar.
      </p>

      <p className={styles.reasonsLabel}>Puedes contactarnos para</p>
      <ul className={styles.reasonsList}>
        {REASONS.map((reason) => (
          <li key={reason}>
            <span className={styles.reasonMark} aria-hidden="true">
              <CheckIcon size={12} />
            </span>
            {reason}
          </li>
        ))}
      </ul>

      {OFFICIAL_EMAIL && (
        <div className={styles.email}>
          <p className={styles.emailLabel}>Email</p>
          <a className={styles.emailValue} href={`mailto:${OFFICIAL_EMAIL}`}>
            {OFFICIAL_EMAIL}
          </a>
        </div>
      )}

      <div className={styles.alternative}>
        <p className={styles.alternativeTitle}>¿No tienes claro qué solución necesitas?</p>
        <p className={styles.alternativeText}>
          Si sabes que existe demasiado trabajo manual, información dispersa
          o un proceso que podría funcionar mejor, puedes empezar por
          analizarlo.
        </p>
        <Link
          href="/analizar-mi-proceso"
          className={styles.alternativeLink}
          onClick={() => track(CONTACT_EVENTS.DIAGNOSIS_CLICKED)}
        >
          Analizar mi proceso
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
