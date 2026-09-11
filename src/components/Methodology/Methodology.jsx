"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SearchIcon,
  LayersIcon,
  FormIcon,
  ProcessIcon,
  AutomationIcon,
  ClockIcon,
  BarChartIcon,
} from "../icons";
import styles from "./Methodology.module.css";

const PHASES = [
  { n: "01", label: "Analizar", text: "Entender el proceso y detectar fricciones.", Icon: SearchIcon },
  { n: "02", label: "Ordenar", text: "Organizar la información que lo sustenta.", Icon: LayersIcon },
  { n: "03", label: "Diseñar", text: "Simplificar y diseñar el proceso objetivo.", Icon: FormIcon },
  { n: "04", label: "Inteligencia", text: "Aplicar IA donde aporta valor.", Icon: ProcessIcon },
  { n: "05", label: "Automatizar", text: "Conectar sistemas y eliminar tareas manuales.", Icon: AutomationIcon },
  { n: "06", label: "Mejorar", text: "Medir resultados y seguir optimizando.", Icon: ClockIcon },
];

// Progreso ligado al scroll real (sin scroll-jacking): la posición de la fila
// de fases dentro del viewport se traduce en una fracción 0..1, que controla
// cuántas fases ya se han revelado. El máximo alcanzado se conserva en un
// ref, por lo que las fases reveladas no se ocultan si el usuario sube.
const TRIGGER_START_VH = 0.95; // ratio=0 cuando el top de la fila está aquí (justo antes de entrar del todo)
const TRIGGER_END_VH = 0.25; // ratio=1 cuando el bottom de la fila llega aquí (todavía bien visible)
// Margen de llegada: la última fase (y la flecha + bloque final) se dan por
// alcanzadas al 90% del recorrido, no al 100% exacto, para que no se queden
// a medias si el usuario no hace scroll hasta el límite geométrico exacto.
const COMPLETION_MARGIN = 0.9;

function computeRatio(rect, viewportHeight) {
  const triggerStart = viewportHeight * TRIGGER_START_VH;
  const triggerEnd = viewportHeight * TRIGGER_END_VH;
  const totalDistance = triggerStart - triggerEnd + rect.height;
  if (totalDistance <= 0) return 1;
  const traveled = triggerStart - rect.top;
  return Math.min(1, Math.max(0, traveled / totalDistance));
}

export default function Methodology() {
  const containerRef = useRef(null);
  const phasesRef = useRef(null);
  const maxRatioRef = useRef(0);
  const tickingRef = useRef(false);
  const [ratio, setRatio] = useState(0);

  const updateRatio = useCallback(() => {
    const node = phasesRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const next = computeRatio(rect, window.innerHeight);
    if (next > maxRatioRef.current) {
      maxRatioRef.current = next;
      setRatio(next);
    }
  }, []);

  const onScrollOrResize = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      tickingRef.current = false;
      updateRatio();
    });
  }, [updateRatio]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      maxRatioRef.current = 1;
      setRatio(1);
      return;
    }

    let listening = false;
    const startListening = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize, { passive: true });
      updateRatio();
    };
    const stopListening = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };

    // Solo escuchamos scroll mientras la sección esté cerca del viewport;
    // fuera de ese rango no hace falta calcular nada.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startListening();
        } else {
          stopListening();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      stopListening();
    };
  }, [onScrollOrResize, updateRatio]);

  const easedRatio = useMemo(() => Math.min(1, ratio / COMPLETION_MARGIN), [ratio]);

  const reachedIndex = useMemo(
    () => Math.min(PHASES.length - 1, Math.floor(easedRatio * PHASES.length)),
    [easedRatio]
  );

  const sequenceDone = easedRatio >= 1;

  return (
    <div id="metodologia" aria-labelledby="methodology-title" ref={containerRef}>
      <div className={styles.head}>
        <div>
          <p className="eyebrow">Nuestra metodología</p>
          <h2 id="methodology-title" className={styles.title}>
            Entender antes de automatizar.
          </h2>
          <p className={styles.intro}>
            Primero entendemos cómo funciona el proceso y su información.
            Después decidimos qué simplificar, qué organizar y dónde
            aplicar inteligencia y automatización.
          </p>
        </div>
      </div>

      <div className={styles.diagram}>
        <ol className={styles.phases} ref={phasesRef}>
          <span className={styles.line} aria-hidden="true" />
          {PHASES.map(({ n, label, text, Icon }, index) => (
            <li
              key={n}
              className={styles.phase}
              data-final={index === PHASES.length - 1 ? "true" : undefined}
              data-reached={index <= reachedIndex ? "true" : undefined}
            >
              <span className={styles.number}>{n}</span>
              <span className={styles.node}>
                <Icon size={23} />
              </span>
              <span className={styles.label}>{label}</span>
              <span className={styles.text}>{text}</span>
            </li>
          ))}
        </ol>

        <svg
          className={styles.arrow}
          data-visible={sequenceDone ? "true" : undefined}
          viewBox="0 0 90 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            className={styles.arrowPath}
            d="M82,6 C82,46 78,74 30,90"
            strokeLinecap="round"
          />
          <path
            className={styles.arrowHead}
            d="M46,92 L30,90 L42,79"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={styles.highlight} data-visible={sequenceDone ? "true" : undefined}>
        <span className={styles.highlightIcon}>
          <BarChartIcon size={20} />
        </span>
        <span className={styles.highlightBody}>
          <span className={styles.highlightTitle}>
            Un proceso bien entendido permite mejores decisiones.
          </span>
          <span className={styles.highlightText}>
            No automatizamos por automatizar. Diseñamos soluciones que
            realmente mejoran el trabajo.
          </span>
        </span>
      </div>
    </div>
  );
}
