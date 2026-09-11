"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import CookiePreferencesTrigger from "../Consent/CookiePreferencesTrigger";
import styles from "./Footer.module.css";

const COLUMNS = [
  {
    title: "Soluciones",
    soon: true,
    links: [
      { label: "Facturas", disabled: true },
      { label: "Email", disabled: true },
      { label: "Documentos", disabled: true },
      { label: "Contratos", disabled: true },
      { label: "Conocimiento", disabled: true },
      { label: "Altas", disabled: true },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Casos de uso", href: "/#casos-de-uso" },
      { label: "Resultados", href: "/#resultados" },
      { label: "Recursos", soon: true },
    ],
  },
  {
    title: "Docusia",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Metodología", href: "/#metodologia" },
      { label: "Diagnosis", href: "/analizar-mi-proceso" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const baseId = useId();
  const [openTitles, setOpenTitles] = useState([]);

  function toggle(title) {
    setOpenTitles((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title]
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo image="/brand/logo-wordmark.png" imageHeight={44} />
          <p className={styles.claim}>
            La información en movimiento,
            <br />
            el negocio en avance.
          </p>
        </div>

        <nav className={styles.columns} aria-label="Enlaces del sitio">
          {COLUMNS.map((column) => {
            const isOpen = openTitles.includes(column.title);
            const panelId = `${baseId}-${column.title}`;
            return (
              <div key={column.title} className={styles.columnBlock}>
                <button
                  type="button"
                  className={styles.columnTitle}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(column.title)}
                >
                  <span className={styles.columnTitleLabel}>
                    {column.title}
                    {column.soon && <span className={styles.soonTag}>Próximamente</span>}
                  </span>
                  <span className={styles.columnIcon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <ul id={panelId} className={styles.panel} hidden={!isOpen}>
                  {column.links.map((link) =>
                    link.soon ? (
                      <li key={link.label}>
                        <span className={styles.soon} aria-disabled="true">
                          {link.label}
                          <span className={styles.soonTag}>Próximamente</span>
                        </span>
                      </li>
                    ) : link.disabled ? (
                      <li key={link.label}>
                        <span className={styles.disabled} aria-disabled="true">
                          {link.label}
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} Docusia. Todos los derechos reservados.</p>
        <p className={styles.legal}>
          <Link href="/legal/aviso-legal">Aviso legal</Link>
          <span aria-hidden="true">·</span>
          <Link href="/legal/privacidad">Privacidad</Link>
          <span aria-hidden="true">·</span>
          <Link href="/legal/cookies">Cookies</Link>
          <span aria-hidden="true">·</span>
          <CookiePreferencesTrigger className={styles.cookieTrigger} />
        </p>
      </div>
    </footer>
  );
}
