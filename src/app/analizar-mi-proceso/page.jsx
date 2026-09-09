import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DiagnosisApp from "../../components/Diagnosis/DiagnosisApp";

export const metadata = {
  title: "Analizar mi proceso",
  description:
    "Analiza un proceso de tu empresa e identifica tareas manuales, problemas de información y posibles oportunidades de organización, IA y automatización.",
  openGraph: {
    title: "Analizar mi proceso | Docusia",
    description:
      "Analiza un proceso de tu empresa e identifica tareas manuales, problemas de información y posibles oportunidades de organización, IA y automatización.",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AnalizarMiProcesoPage() {
  return (
    <>
      <Header />
      <main>
        <DiagnosisApp />
      </main>
      <Footer />
    </>
  );
}
