"use client";

import { useEffect, useRef, useState } from "react";
import {
  EmailIcon,
  FolderIcon,
  EyeIcon,
  CopyIcon,
  SearchIcon,
  TagIcon,
  SendIcon,
  RegistryIcon,
  ArchiveIcon,
  ClockIcon,
} from "../icons";
import styles from "./ManualWorkFlow.module.css";

const STEPS = [
  { label: "Recibir", Icon: EmailIcon },
  { label: "Abrir", Icon: FolderIcon },
  { label: "Leer", Icon: EyeIcon },
  { label: "Copiar", Icon: CopyIcon },
  { label: "Comprobar", Icon: SearchIcon, milestone: true },
  { label: "Renombrar", Icon: TagIcon },
  { label: "Reenviar", Icon: SendIcon, milestone: true },
  { label: "Registrar", Icon: RegistryIcon, milestone: true },
  { label: "Archivar", Icon: ArchiveIcon },
  { label: "Recordar", Icon: ClockIcon },
];

export default function ManualWorkFlow() {
  const sectionRef = useRef(null);
  const flowRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    const flowNode = flowRef.current;
    if (!sectionNode || !flowNode) return;

    flowNode.setAttribute("data-js", "true");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      hasAnimatedRef.current = true;
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setStarted(true);
          observer.unobserve(sectionNode);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -35% 0px" }
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="manual-work-title"
      ref={sectionRef}
    >
      <div className="container">
        <p className="eyebrow">El trabajo que no debería consumir tu tiempo</p>
        <div className={styles.headRow}>
          <h2 id="manual-work-title" className={styles.title}>
            Gran parte del trabajo administrativo sigue siendo trabajo
            manual con información.
          </h2>
          <p className={styles.intro}>
            Son pequeñas tareas que, repetidas decenas o cientos de veces,
            consumen tiempo, generan errores y dificultan el control de los
            procesos.
          </p>
        </div>

        <ol
          className={styles.flow}
          ref={flowRef}
          data-started={started ? "true" : undefined}
        >
          {STEPS.map(({ label, Icon, milestone }, index) => (
            <li
              key={label}
              className={`${styles.step} ${milestone ? styles.milestone : ""}`}
              style={{ "--i": index }}
            >
              <span className={styles.node}>
                <Icon size={21} />
              </span>
              <span className={styles.label}>{label}</span>
              {index < STEPS.length - 1 && (
                <span
                  className={styles.connector}
                  aria-hidden="true"
                  style={{ "--i": index }}
                />
              )}
            </li>
          ))}
        </ol>

        <div className={styles.punchRow}>
          <svg
            className={styles.arrow}
            viewBox="0 0 100 56"
            fill="none"
            aria-hidden="true"
          >
            <path
              className={styles.arrowPath}
              d="M8,4 C8,28 22,42 46,46 C58,48 68,48 78,46"
              pathLength="1"
            />
            <path
              className={styles.arrowHead}
              d="M66,40 L80,47 L67,54"
              pathLength="1"
            />
          </svg>
          <p className={styles.punch}>
            ¿Todo esto tiene que ser un trabajo manual?
          </p>
        </div>
      </div>
    </section>
  );
}
