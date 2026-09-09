import styles from "./SplitSection.module.css";

export default function SplitSection({ left, right, tone = "default", ratio = "50-50" }) {
  return (
    <section className={`section ${styles.section} ${tone === "surface" ? styles.surface : ""}`}>
      <div
        className={`container ${styles.grid} ${ratio === "60-40" ? styles.ratio6040 : ""}`}
      >
        <div className={styles.col}>{left}</div>
        <div className={`${styles.col} ${styles.colRight}`}>{right}</div>
      </div>
    </section>
  );
}
