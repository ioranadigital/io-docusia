import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ContactSection from "../../components/Contact/ContactSection";

export const metadata = {
  title: "Contacto",
  description:
    "Contacta con Docusia para mejorar procesos, organización de información, gestión documental, inteligencia artificial y automatización en tu empresa.",
  openGraph: {
    title: "Contacto | Docusia",
    description:
      "Contacta con Docusia para mejorar procesos, organización de información, gestión documental, inteligencia artificial y automatización en tu empresa.",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
