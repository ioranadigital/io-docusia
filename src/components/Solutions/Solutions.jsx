import {
  DocumentIcon,
  EmailIcon,
  FolderIcon,
  SignatureIcon,
  GraduationCapIcon,
  UsersIcon,
} from "../icons";
import SolutionCard from "./SolutionCard";
import styles from "./Solutions.module.css";

const MAIN_SOLUTIONS = [
  {
    title: "Automatización de facturas",
    description:
      "Procesa las facturas recibidas desde su entrada hasta su registro y archivo, reduciendo tareas manuales y errores.",
    icon: DocumentIcon,
    variant: "image",
    image: "/solutions/facturas-flow.png",
    imageAlt:
      "Factura recibida y Extracción completadas, Validación en curso, Registro y Archivo pendientes.",
  },
  {
    title: "Gestión inteligente del email",
    description:
      "Identifica qué contiene cada mensaje, clasifica la información y activa el proceso adecuado sin depender de una gestión manual de la bandeja de entrada.",
    icon: EmailIcon,
    variant: "image",
    image: "/solutions/email-flow.png",
    imageAlt:
      "Email recibido y Clasificación completadas, Asignación en curso, Actuación pendiente.",
  },
  {
    title: "Organización y gestión documental",
    description:
      "Estructura documentos, carpetas, permisos y criterios de organización para que la información sea fácil de encontrar, utilizar y controlar.",
    icon: FolderIcon,
    variant: "image",
    image: "/solutions/documentos-flow.png",
    imageAlt:
      "Estructura y Recuperación completadas, Organización disponible, Control en curso.",
  },
  {
    title: "Gestión inteligente de contratos",
    description:
      "Extrae y controla la información importante que permanece dentro de tus contratos.",
    icon: SignatureIcon,
    variant: "image",
    image: "/solutions/contratos-flow.png",
    imageAlt:
      "Firma completada, Control en curso, Renovación completada.",
  },
];

const SECONDARY_SOLUTIONS = [
  {
    title: "Base de conocimiento empresarial",
    description:
      "Convierte procedimientos, manuales y documentación interna en conocimiento que las personas pueden consultar y utilizar cuando lo necesitan.",
    icon: GraduationCapIcon,
  },
  {
    title: "Onboarding y gestión de altas",
    description:
      "Organiza la recopilación de datos, documentos, validaciones y tareas necesarias para dar de alta clientes, proveedores, empleados o colaboradores.",
    icon: UsersIcon,
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className={`section ${styles.section}`} aria-labelledby="solutions-title">
      <div className="container">
        <div className={styles.headRow}>
          <div>
            <p className="eyebrow">Nuestras soluciones</p>
            <h2 id="solutions-title" className={styles.title}>
              Procesos de información
              <br />
              que pueden funcionar mejor.
            </h2>
            <p className={styles.intro}>
              Aplicamos organización, inteligencia y automatización a
              procesos concretos para reducir trabajo manual y mejorar su
              control.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {MAIN_SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.title} {...solution} />
          ))}
        </div>

        <div className={styles.secondaryGrid}>
          {SECONDARY_SOLUTIONS.map(({ title, description, icon: Icon }) => (
            <div className={styles.secondaryCard} key={title}>
              <span className={styles.secondaryIcon}>
                <Icon size={20} />
              </span>
              <span className={styles.secondaryBody}>
                <span className={styles.secondaryTitle}>{title}</span>
                <span className={styles.secondaryDescription}>{description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
