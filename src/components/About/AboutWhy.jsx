import { DocumentIcon, EmailIcon, DatabaseIcon, ProcessIcon } from "../icons";
import styles from "./AboutWhy.module.css";

const EXAMPLES = [
  { Icon: DocumentIcon, label: "Documentos", text: "difíciles de localizar." },
  { Icon: EmailIcon, label: "Email", text: "que genera tareas que alguien debe recordar." },
  { Icon: DatabaseIcon, label: "Datos", text: "que se copian manualmente entre herramientas." },
  { Icon: ProcessIcon, label: "Procesos", text: "que dependen del conocimiento de determinadas personas." },
];

export default function AboutWhy() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Por qué Docusia</p>
          <h2 id="why-title" className={styles.title}>
            Docusia nace de un problema que hemos visto repetirse durante
            años.
          </h2>
          <p className={styles.text}>
            A lo largo de la trayectoria profesional de sus fundadores,
            trabajando con procesos, documentación, información y
            tecnología, se repetía una misma situación: empresas con buenos
            profesionales y herramientas suficientes que perdían tiempo,
            recursos y capacidad porque la información y los procesos no
            estaban bien organizados.
          </p>
        </div>

        <div className={styles.examples}>
          {EXAMPLES.map(({ Icon, label, text }) => (
            <div className={styles.example} key={label}>
              <span className={styles.exampleIcon} aria-hidden="true">
                <Icon size={16} />
              </span>
              <p className={styles.exampleLabel}>{label}</p>
              <p className={styles.exampleText}>{text}</p>
            </div>
          ))}
        </div>

        <div className={styles.centered}>
          <p className={styles.closing}>
            Por separado parecen pequeños problemas. Repetidos cada día, se
            convierten en tiempo, errores, dependencia y costes.
          </p>

          <div className={styles.highlight}>
            <p className={styles.highlightTitle}>
              El problema no era necesariamente la falta de tecnología.
            </p>
            <p className={styles.highlightText}>
              Muchas veces faltaba entender el proceso, ordenar la
              información y conectar correctamente lo que ya existía.
            </p>
          </div>

          <p className={styles.evolution}>
            La evolución de la inteligencia artificial, la automatización y
            las integraciones permite abordar hoy procesos que antes
            dependían casi completamente del trabajo manual. Pero disponer
            de más tecnología no elimina la necesidad de organizar la
            información y diseñar correctamente los procesos.
          </p>

          <p className={styles.protagonist}>
            La tecnología ha cambiado.
            <br />
            <span>Los principios de una buena gestión de la información, no.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
