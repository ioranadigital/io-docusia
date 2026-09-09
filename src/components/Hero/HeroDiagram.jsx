import Image from "next/image";
import {
  DocumentIcon,
  EmailIcon,
  DatabaseIcon,
  FormIcon,
  CheckIcon,
  RegistryIcon,
  AlertIcon,
  FolderIcon,
} from "../icons";
import styles from "./HeroDiagram.module.css";

const INPUTS = [
  { label: "Documentos", Icon: DocumentIcon },
  { label: "Email", Icon: EmailIcon },
  { label: "Datos", Icon: DatabaseIcon },
  { label: "Formularios", Icon: FormIcon },
];

const OUTPUTS = [
  { label: "Tareas", Icon: CheckIcon },
  { label: "Registros", Icon: RegistryIcon },
  { label: "Alertas", Icon: AlertIcon },
  { label: "Archivos", Icon: FolderIcon },
];

const Y_POSITIONS = [12.5, 37.5, 62.5, 87.5];

function buildPaths(ys, side) {
  return ys.map((y) =>
    side === "left"
      ? `M9,${y} C28,${y} 30,50 46,50`
      : `M54,50 C70,50 72,${y} 91,${y}`
  );
}

export default function HeroDiagram() {
  return (
    <figure className={styles.wrapper}>
      <div className={styles.diagram}>
        <svg
          className={styles.lines}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {buildPaths(Y_POSITIONS, "left").map((d) => (
            <path key={d} d={d} />
          ))}
          {buildPaths(Y_POSITIONS, "right").map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>

        <ul className={`${styles.col} ${styles.colLeft}`}>
          {INPUTS.map(({ label, Icon }) => (
            <li key={label}>
              <span className={styles.nodeIcon}>
                <Icon size={16} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.center}>
          <span className={styles.layer} aria-hidden="true" />
          <span className={styles.layer} aria-hidden="true" />
          <span className={styles.layer} aria-hidden="true" />
          <div className={styles.centerCard}>
            <Image src="/brand/isotipo.png" alt="" width={48} height={48} />
            <span>DOCUSIA</span>
          </div>
        </div>

        <ul className={`${styles.col} ${styles.colRight}`}>
          {OUTPUTS.map(({ label, Icon }) => (
            <li key={label}>
              <span className={styles.nodeIcon}>
                <Icon size={16} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className={styles.caption}>
        La información en movimiento,
        <br />
        el negocio en avance.
      </figcaption>
    </figure>
  );
}
