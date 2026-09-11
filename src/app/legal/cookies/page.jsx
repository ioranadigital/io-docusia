import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LegalPage from "../../../components/Legal/LegalPage";
import Link from "next/link";
import styles from "../../../components/Legal/LegalPage.module.css";

export const metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Docusia: qué cookies utilizamos en este sitio web y para qué.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main>
        <LegalPage title="Política de cookies">
          <section>
            <h2>Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
              información entre visitas o durante tu navegación.
            </p>
          </section>

          <section>
            <h2>Cookies que utilizamos</h2>
            <p>
              docusia.com solo utiliza almacenamiento estrictamente necesario. No utilizamos cookies
              de analítica ni de publicidad.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Finalidad</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>docusia_cookie_consent</td>
                    <td>Necesaria (localStorage)</td>
                    <td>
                      Guarda tu elección sobre cookies (almacenamiento local del navegador, no se
                      envía al servidor).
                    </td>
                    <td>Hasta que la modifiques</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Cookies que no utilizamos</h2>
            <p>
              No utilizamos cookies de analítica (como Google Analytics), ni cookies publicitarias o
              de seguimiento de terceros (como Meta Pixel o LinkedIn Insight Tag), ni contenido
              embebido de terceros. Si en el futuro incorporamos alguna de estas herramientas,
              actualizaremos esta página y te pediremos tu consentimiento antes de activarlas.
            </p>
          </section>

          <section>
            <h2>Cómo gestionar tus preferencias</h2>
            <p>
              Puedes revisar o cambiar tu elección en cualquier momento desde &quot;Preferencias de
              cookies&quot;, disponible en el pie de página de este sitio. También puedes eliminar las
              cookies desde la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2>Contacto</h2>
            <p>
              Para cualquier duda sobre esta política, escríbenos a través del{" "}
              <Link href="/contacto">formulario de contacto</Link>.
            </p>
          </section>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
