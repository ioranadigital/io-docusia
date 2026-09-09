import { SignatureIcon } from "../icons";
import styles from "./SolutionCard.module.css";

export default function SolutionCard({
  icon: Icon,
  title,
  description,
  flow,
  variant = "list",
  image,
  imageAlt,
}) {
  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <span className={styles.icon}>
          <Icon size={22} />
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {variant === "image" ? (
        <div className={styles.imagePanel}>
          <img src={image} alt={imageAlt || ""} className={styles.flowImage} />
        </div>
      ) : variant === "signature" ? (
        <div className={`${styles.panel} ${styles.signaturePanel}`}>
          <span className={styles.signatureGraphic} aria-hidden="true">
            <SignatureIcon size={24} />
          </span>
          <ol className={styles.list}>
            {flow.map((step) => (
              <li key={step.label} className={step.accent ? styles.stepAccent : undefined}>
                <span className={styles.dot} />
                <span>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={`${styles.panel} ${variant === "layers" ? styles.layersPanel : ""}`}>
          {variant === "layers" && (
            <span className={styles.layersGraphic} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          )}
          <ol className={styles.list}>
            {flow.map((step) => (
              <li key={step.label} className={step.accent ? styles.stepAccent : undefined}>
                <span className={styles.dot} />
                <span>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}
