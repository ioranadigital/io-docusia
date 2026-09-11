import { Inter, Caveat } from "next/font/google";
import { ConsentProvider } from "../lib/consent/ConsentContext";
import CookieConsentRoot from "../components/Consent/CookieConsentRoot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Docusia — Inteligencia documental y automatización para empresas",
    template: "%s | Docusia",
  },
  description:
    "Docusia analiza tus procesos, organiza tu información y utiliza IA y automatización para reducir tareas repetitivas, errores y tiempos de gestión.",
  openGraph: {
    title: "Docusia — Inteligencia documental y automatización para empresas",
    description:
      "Docusia analiza tus procesos, organiza tu información y utiliza IA y automatización para reducir tareas repetitivas, errores y tiempos de gestión.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        <ConsentProvider>
          {children}
          <CookieConsentRoot />
        </ConsentProvider>
      </body>
    </html>
  );
}
