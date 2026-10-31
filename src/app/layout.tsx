import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { ConsentProvider } from "@/context/ConsentContext";
import CookieBanner from "@/components/ui/CookieBanner";
import TrackingScripts from "@/components/analytics/TrackingScripts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "alsek | MARKETING DIGITAL — 1 Mois de Contenu Réseaux Sociaux",
  description:
    "Arrêtez de poster dans le vide. Nous tournons, scénarisons et produisons 30 jours de photos, stories et vidéos verticales 9:16 (Shorts, Reels, TikTok) clés en main.",
  metadataBase: new URL("https://www.alsek.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "alsek | MARKETING DIGITAL — 1 Mois de Contenu Réseaux Sociaux",
    description:
      "1 seul tournage = 30 jours de présence quotidienne sur Facebook, Instagram, TikTok et LinkedIn. Découvrez nos 3 offres clés en main : Essentiel, Évolution et Maîtrise.",
    url: "https://www.alsek.fr",
    siteName: "alsek",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "alsek | MARKETING DIGITAL — 1 Mois de Contenu Réseaux Sociaux",
    description:
      "1 seul tournage = 30 jours de photos, stories et vidéos verticales 9:16 prêts à poster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body className="bg-[#0B0F29] text-white font-sans antialiased selection:bg-[#00E676] selection:text-[#0B0F29]">
        <ConsentProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CookieBanner />
          <TrackingScripts />
        </ConsentProvider>
      </body>
    </html>
  );
}
