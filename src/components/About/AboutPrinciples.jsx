import styles from "./AboutPrinciples.module.css";

const PRINCIPLES = [
  {
    n: "01",
    title: "Entender antes de automatizar",
    text: "No automatizamos un proceso simplemente porque técnicamente sea posible.",
  },
  {
    n: "02",
    title: "Organizar antes de escalar",
    text: "La inteligencia artificial y la automatización funcionan mejor cuando la información tiene estructura y contexto.",
  },
  {
    n: "03",
    title: "No todo debe automatizarse",
    text: "Distinguimos qué conviene eliminar, simplificar, organizar, asistir, automatizar o mantener bajo criterio humano.",
  },
  {
    n: "04",
    title: "Medir para mejorar",
    text: "Una solución debe producir una mejora observable en tiempo, errores, control, trazabilidad, capacidad o acceso a la información.",
  },
];

export default function AboutPrinciples() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="principles-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Nuestro criterio</p>
          <h2 id="principles-title" className={styles.title}>
            La tecnología necesita criterio.
          </h2>
          <p className={styles.intro}>
            La experiencia trabajando con procesos e información nos lleva a
            partir del problema antes que de la herramienta.
          </p>
        </div>

        <ol className={styles.list}>
          {PRINCIPLES.map(({ n, title, text }) => (
            <li className={styles.item} key={n}>
              <span className={styles.number} aria-hidden="true">
                {n}
              </span>
              <span>
                <p className={styles.itemTitle}>{title}</p>
                <p className={styles.itemText}>{text}</p>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
