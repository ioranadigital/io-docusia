import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DiagnosisCTA from "../../components/DiagnosisCTA/DiagnosisCTA";
import AboutHero from "../../components/About/AboutHero";
import AboutWhy from "../../components/About/AboutWhy";
import AboutKnowledge from "../../components/About/AboutKnowledge";
import AboutPrinciples from "../../components/About/AboutPrinciples";
import AboutValue from "../../components/About/AboutValue";
import AboutTeam from "../../components/About/AboutTeam";

export const metadata = {
  title: { absolute: "Sobre Docusia | Procesos, información y tecnología" },
  description:
    "Conoce el enfoque de Docusia y cómo combinamos procesos, gestión de información, documentación, inteligencia artificial y automatización para mejorar la forma de trabajar de las empresas.",
  openGraph: {
    title: "Sobre Docusia | Procesos, información y tecnología",
    description:
      "Conoce el enfoque de Docusia y cómo combinamos procesos, gestión de información, documentación, inteligencia artificial y automatización para mejorar la forma de trabajar de las empresas.",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutWhy />
        <AboutKnowledge />
        <AboutPrinciples />
        <AboutValue />
        <AboutTeam />
        <DiagnosisCTA
          sectionId="empecemos"
          eyebrow="Empecemos por entender"
          title="¿Hay un proceso que podría funcionar mejor?"
          text="Podemos empezar entendiendo cómo funciona actualmente y dónde existen oportunidades reales de mejora."
          primaryLabel="Analizar mi proceso"
          primaryHref="/analizar-mi-proceso"
          secondaryLabel="Contactar con Docusia"
          secondaryHref="/contacto"
          claim={
            <>
              Procesos. Información.
              <br />
              Tecnología con criterio.
            </>
          }
        />
      </main>
      <Footer />
    </>
  );
}
