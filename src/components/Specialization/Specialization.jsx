"use client";

import { useEffect, useRef, useState } from "react";
import { DocumentIcon, EmailIcon, DatabaseIcon, FormIcon } from "../icons";
import styles from "./Specialization.module.css";

const SOURCES = [
  { label: "Documentos", Icon: DocumentIcon },
  { label: "Email", Icon: EmailIcon },
  { label: "Datos", Icon: DatabaseIcon },
  { label: "Información", Icon: FormIcon },
];

const CHAIN = ["Proceso", "Inteligencia", "Automatización", "Acción"];

const Y_POSITIONS = [12.5, 37.5, 62.5, 87.5];

export default function Specialization() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pinnedIndex, setPinnedIndex] = useState(null);

  const highlightIndex = hoverIndex ?? pinnedIndex;

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return;

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
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" }
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  const handleEnter = (index) => setHoverIndex(index);
  const handleLeave = () => setHoverIndex(null);
  const handleClick = (index) => {
    const next = pinnedIndex === index ? null : index;
    setPinnedIndex(next);
    // Keep hover in sync so a lingering touch/mouse hover state can't mask
    // the click result (e.g. tapping the same source twice on touch
    // devices, where the pointer never truly "leaves" between taps).
    setHoverIndex(next);
  };

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="specialization-title"
      ref={sectionRef}
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Nuestra especialización</p>
          <h2 id="specialization-title" className={styles.title}>
            No automatizamos
            <br />
            cualquier cosa.
          </h2>
          <p className={styles.text}>
            Nos especializamos en procesos donde documentos, email, datos e
            información forman parte central del trabajo.
          </p>
        </div>

        <div
          className={styles.diagram}
          data-started={started ? "true" : undefined}
          data-active={highlightIndex ?? undefined}
        >
          <span className={styles.tag}>
            De información
            <br />
            a acción
          </span>

          <div className={styles.flowRow}>
            <div className={styles.sourcesWrap}>
              <svg
                className={styles.lines}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {Y_POSITIONS.map((y, index) => (
                  <path
                    key={y}
                    d={`M64,${y} C84,${y} 84,50 100,50`}
                    style={{ "--i": index }}
                  />
                ))}
              </svg>
              <span className={styles.convergeDot} aria-hidden="true" />
              <ul className={styles.sources}>
                {SOURCES.map(({ label, Icon }, index) => (
                  <li key={label} style={{ "--i": index }}>
                    <button
                      type="button"
                      className={styles.sourceButton}
                      aria-pressed={pinnedIndex === index}
                      onMouseEnter={() => handleEnter(index)}
                      onMouseLeave={handleLeave}
                      onFocus={() => handleEnter(index)}
                      onBlur={handleLeave}
                      onClick={() => handleClick(index)}
                    >
                      <span className={styles.sourceIcon}>
                        <Icon size={19} />
                      </span>
                      <span className={styles.sourceLabel}>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ol className={styles.chain}>
              {CHAIN.map((step, index) => (
                <li
                  key={step}
                  className={`${styles.chainStep} ${
                    index === CHAIN.length - 1 ? styles.chainStepAccent : ""
                  }`}
                  style={{ "--i": index }}
                >
                  <span className={styles.chainNode} />
                  <span className={styles.chainLabel}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
