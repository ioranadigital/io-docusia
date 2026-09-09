import styles from "./AboutTeam.module.css";

export default function AboutTeam() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="team-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Equipo</p>
          <h2 id="team-title" className={styles.title}>
            Un enfoque multidisciplinar.
          </h2>
          <p className={styles.text}>
            Los proyectos Docusia combinan capacidades de procesos,
            documentación, gestión de información, automatización e
            inteligencia artificial según las necesidades de cada proyecto.
          </p>
          <p className={styles.text}>
            No todos los problemas requieren las mismas capacidades ni todas
            las soluciones necesitan la misma tecnología.
          </p>
        </div>
      </div>
    </section>
  );
}
