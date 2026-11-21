import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { business } from "@/content/business";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CallBar } from "@/components/layout/CallBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessSchema } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Services Jardin Joannic · Jardinier et travaux bois autour de Moréac",
    template: "%s · Services Jardin Joannic",
  },
  description:
    "Gwenn Joannic, jardinier et constructeur bois à Moréac : taille de haies, tonte, désherbage, bois de chauffage, terrasses, pergolas, carports, élagage léger et conseil habitat gratuit. Locminé, Pontivy, Baud, Vannes, Auray, Ploërmel. CESU accepté.",
  applicationName: business.name,
  authors: [{ name: business.owner }],
  creator: business.owner,
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: business.name,
  },
  robots: { index: true, follow: true },
  category: "Jardinage et petits travaux",
};

export const viewport: Viewport = {
  themeColor: "#f4eee2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr-FR" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-dvh antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <CallBar />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
