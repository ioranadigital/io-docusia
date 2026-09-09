import {
  ProcessIcon,
  DocumentIcon,
  AutomationIcon,
  EnvironmentIcon,
  LayersIcon,
} from "../icons";
import styles from "./Capabilities.module.css";

const CAPABILITIES = [
  {
    label: "Procesos",
    text: "Entender y rediseñar cómo se trabaja.",
    Icon: ProcessIcon,
  },
  {
    label: "Información",
    text: "Organizar documentos, email y datos.",
    Icon: DocumentIcon,
  },
  {
    label: "Inteligencia",
    text: "Interpretar, extraer y validar información.",
    Icon: LayersIcon,
  },
  {
    label: "Automatización",
    text: "Conectar sistemas y ejecutar tareas.",
    Icon: AutomationIcon,
  },
  {
    label: "Entorno de trabajo",
    text: "Implantar herramientas y formas de colaboración.",
    Icon: EnvironmentIcon,
  },
];

export default function Capabilities() {
  return (
    <div id="capacidades" aria-labelledby="capabilities-title">
      <p className="eyebrow">Nuestras capacidades</p>
      <h2 id="capabilities-title" className={styles.title}>
        Una capacidad por sí sola rara vez resuelve un problema complejo.
      </h2>
      <p className={styles.intro}>
        Combinamos procesos, información, inteligencia y automatización con
        el entorno de trabajo adecuado para construir cada solución.
      </p>

      <ul className={styles.list}>
        {CAPABILITIES.map(({ label, text, Icon }) => (
          <li key={label} className={styles.item}>
            <span className={styles.node}>
              <Icon size={20} />
            </span>
            <span className={styles.itemBody}>
              <span className={styles.itemLabel}>{label}</span>
              <span className={styles.itemText}>{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
