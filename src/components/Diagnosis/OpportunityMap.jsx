import styles from "./OpportunityMap.module.css";

// Barras discretas (no velocímetros): 3 segmentos que se rellenan según el
// nivel cualitativo. "Requiere análisis" no rellena ninguna barra y las
// marca como pendientes, en vez de sugerir una oportunidad baja.
function LevelBars({ score }) {
  return (
    <span className={styles.bars} aria-hidden="true">
      {[1, 2, 3].map((position) => (
        <span
          key={position}
          className={`${styles.bar} ${
            score >= position ? styles.filled : score === 0 ? styles.unknown : ""
          }`}
        />
      ))}
    </span>
  );
}

export default function OpportunityMap({ opportunities }) {
  return (
    <div className={styles.list} role="list">
      {opportunities.map((opportunity) => (
        <div className={styles.row} key={opportunity.id} role="listitem">
          <span className={styles.label}>{opportunity.label}</span>
          <span className={styles.levelWrap}>
            <LevelBars score={opportunity.score} />
            <span className={styles.levelText}>{opportunity.level}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
