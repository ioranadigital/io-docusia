import styles from "./AboutValue.module.css";

const COMPANY_ITEMS = ["Procesos", "Personas", "Información", "Herramientas"];

const STEPS = [
  { title: "Analizar", text: "Detectar dónde se pierde tiempo o control." },
  { title: "Ordenar", text: "Estructurar procesos e información." },
  { title: "Diseñar", text: "Definir cómo debería funcionar." },
  { title: "Implementar", text: "Aplicar las mejoras y tecnología necesarias." },
  { title: "Acompañar", text: "Documentar, formar y facilitar la adopción." },
];

export default function AboutValue() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="value-title">
      <div className="container">
        <div className={styles.centered}>
          <p className={`eyebrow ${styles.eyebrow}`}>Para tu empresa</p>
          <h2 id="value-title" className={styles.title}>
            Nuestro conocimiento solo tiene valor si mejora tu forma de
            trabajar.
          </h2>
          <p className={styles.text}>
            Trabajamos sobre los procesos, personas, información y
            herramientas que ya existen en la empresa para identificar dónde
            tiene sentido intervenir.
          </p>
        </div>

        <div
          className={styles.flow}
          role="img"
          aria-label="Tu empresa (procesos, personas, información y herramientas) llega a Docusia, que analiza, ordena, diseña, implementa y acompaña."
        >
          <div className={styles.companyBox} aria-hidden="true">
            <p className={styles.companyLabel}>Tu empresa</p>
            <div className={styles.companyItems}>
              {COMPANY_ITEMS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <span className={styles.stem} aria-hidden="true" />
          <span className={styles.hub} aria-hidden="true">
            Docusia
          </span>
          <span className={styles.stem} aria-hidden="true" />
          <div className={styles.steps} aria-hidden="true">
            {STEPS.map(({ title }, index) => (
              <span className={styles.step} key={title}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                {title}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.stepsList}>
          {STEPS.map(({ title, text }) => (
            <div className={styles.stepsListItem} key={title}>
              <p className={styles.stepsListTitle}>{title}</p>
              <p className={styles.stepsListText}>{text}</p>
            </div>
          ))}
        </div>

        <p className={styles.quote}>
          Una solución no está implantada cuando funciona técnicamente, sino
          cuando puede utilizarse correctamente dentro de la organización.
        </p>
      </div>
    </section>
  );
}
