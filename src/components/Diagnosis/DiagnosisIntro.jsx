import { ArrowRightIcon } from "../icons";
import styles from "./DiagnosisIntro.module.css";

export default function DiagnosisIntro({ onStart }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="diagnosis-intro-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">Docusia Diagnosis</p>
          <h1 id="diagnosis-intro-title" className={styles.title}>
            Analicemos qué proceso está consumiendo tiempo en tu empresa.
          </h1>
          <p className={styles.lead}>
            Responde a unas preguntas sobre cómo trabajáis actualmente.
            Identificaremos problemas de información, tareas manuales y
            posibles oportunidades de mejora.
          </p>
          <p className={styles.note}>
            No necesitas saber qué tecnología utilizar. Necesitamos entender
            qué está ocurriendo.
          </p>
          <div className={styles.actions}>
            <button type="button" className="btn btnPrimary" onClick={onStart}>
              Empezar análisis
              <ArrowRightIcon size={16} />
            </button>
            <p className={styles.microcopy}>Proceso guiado · Sin conocimientos técnicos</p>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <img
            src="/diagnosis/diagnosis-hero.png"
            alt=""
            className={styles.visualImage}
          />
        </div>
      </div>
    </section>
  );
}
