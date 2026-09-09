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
  primaryLabel = "Cuéntanos tu proceso",
  primaryHref = "/analizar-mi-proceso",
  secondaryLabel = "Analizar mi proceso",
  secondaryHref = "/analizar-mi-proceso",
  claim = (
    <>
      Menos trabajo moviendo información.
      <br />
      Más valor utilizándola.
    </>
  ),
}) {
  const titleId = `${sectionId}-title`;

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
            <Link href={primaryHref} className={`btn btnOnDark ${styles.btn}`}>
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className={`btn btnOutlineOnDark ${styles.btn}`}>
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <p className={styles.claim}>{claim}</p>
      </div>
    </section>
  );
}
