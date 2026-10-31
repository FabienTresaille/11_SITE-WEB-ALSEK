import type { Metadata } from "next";
import LegalPageShell from "@/components/layout/LegalPageShell";
import CookiePreferencesButton from "@/components/ui/CookiePreferencesButton";
import { LEGAL_INFO } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politique de cookies (CNIL) | alsek",
  description:
    "Gestion des cookies et traceurs sur www.alsek.fr conformément aux lignes directrices de la CNIL — Google Analytics 4 et Pixel Meta.",
  robots: {
    index: false,
    follow: true,
  },
};

const cardClass =
  "rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-3 text-sm text-white/80 leading-relaxed";

export default function PolitiqueCookiesPage() {
  return (
    <LegalPageShell
      badge="DIRECTIVES CNIL"
      title="Politique de gestion des cookies"
      subtitle="Détail complet des traceurs susceptibles d'être utilisés sur www.alsek.fr et gestion immédiate de vos préférences."
    >
      {/* 1. Définition & engagement CNIL */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          1. Qu&apos;est-ce qu&apos;un cookie et comment appliquons-nous les règles CNIL ?
        </h2>
        <p>
          Un cookie (ou stockage local navigateur) est un petit fichier texte enregistré sur votre
          terminal lors de la consultation d&apos;un site internet. Conformément aux lignes
          directrices et recommandations de la <strong className="text-white">CNIL</strong> :
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside text-white/80">
          <li>
            <strong className="text-white">Zéro exécution avant accord :</strong> ni Google
            Analytics (<code className="text-[#00E676]">gtag.js</code>), ni le Pixel Meta (
            <code className="text-[#00E676]">fbevents.js</code>) ne sont chargés dans votre
            navigateur tant que vous n&apos;avez pas exprimé un consentement positif.
          </li>
          <li>
            <strong className="text-white">Refus aussi simple que l&apos;acceptation :</strong> le
            bandeau de premier niveau propose un bouton « Tout refuser » de même visibilité que
            « Tout accepter ».
          </li>
          <li>
            <strong className="text-white">Validité limitée à 6 mois :</strong> votre choix est
            mémorisé pendant 180 jours dans <code className="text-[#00E676]">alsek_cookie_consent</code>,
            puis redemandé automatiquement à expiration.
          </li>
        </ul>
      </section>

      {/* 2. Bouton interactif de réouverture */}
      <section className="rounded-2xl bg-gradient-to-br from-[#1E3AFF]/25 via-white/5 to-[#00E676]/10 border border-white/15 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
            2. Gérer vos préférences à tout moment
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/75">
            Vous pouvez activer ou retirer votre consentement par catégorie en un clic, sans aucun
            impact sur votre accès au site.
          </p>
        </div>
        <div className="shrink-0">
          <CookiePreferencesButton label="Modifier mes préférences de cookies" />
        </div>
      </section>

      {/* 3. Tableau récapitulatif des 3 catégories */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          3. Tableau récapitulatif des traceurs utilisés
        </h2>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15 text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
                <th className="py-3 pr-4">Catégorie &amp; Statut</th>
                <th className="py-3 px-4">Traceurs</th>
                <th className="py-3 px-4">Émetteur &amp; Finalité</th>
                <th className="py-3 pl-4">Durée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {LEGAL_INFO.cookiesTable.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="py-4 pr-4">
                    <div className="font-bold text-white">{row.category}</div>
                    <span
                      className={`mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        row.requiresConsent
                          ? "bg-[#1E3AFF]/30 text-white border border-[#1E3AFF]/50"
                          : "bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30"
                      }`}
                    >
                      {row.badge}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-white/90">{row.cookies}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{row.provider}</div>
                    <p className="mt-1 text-xs text-white/70">{row.purpose}</p>
                  </td>
                  <td className="py-4 pl-4 whitespace-nowrap font-semibold text-white/85">
                    {row.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </LegalPageShell>
  );
}
