"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "../icons";
import styles from "./DiagnosisAnalyzing.module.css";

const STAGES = ["Proceso", "Información", "Fricciones", "Oportunidades"];
const STEP_DURATION = 260;

export default function DiagnosisAnalyzing({ onDone }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timers = STAGES.map((_, index) =>
      setTimeout(() => setActiveIndex(index), index * STEP_DURATION)
    );
    const finishTimer = setTimeout(onDone, STAGES.length * STEP_DURATION + 300);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`section ${styles.section}`} aria-live="polite">
      <div className={styles.wrap}>
        <h1 className={styles.title}>Analizando tu proceso...</h1>
        <div className={styles.stages}>
          {STAGES.map((stage, index) => (
            <span key={stage} className={styles.stageGroup}>
              <span className={`${styles.stage} ${index <= activeIndex ? styles.active : ""}`}>
                {stage}
              </span>
              {index < STAGES.length - 1 && (
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowRightIcon size={14} />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
