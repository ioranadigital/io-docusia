import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LegalPage from "../../../components/Legal/LegalPage";
import Link from "next/link";

export const metadata = {
  title: "Aviso legal",
  description: "Aviso legal de Docusia: condiciones de uso, propiedad intelectual y responsabilidad sobre este sitio web.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AvisoLegalPage() {
  return (
    <>
      <Header />
      <main>
        <LegalPage title="Aviso legal">
          <section>
            <h2>Titular del sitio web</h2>
            <p>
              Este sitio web se publica bajo la marca comercial Docusia. Para cualquier consulta
              relativa a este aviso legal o a la identificación del titular, puedes escribirnos a
              través del <Link href="/contacto">formulario de contacto</Link>.
            </p>
          </section>

          <section>
            <h2>Objeto</h2>
            <p>
              Este sitio web tiene como finalidad informar sobre los servicios de Docusia en materia
              de gestión documental, organización de la información y automatización de procesos, y
              permitir el contacto con potenciales clientes a través de los formularios disponibles
              (Contacto y Analizar mi proceso).
            </p>
          </section>

          <section>
            <h2>Condiciones de uso</h2>
            <p>
              El acceso y uso de este sitio web atribuye la condición de usuario e implica la
              aceptación de las condiciones incluidas en este aviso legal. El usuario se compromete a
              hacer un uso adecuado de los contenidos y servicios que se ofrecen, y a no emplearlos
              para incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento
              legal.
            </p>
          </section>

          <section>
            <h2>Propiedad intelectual e industrial</h2>
            <p>
              Los contenidos de este sitio web (textos, diseño, marca y logotipo de Docusia) son
              propiedad de su titular o se utilizan con la debida autorización. Queda prohibida su
              reproducción, distribución o transformación sin autorización previa, salvo para uso
              personal y no comercial.
            </p>
          </section>

          <section>
            <h2>Responsabilidad</h2>
            <p>
              Docusia no garantiza la disponibilidad continuada del sitio web ni se responsabiliza de
              los daños que pudieran derivarse de interrupciones, errores o del uso indebido de los
              contenidos por parte de terceros.
            </p>
          </section>

          <section>
            <h2>Privacidad y cookies</h2>
            <p>
              El tratamiento de datos personales y el uso de cookies se rigen por nuestra{" "}
              <Link href="/legal/privacidad">Política de Privacidad</Link> y nuestra{" "}
              <Link href="/legal/cookies">Política de Cookies</Link>.
            </p>
          </section>

          <section>
            <h2>Legislación aplicable</h2>
            <p>
              Este aviso legal se rige por la legislación española. Para cualquier controversia
              derivada del uso de este sitio web, las partes se someterán a los juzgados y tribunales
              que correspondan conforme a la normativa aplicable.
            </p>
          </section>

          <section>
            <h2>Contacto</h2>
            <p>
              Para cualquier duda sobre este aviso legal, escríbenos a través del{" "}
              <Link href="/contacto">formulario de contacto</Link>.
            </p>
          </section>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
