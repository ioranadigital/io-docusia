import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
