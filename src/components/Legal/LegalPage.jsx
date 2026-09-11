import styles from "./LegalPage.module.css";

export default function LegalPage({ title, updated, children }) {
  return (
    <div className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <p className="eyebrow">Legal</p>
        <h1 className={styles.title}>{title}</h1>
        {updated && <p className={styles.updated}>Última actualización: {updated}</p>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
