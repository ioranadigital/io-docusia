import { ProcessIcon, ArchiveIcon, AutomationIcon } from "../icons";
import styles from "./AboutKnowledge.module.css";

const DISCIPLINES = [
  {
    Icon: ProcessIcon,
    title: "Procesos",
    claim: "Entender cómo funciona el trabajo.",
    text: "Analizamos, documentamos y diseñamos procesos para identificar tareas, decisiones, responsabilidades y oportunidades de mejora.",
    tags: ["Mapas de procesos", "AS-IS / TO-BE", "Procedimientos", "Flujos de trabajo"],
  },
  {
    Icon: ArchiveIcon,
    title: "Información y documentación",
    claim: "Entender cómo se crea, organiza y utiliza la información.",
    text: "Docusia aporta conocimiento especializado en Biblioteconomía y Documentación, organización de información, arquitectura documental, clasificación y recuperación.",
    tags: ["Gestión documental", "Clasificación", "Arquitectura de información", "Conocimiento corporativo"],
  },
  {
    Icon: AutomationIcon,
    title: "Tecnología",
    claim: "Aplicar la herramienta adecuada al problema adecuado.",
    text: "Aplicamos inteligencia artificial, automatización e integraciones cuando permiten mejorar de forma concreta un proceso.",
    tags: ["IA", "n8n", "Google Workspace", "APIs", "Integraciones"],
  },
];

export default function AboutKnowledge() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="knowledge-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Nuestro conocimiento</p>
          <h2 id="knowledge-title" className={styles.title}>
            Tres disciplinas que necesitan trabajar juntas.
          </h2>
          <p className={styles.intro}>
            Los problemas de información rara vez se resuelven únicamente
            con tecnología. Docusia combina procesos, información y
            tecnología alrededor de la realidad de cada empresa.
          </p>
        </div>

        <div className={styles.disciplines}>
          {DISCIPLINES.map(({ Icon, title, claim, text, tags }) => (
            <div className={styles.discipline} key={title}>
              <span className={styles.disciplineIcon} aria-hidden="true">
                <Icon size={20} />
              </span>
              <h3 className={styles.disciplineTitle}>{title}</h3>
              <p className={styles.disciplineClaim}>{claim}</p>
              <p className={styles.disciplineText}>{text}</p>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={styles.graph}
          role="img"
          aria-label="Procesos, información y tecnología convergen en Docusia."
        >
          <div className={styles.graphSources} aria-hidden="true">
            <span className={styles.graphSource}>
              <span>
                <ProcessIcon size={14} />
              </span>
              Procesos
            </span>
            <span className={styles.graphSource}>
              <span>
                <ArchiveIcon size={14} />
              </span>
              Información
            </span>
            <span className={styles.graphSource}>
              <span>
                <AutomationIcon size={14} />
              </span>
              Tecnología
            </span>
          </div>
          <span className={styles.graphStem} aria-hidden="true" />
          <span className={styles.graphHub} aria-hidden="true">
            Docusia
          </span>
        </div>
      </div>
    </section>
  );
}
