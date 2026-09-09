import styles from "./Logo.module.css";

export default function Logo({ tagline = false, onDark = false, size = 36, image, imageHeight }) {
  if (image) {
    return (
      <a href="/" className={styles.logoImage} aria-label="Docusia — Inicio">
        <img src={image} alt="Docusia" style={{ height: imageHeight }} className={styles.imageMark} />
      </a>
    );
  }

  return (
    <a href="/" className={`${styles.logo} ${onDark ? styles.onDark : ""}`} aria-label="Docusia — Inicio">
      <img src="/brand/isotipo.png" alt="" width={size} height={size} className={styles.mark} />
      <span className={styles.wordmarkGroup}>
        <span className={styles.wordmark}>DOCUSIA</span>
        {tagline && (
          <span className={styles.tagline}>Inteligencia documental y automatización</span>
        )}
      </span>
    </a>
  );
}
