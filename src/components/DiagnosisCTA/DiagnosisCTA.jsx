import Image from "next/image";
import Link from "next/link";
import styles from "./DiagnosisCTA.module.css";

export default function DiagnosisCTA({
  sectionId = "diagnosis",
  eyebrow = "Docusia Diagnosis",
  title = "¿Qué proceso consume demasiado tiempo en tu empresa?",
  text = (
    <>
      Cuéntanos cómo funciona.
      <br />
      Analizamos dónde se pierde tiempo, cómo fluye la información y qué
      merece la pena mejorar.
    </>
  ),
  primaryLabel = "Analizar mi proceso",
  primaryHref = "/analizar-mi-proceso",
  secondaryLabel = "Contactar con Docusia",
  secondaryHref = "/contacto",
  claim = (
    <>
      Menos trabajo moviendo información.
      <br />
      Más valor utilizándola.
    </>
  ),
}) {
  const titleId = `${sectionId}-title`;

  // El botón "Analizar mi proceso" siempre va en amarillo, sea cual sea su
  // posición (primario o secundario) — depende del texto, no del slot,
  // porque este componente se reutiliza con distintas combinaciones de
  // labels según la página (home vs. nosotros).
  function actionClass(label, fallbackClass) {
    return label === "Analizar mi proceso"
      ? `btn ${styles.btnAccent} ${styles.btn}`
      : `btn ${fallbackClass} ${styles.btn}`;
  }

  return (
    <section id={sectionId} className={`section ${styles.section}`} aria-labelledby={titleId}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.titleBlock}>
          <Image
            src="/diagnosis/diagnosis-graphic.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className={styles.decoration}
          />
          <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>

        <div className={styles.middle}>
          <p className={styles.text}>{text}</p>
          <div className={styles.actions}>
            <Link href={primaryHref} className={actionClass(primaryLabel, "btnOnDark")}>
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className={actionClass(secondaryLabel, "btnOnDark")}>
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <p className={styles.claim}>{claim}</p>
      </div>
    </section>
  );
}
