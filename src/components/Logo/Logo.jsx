import Image from "next/image";
import styles from "./Logo.module.css";

// Relación de aspecto real de /brand/logo-wordmark.png (2172x724) — se usa
// como intrínseco para que next/image conozca el ratio; el alto visible lo
// sigue marcando `imageHeight` vía estilo, igual que antes.
const WORDMARK_WIDTH = 2172;
const WORDMARK_HEIGHT = 724;

export default function Logo({
  tagline = false,
  onDark = false,
  size = 36,
  image,
  imageHeight,
  priority = false,
}) {
  if (image) {
    return (
      <a href="/" className={styles.logoImage} aria-label="Docusia — Inicio">
        <Image
          src={image}
          alt="Docusia"
          width={WORDMARK_WIDTH}
          height={WORDMARK_HEIGHT}
          style={{ height: imageHeight, width: "auto" }}
          className={styles.imageMark}
          priority={priority}
          sizes="150px"
        />
      </a>
    );
  }

  return (
    <a href="/" className={`${styles.logo} ${onDark ? styles.onDark : ""}`} aria-label="Docusia — Inicio">
      <Image src="/brand/isotipo.png" alt="" width={size} height={size} className={styles.mark} />
      <span className={styles.wordmarkGroup}>
        <span className={styles.wordmark}>DOCUSIA</span>
        {tagline && (
          <span className={styles.tagline}>Inteligencia documental y automatización</span>
        )}
      </span>
    </a>
  );
}
