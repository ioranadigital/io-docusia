"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Metodología", href: "/#metodologia" },
  { label: "Casos de uso", href: "/#casos-de-uso" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo image="/brand/logo-wordmark.png" imageHeight="clamp(30px, 8vw, 46px)" />

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/contacto" className={`btn btnSecondary ${styles.cta} ${styles.ctaSecondary}`}>
            Contacto
          </Link>
          <Link href="/analizar-mi-proceso" className={`btn btnPrimary ${styles.cta}`}>
            Analizar mi proceso
          </Link>
          <button
            type="button"
            ref={buttonRef}
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id={panelId} className={styles.mobilePanel} hidden={!open}>
        <nav aria-label="Navegación móvil">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/analizar-mi-proceso"
          className={`btn btnPrimary ${styles.panelCta}`}
          onClick={() => setOpen(false)}
        >
          Analizar mi proceso
        </Link>
        <Link
          href="/contacto"
          className={`btn btnSecondary ${styles.panelCta}`}
          onClick={() => setOpen(false)}
        >
          Contacto
        </Link>
      </div>
    </header>
  );
}
