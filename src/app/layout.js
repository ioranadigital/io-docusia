import { Kumbh_Sans } from "next/font/google";
import localFont from 'next/font/local';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";
import './assets/responsive.css';

const kumbh_sans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--body-color-font',
});

const clashdisplay = localFont({
  src: './assets/fonts/ClashDisplay.ttf',
  variable: '--heading-font',
})

export const metadata = {
  title: {
    absolute: '',
    default: 'Dexon - SEO & Digital Marketing Agency NextJS Template',
    template: '%s | Dexon - SEO & Digital Marketing Agency NextJS Template',
  },
  description: 'Dexon - SEO & Digital Marketing Agency NextJS Template',
  openGraph: {
    title: 'Dexon - SEO & Digital Marketing Agency NextJS Template',
    description: 'Dexon - SEO & Digital Marketing Agency NextJS Template',
    image: '/openGraphImage.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${kumbh_sans.variable} ${clashdisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}
