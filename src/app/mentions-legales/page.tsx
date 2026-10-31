import type { Metadata } from "next";
import LegalPageShell from "@/components/layout/LegalPageShell";
import { LEGAL_INFO } from "@/data/legal";

export const metadata: Metadata = {
  title: "Mentions légales | alsek",
  description:
    "Mentions légales officielles du site www.alsek.fr — éditeur, hébergement OVHcloud et propriété intellectuelle.",
  robots: {
    index: false,
    follow: true,
  },
};

const cardClass =
  "rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-3 text-sm text-white/80 leading-relaxed";

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell
      badge="CONFORMITÉ LCEN"
      title="Mentions légales"
      subtitle="Informations légales obligatoires relatives à l'édition et à l'hébergement du site www.alsek.fr conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)."
    >
      {/* 1. Éditeur du site */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          1. Éditeur du site
        </h2>
        <p>
          Le présent site internet <strong className="text-white">{LEGAL_INFO.websiteDisplay}</strong>{" "}
          est édité par <strong className="text-white">{LEGAL_INFO.commercialName}</strong> :
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Nom commercial
            </dt>
            <dd className="mt-1 font-semibold text-white">{LEGAL_INFO.commercialName}</dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Forme juridique
            </dt>
            <dd className="mt-1 font-semibold text-white">{LEGAL_INFO.legalForm}</dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Responsable de la publication
            </dt>
            <dd className="mt-1 font-semibold text-white">{LEGAL_INFO.publicationDirector}</dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Numéro SIRET
            </dt>
            <dd className="mt-1 font-semibold text-white">{LEGAL_INFO.siret}</dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5 sm:col-span-2">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Adresse du siège social
            </dt>
            <dd className="mt-1 font-semibold text-white">{LEGAL_INFO.address}</dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Téléphone
            </dt>
            <dd className="mt-1 font-semibold text-white">
              <a href={LEGAL_INFO.phoneHref} className="hover:text-[#00E676] transition-colors">
                {LEGAL_INFO.phone}
              </a>
            </dd>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-3.5">
            <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              E-mail de contact
            </dt>
            <dd className="mt-1 font-semibold text-white">
              <a href={LEGAL_INFO.emailHref} className="hover:text-[#00E676] transition-colors">
                {LEGAL_INFO.email}
              </a>
            </dd>
          </div>
        </dl>
        <p className="pt-1 text-xs font-semibold text-[#00E676]">
          Régime fiscal : {LEGAL_INFO.vatNotice}.
        </p>
      </section>

      {/* 2. Hébergement */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          2. Hébergement du site
        </h2>
        <p>
          Le site <strong className="text-white">{LEGAL_INFO.websiteDisplay}</strong> est hébergé au
          sein de l&apos;Union Européenne par :
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside text-white/80">
          <li>
            <strong className="text-white">Raison sociale :</strong> {LEGAL_INFO.host.company}
          </li>
          <li>
            <strong className="text-white">Capital social :</strong> {LEGAL_INFO.host.capital}
          </li>
          <li>
            <strong className="text-white">Immatriculation :</strong> RCS {LEGAL_INFO.host.rcs} — N°
            TVA intracommunautaire : {LEGAL_INFO.host.vatNumber}
          </li>
          <li>
            <strong className="text-white">Siège social :</strong> {LEGAL_INFO.host.address}
          </li>
          <li>
            <strong className="text-white">Localisation physique des serveurs :</strong>{" "}
            {LEGAL_INFO.host.datacenter}
          </li>
        </ul>
      </section>

      {/* 3. Propriété intellectuelle */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          3. Propriété intellectuelle
        </h2>
        <p>
          L&apos;ensemble de la structure du site, la charte graphique, la marque strictement
          typographique <strong className="text-white">{LEGAL_INFO.brand}</strong>, les animations,
          les accroches rédactionnelles ainsi que les montages vidéos (Shorts, Reels, vidéos
          verticales scénarisées) et photographies présentés sur le site sont la propriété
          exclusive de <strong className="text-white">{LEGAL_INFO.brand}</strong> ou de ses clients
          partenaires.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou adaptation, totale ou
          partielle, de tout ou partie des éléments du site, quel que soit le moyen ou le procédé
          utilisé, est formellement interdite sans l&apos;autorisation écrite préalable de{" "}
          <strong className="text-white">{LEGAL_INFO.brand}</strong>, sous peine de poursuites
          conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.
        </p>
      </section>

      {/* 4. Droit à l'image & Réalisations */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          4. Droit à l&apos;image &amp; réalisations clients
        </h2>
        <p>
          Les vidéos verticales au format 9:16 et les photographies exposées dans l&apos;espace
          « Réalisations » ont été tournées et produites dans le cadre de prestations réelles pour
          les entreprises clientes de <strong className="text-white">{LEGAL_INFO.brand}</strong>{" "}
          avec leur accord. Pour toute demande relative à un contenu diffusé, vous pouvez nous
          contacter directement à l&apos;adresse{" "}
          <a
            href={LEGAL_INFO.emailHref}
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            {LEGAL_INFO.email}
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
