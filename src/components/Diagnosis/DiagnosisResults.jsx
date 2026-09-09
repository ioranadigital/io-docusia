"use client";

import { useEffect, useState } from "react";
import OpportunityMap from "./OpportunityMap";
import RecommendationList from "./RecommendationList";
import ProcessVisualization from "./ProcessVisualization";
import DiagnosisLeadForm from "./DiagnosisLeadForm";
import { DIAGNOSIS_EVENTS, track } from "./data/analytics";
import styles from "./DiagnosisResults.module.css";

export default function DiagnosisResults({ result }) {
  const [leadMode, setLeadMode] = useState(null);

  useEffect(() => {
    track(DIAGNOSIS_EVENTS.COMPLETED);
  }, []);

  function openLead(mode) {
    track(DIAGNOSIS_EVENTS.LEAD_STARTED, { mode });
    setLeadMode(mode);
  }

  return (
    <section className={`section ${styles.section}`} aria-labelledby="diagnosis-results-title">
      <div className="container">
        <p className="eyebrow">Docusia Diagnosis</p>
        <h1 id="diagnosis-results-title" className={styles.title}>
          Primer análisis de tu proceso
        </h1>
        <p className={styles.intro}>
          A partir de tus respuestas hemos identificado algunas áreas que
          merece la pena revisar. Este resultado es orientativo y no
          sustituye un análisis detallado del proceso.
        </p>

        <div className={styles.summary}>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryLabel}>Proceso identificado</p>
            <p className={styles.summaryValue}>{result.processLabel}</p>
          </div>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryLabel}>Área</p>
            <p className={styles.summaryValue}>{result.areaLabel}</p>
          </div>
          {result.problemLabels.length > 0 && (
            <div className={`${styles.summaryBlock} ${styles.summaryWide}`}>
              <p className={styles.summaryLabel}>Problemas detectados</p>
              <div className={styles.chips}>
                {result.problemLabels.map((label) => (
                  <span className={styles.chip} key={label}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Mapa de oportunidades</h2>
          <p className={styles.blockIntro}>
            Estados orientativos por dimensión, no una puntuación exacta.
          </p>
          <div className={styles.blockBody}>
            <OpportunityMap opportunities={result.opportunities} />
          </div>
        </div>

        {result.recommendations.length > 0 && (
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>Áreas a revisar</h2>
            <div className={styles.blockBody}>
              <RecommendationList recommendations={result.recommendations} />
            </div>
          </div>
        )}

        <div className={styles.block}>
          <h2 className={styles.blockTitle}>Visualización del proceso</h2>
          <p className={styles.blockIntro}>
            Un posible enfoque a explorar, no la solución definitiva.
          </p>
          <div className={styles.blockBody}>
            <ProcessVisualization variant="compare" />
          </div>
        </div>

        <div className={styles.principle}>
          <p className={styles.principleTitle}>
            El resultado no tiene por qué ser automatizar.
          </p>
          <p className={styles.principleText}>
            En algunos procesos la mayor mejora puede venir de eliminar
            pasos, simplificar el flujo, organizar mejor la información o
            mantener determinadas decisiones bajo criterio humano.
          </p>
        </div>

        {!leadMode && (
          <div className={styles.leadIntro}>
            <h2 className={styles.blockTitle}>¿Quieres que revisemos este proceso contigo?</h2>
            <p className={styles.leadIntroText}>
              Podemos profundizar en el proceso, validar estas oportunidades
              y determinar qué siguiente paso tiene sentido.
            </p>
            <div className={styles.leadActions}>
              <button type="button" className="btn btnPrimary" onClick={() => openLead("review")}>
                Revisar mi proceso con Docusia →
              </button>
              <button type="button" className="btn btnSecondary" onClick={() => openLead("email")}>
                Recibir mi análisis por email →
              </button>
            </div>
          </div>
        )}

        {leadMode && (
          <div className={styles.leadFormWrap}>
            <DiagnosisLeadForm mode={leadMode} />
          </div>
        )}
      </div>
    </section>
  );
}
