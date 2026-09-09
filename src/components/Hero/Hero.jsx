import Link from "next/link";
import { ArrowRightIcon } from "../icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>
            Inteligencia documental + automatización
          </p>
          <h1 className={styles.title}>
            Menos trabajo manual. Más control sobre tu información y tus
            procesos.
          </h1>
          <p className={styles.lead}>
            Docusia mejora procesos donde documentos, email y datos generan
            trabajo manual. Organizamos la información y aplicamos IA y
            automatización para convertirla en acciones, reducir tareas
            repetitivas y mejorar el control.
          </p>
          <div className={styles.actions}>
            <Link href="/analizar-mi-proceso" className="btn btnPrimary">
              Analizar mi proceso
              <ArrowRightIcon size={16} />
            </Link>
          </div>
          <p className={styles.microcopy}>
            Documentos · Email · Datos · Información · Procesos
          </p>
        </div>
        <div className={styles.heroImage}>
          <img
            src="/hero/hero-diagram-test.png"
            alt="Documentos, email, datos y formularios convergen en Docusia y se transforman en tareas, registros, alertas y archivos."
          />
        </div>
      </div>
    </section>
  );
}
