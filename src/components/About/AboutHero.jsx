import Link from "next/link";
import { ArrowRightIcon } from "../icons";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="about-title">
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>Sobre Docusia</p>
        <h1 id="about-title" className={styles.title}>
          Entender procesos. Organizar información. Aplicar tecnología con
          criterio.
        </h1>
        <p className={styles.lead}>
          Docusia combina conocimiento en procesos, gestión de la información
          y tecnología para ayudar a las empresas a trabajar de forma más
          organizada, eficiente y controlada.
        </p>
        <div className={styles.actions}>
          <Link href="/analizar-mi-proceso" className="btn btnPrimary">
            Analizar mi proceso
            <ArrowRightIcon size={16} />
          </Link>
          <Link href="/contacto" className="btn btnSecondary">
            Contactar
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
