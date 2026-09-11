"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutValue.module.css";

const COMPANY_ITEMS = ["Procesos", "Personas", "Información", "Herramientas"];

const STEPS = [
  { title: "Analizar", text: "Detectar dónde se pierde tiempo o control." },
  { title: "Ordenar", text: "Estructurar procesos e información." },
  { title: "Diseñar", text: "Definir cómo debería funcionar." },
  { title: "Implementar", text: "Aplicar las mejoras y tecnología necesarias." },
  { title: "Acompañar", text: "Documentar, formar y facilitar la adopción." },
];

const STEP_CENTERS = STEPS.map((_, i) => ((i + 0.5) / STEPS.length) * 100);

// Coreografía de la animación (una sola pasada, disparada al entrar en
// viewport). Todos los tiempos son offsets en ms desde el disparo.
const COMPANY_STAGGER = 130;
const COMPANY_SETTLE_AFTER = 350;
const LINE1_AT = 550;
const HUB_PULSE_AT = 1000;
const HUB_PULSE_DURATION = 260;
const TRUNK_AT = 1200;
const BAR_AT = 1550;
const STEPS_START_AT = 1950;
const STEP_STAGGER = 380;
const STEP_SETTLE_AFTER = 550;

export default function AboutValue() {
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [companyState, setCompanyState] = useState(() => COMPANY_ITEMS.map(() => "pending"));
  const [hubState, setHubState] = useState("base");
  const [line1Drawn, setLine1Drawn] = useState(false);
  const [trunkDrawn, setTrunkDrawn] = useState(false);
  const [barDrawn, setBarDrawn] = useState(false);
  const [stepState, setStepState] = useState(() => STEPS.map(() => "pending"));

  useEffect(() => {
    const node = containerRef.current;
    if (!node || triggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCompanyState(COMPANY_ITEMS.map(() => "settled"));
      setHubState("base");
      setLine1Drawn(true);
      setTrunkDrawn(true);
      setBarDrawn(true);
      setStepState(STEPS.map(() => "completed"));
      return;
    }

    const timers = [];
    const schedule = (fn, delay) => timers.push(setTimeout(fn, delay));
    const setAt = (setter, index, value) =>
      setter((current) => current.map((v, i) => (i === index ? value : v)));

    COMPANY_ITEMS.forEach((_, i) => {
      schedule(() => setAt(setCompanyState, i, "active"), i * COMPANY_STAGGER);
      schedule(
        () => setAt(setCompanyState, i, "settled"),
        i * COMPANY_STAGGER + COMPANY_SETTLE_AFTER
      );
    });

    schedule(() => setLine1Drawn(true), LINE1_AT);
    schedule(() => setHubState("pulse"), HUB_PULSE_AT);
    schedule(() => setHubState("base"), HUB_PULSE_AT + HUB_PULSE_DURATION);
    schedule(() => setTrunkDrawn(true), TRUNK_AT);
    schedule(() => setBarDrawn(true), BAR_AT);

    STEPS.forEach((_, i) => {
      schedule(() => setAt(setStepState, i, "current"), STEPS_START_AT + i * STEP_STAGGER);
      schedule(
        () => setAt(setStepState, i, "completed"),
        STEPS_START_AT + i * STEP_STAGGER + STEP_SETTLE_AFTER
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="value-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Para tu empresa</p>
          <h2 id="value-title" className={styles.title}>
            Nuestro conocimiento solo tiene valor si mejora tu forma de
            trabajar.
          </h2>
          <p className={styles.text}>
            Trabajamos sobre los procesos, personas, información y
            herramientas que ya existen en la empresa para identificar dónde
            tiene sentido intervenir.
          </p>
        </div>

        <div className={styles.flow} ref={containerRef}>
          <div
            className={styles.diagram}
            role="img"
            aria-label="Tu empresa (procesos, personas, información y herramientas) llega a Docusia, que analiza, ordena, diseña, implementa y acompaña."
          >
            <div className={styles.companyBox} aria-hidden="true">
              <p className={styles.companyLabel}>Tu empresa</p>
              <div className={styles.companyItems}>
                {COMPANY_ITEMS.map((item, index) => (
                  <span key={item} data-state={companyState[index]}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <span
              className={styles.stem}
              data-drawn={line1Drawn ? "true" : undefined}
              aria-hidden="true"
            />

            <span className={styles.hub} data-state={hubState} aria-hidden="true">
              Docusia
            </span>

            <div className={styles.connectorWrap} aria-hidden="true">
              <span
                className={styles.connectorTrunk}
                data-drawn={trunkDrawn ? "true" : undefined}
              />
              <span
                className={styles.connectorBar}
                data-drawn={barDrawn ? "true" : undefined}
              />
              {STEP_CENTERS.map((cx, i) => (
                <span
                  key={i}
                  className={styles.connectorDrop}
                  data-drawn={stepState[i] !== "pending" ? "true" : undefined}
                  style={{ left: `${cx}%` }}
                />
              ))}
            </div>
          </div>

          <div className={styles.stepsList}>
            {STEPS.map(({ title, text }, index) => (
              <div className={styles.stepsListItem} data-state={stepState[index]} key={title}>
                <p className={styles.stepsListTitle}>{title}</p>
                <p className={styles.stepsListText}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.quote}>
          Una solución no está implantada cuando funciona técnicamente, sino
          cuando puede utilizarse correctamente dentro de la organización.
        </p>
      </div>
    </section>
  );
}
