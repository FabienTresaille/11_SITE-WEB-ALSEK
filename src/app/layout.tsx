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
  title:
    "alsek | Agence Réseaux Sociaux & Création Vidéo à Villefranche-sur-Saône",
  description:
    "Agence marketing digital à Villefranche-sur-Saône et alentours (Beaujolais, Lyon). 1 seul tournage chez vous = 30 jours de photos, stories, Shorts, Reels et vidéos TikTok prêts à poster.",
  metadataBase: new URL("https://www.alsek.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "alsek | Agence Réseaux Sociaux & Création Vidéo à Villefranche-sur-Saône",
    description:
      "1 seul tournage dans vos locaux à Villefranche-sur-Saône & alentours = 30 jours de présence quotidienne sur Instagram, TikTok, Facebook et LinkedIn.",
    url: "https://www.alsek.fr",
    siteName: "alsek",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "alsek | Agence Réseaux Sociaux & Création Vidéo à Villefranche-sur-Saône",
    description:
      "1 seul tournage à Villefranche-sur-Saône & alentours = 30 jours de photos, stories et vidéos verticales 9:16 prêts à poster.",
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
