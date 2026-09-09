import styles from "./DiagnosisProgress.module.css";

export default function DiagnosisProgress({ step, total }) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className={styles.wrap}>
      <p className={styles.label} aria-live="polite">
        Paso {step} de {total}
      </p>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Paso ${step} de ${total}`}
      >
        <span className={styles.fill} style={{ "--progress": `${percent}%` }} />
      </div>
    </div>
  );
}
