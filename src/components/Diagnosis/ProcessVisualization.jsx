import {
  DocumentIcon,
  EmailIcon,
  DatabaseIcon,
  UsersIcon,
  LayersIcon,
  ProcessIcon,
  AutomationIcon,
} from "../icons";
import styles from "./ProcessVisualization.module.css";

const SOURCES = [
  { label: "Documentos", Icon: DocumentIcon },
  { label: "Email", Icon: EmailIcon },
  { label: "Datos", Icon: DatabaseIcon },
  { label: "Personas", Icon: UsersIcon },
];

const BRANCHES = [
  { label: "Ordenar", Icon: LayersIcon },
  { label: "Simplificar", Icon: ProcessIcon, accent: true },
  { label: "Automatizar", Icon: AutomationIcon },
];

const CURRENT_FLOW = ["Entrada", "Información", "Trabajo / Fricción", "Resultado"];

const POSSIBLE_FLOW = [
  { label: "Entrada" },
  { label: "Organización" },
  { label: "Inteligencia" },
  { label: "Validación" },
  { label: "Automatización" },
  { label: "Acción", accent: true },
];

function IntroDiagram() {
  return (
    <div className={styles.intro} role="img" aria-label="Documentos, email, datos y personas convergen en tareas manuales, errores y esperas. Docusia Diagnosis analiza el proceso y orienta hacia ordenar, simplificar o automatizar.">
      <div className={styles.sources}>
        {SOURCES.map(({ label, Icon }) => (
          <span className={styles.sourceChip} key={label}>
            <span>
              <Icon size={14} />
            </span>
            {label}
          </span>
        ))}
      </div>
      <span className={styles.stem} aria-hidden="true" />
      <div className={styles.mergeNode}>Tareas manuales · Errores · Esperas</div>
      <span className={styles.stem} aria-hidden="true" />
      <div className={styles.diagnosisNode}>Diagnosis</div>
      <div className={styles.branchLine} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className={styles.branches}>
        {BRANCHES.map(({ label, Icon, accent }) => (
          <span className={`${styles.branchNode} ${accent ? styles.accent : ""}`} key={label}>
            <span>
              <Icon size={14} />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompareDiagram() {
  return (
    <div className={styles.compare}>
      <div className={styles.column}>
        <p className={styles.columnTitle}>Proceso actual</p>
        <div className={styles.timeline}>
          {CURRENT_FLOW.map((label, index) => (
            <div key={label}>
              <div className={styles.timelineStep}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineLabel}>{label}</span>
              </div>
              {index < CURRENT_FLOW.length - 1 && (
                <span className={styles.timelineConnector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <p className={styles.columnTitle}>
          Posible enfoque
          <span className={styles.columnBadge}>A explorar</span>
        </p>
        <div className={styles.timeline}>
          {POSSIBLE_FLOW.map((step, index) => (
            <div key={step.label}>
              <div className={`${styles.timelineStep} ${step.accent ? styles.accentStep : ""}`}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineLabel}>{step.label}</span>
              </div>
              {index < POSSIBLE_FLOW.length - 1 && (
                <span className={styles.timelineConnector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessVisualization({ variant = "intro" }) {
  return variant === "compare" ? <CompareDiagram /> : <IntroDiagram />;
}
