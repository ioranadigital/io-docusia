import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LegalPage from "../../../components/Legal/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Docusia: cómo tratamos los datos que nos facilitas a través de este sitio web.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main>
        <LegalPage title="Política de privacidad">
          <section>
            <h2>Responsable del tratamiento</h2>
            <p>
              Docusia es responsable de los datos personales que nos facilitas a través de los
              formularios de este sitio web (Contacto y Analizar mi proceso). Puedes contactarnos a
              través del <Link href="/contacto">formulario de contacto</Link> para cualquier cuestión
              relacionada con tus datos.
            </p>
          </section>

          <section>
            <h2>Qué datos tratamos</h2>
            <p>
              Tratamos los datos que nos facilitas voluntariamente: nombre, empresa, email
              profesional y, opcionalmente, teléfono y cualquier comentario que decidas compartir. En
              &quot;Analizar mi proceso&quot; también recogemos tus respuestas sobre la situación de
              tu organización, para poder entender el contexto antes de proponerte una solución.
            </p>
          </section>

          <section>
            <h2>Finalidad</h2>
            <p>
              Usamos estos datos exclusivamente para responder a tu solicitud: valorar tu situación,
              contactar contigo y, si procede, presentarte una propuesta. No utilizamos tus datos con
              fines distintos a los indicados ni los cedemos a terceros ajenos a la prestación de este
              servicio.
            </p>
          </section>

          <section>
            <h2>Base legal</h2>
            <p>
              El tratamiento se basa en tu consentimiento, otorgado expresamente al enviar el
              formulario correspondiente.
            </p>
          </section>

          <section>
            <h2>Conservación</h2>
            <p>
              Conservamos tus datos mientras exista una relación comercial o potencial con Docusia, y
              en todo caso durante el tiempo necesario para cumplir con las obligaciones legales
              aplicables.
            </p>
          </section>

          <section>
            <h2>Tus derechos</h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
              y portabilidad escribiéndonos a través del{" "}
              <Link href="/contacto">formulario de contacto</Link>.
            </p>
          </section>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
