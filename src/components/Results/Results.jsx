import styles from "./Results.module.css";

const LESS = ["Trabajo manual", "Errores", "Tiempo de búsqueda", "Duplicidades"];
const MORE = ["Control", "Trazabilidad", "Velocidad de respuesta", "Información útil"];

export default function Results() {
  return (
    <div id="resultados" aria-labelledby="results-title">
      <p className="eyebrow">Resultados</p>
      <h2 id="results-title" className={styles.title}>
        La automatización debe poder medirse.
      </h2>
      <p className={styles.note}>
        Cada proyecto parte de unos objetivos concretos. Medimos el
        impacto sobre el proceso para comprobar si la solución realmente
        mejora el trabajo.
      </p>

      <div className={styles.tiles}>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>Menos</span>
          <ul>
            {LESS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.tile} ${styles.tileAccent}`}>
          <span className={styles.tileLabel}>Más</span>
          <ul>
            {MORE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
