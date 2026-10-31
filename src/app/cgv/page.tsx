import type { Metadata } from "next";
import LegalPageShell from "@/components/layout/LegalPageShell";
import { LEGAL_INFO } from "@/data/legal";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) | alsek",
  description:
    "Conditions Générales de Vente et de Prestation de Services d'alsek — formules mensuelles Essentiel, Évolution et Maîtrise, tournage et droits de diffusion.",
  robots: {
    index: false,
    follow: true,
  },
};

const cardClass =
  "rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-3 text-sm text-white/80 leading-relaxed";

export default function CgvPage() {
  return (
    <LegalPageShell
      badge="CADRE CONTRACTUEL B2B"
      title="Conditions Générales de Vente & de Prestation"
      subtitle="Conditions applicables aux prestations de création photographique, vidéo verticale 9:16 et accompagnement éditorial réalisées par alsek."
    >
      {/* 1. Objet & Formules */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          1. Objet &amp; présentation des formules
        </h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
          entre <strong className="text-white">{LEGAL_INFO.commercialName}</strong> (ci-après « le
          Prestataire ») et tout client professionnel, commerçant, artisan, restaurateur, société ou
          association (ci-après « le Client ») commandant une prestation de production de contenus
          visuels pour les réseaux sociaux.
        </p>
        <p>
          <strong className="text-white">{LEGAL_INFO.brand}</strong> propose notamment trois
          formules mensuelles clés en main destinées à assurer 30 jours de présence sur les réseaux
          sociaux, ainsi que des réalisations sur-mesure :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {LEGAL_INFO.cgvOffers.map((offer) => (
            <div
              key={offer.name}
              className="rounded-xl bg-[#0B0F29]/75 border border-white/10 p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#00E676] mb-2">
                  {offer.name}
                </h3>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {offer.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="text-[#00E676] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-semibold text-white/55">
                Tarif communiqué sur devis personnalisé
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Devis, Tarifs & Fiscalité */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          2. Devis, tarifs &amp; fiscalité
        </h2>
        <p>
          Les prestations font systématiquement l&apos;objet d&apos;un devis écrit préalable
          détaillant la formule retenue, le volume de livrables, le calendrier de captation et les
          conditions financières convenues. La commande est ferme dès réception du devis daté et
          signé avec la mention « Bon pour accord ».
        </p>
        <p className="font-semibold text-[#00E676]">
          Franchise en base de TVA : les prix sont exprimés en Euros — {LEGAL_INFO.vatNotice}.
        </p>
        <p>
          Sauf mention particulière figurant sur le devis, les factures sont payables à réception ou
          selon l&apos;échéancier convenu par virement bancaire. Conformément à l&apos;article
          L441-10 du Code de commerce, tout retard de paiement par un Client professionnel entraîne
          de plein droit l&apos;exigibilité de pénalités de retard ainsi que l&apos;indemnité
          forfaitaire légale pour frais de recouvrement de quarante (40) euros.
        </p>
      </section>

      {/* 3. Déroulement du tournage */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          3. Organisation &amp; report du tournage
        </h2>
        <p>
          Chaque pack mensuel s&apos;articule autour d&apos;une session de captation concentrée (en
          principe une demi-journée avec studio mobile : éclairage, caméras et prise de son)
          organisée dans les locaux du Client selon les angles et scénarios préparés en amont.
        </p>
        <p>
          Le Client s&apos;engage à faciliter l&apos;accès aux lieux, produits et intervenants
          prévus lors du créneau retenu, et à recueillir le cas échéant l&apos;accord des personnes
          filmées ou photographiées au sein de son établissement.
        </p>
        <p className="rounded-xl bg-[#1E3AFF]/15 border border-[#1E3AFF]/35 px-4 py-3 text-xs sm:text-sm text-white">
          <strong>Condition de report :</strong> tout report ou annulation de session de tournage à
          l&apos;initiative du Client doit être signalé par écrit au minimum{" "}
          <strong className="text-[#00E676]">48 heures</strong> ouvrées à l&apos;avance (hors cas de
          force majeure dûment justifié), afin de permettre la reprogrammation de l&apos;équipe et
          du matériel dans le mois en cours.
        </p>
      </section>

      {/* 4. Livraison & Droits d'utilisation */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          4. Livraison &amp; cession des droits de diffusion réseaux sociaux
        </h2>
        <p>
          Les photographies retouchées et les vidéos montées (étalonnage, habillage dynamique et
          export vertical 9:16 / 4:5 prêt à poster) sont livrées au Client par lien de
          téléchargement sécurisé dans les délais convenus lors du tournage.
        </p>
        <p>
          <strong className="text-white">Cession des droits d&apos;utilisation :</strong> sous
          réserve du complet règlement de la facture correspondante,{" "}
          <strong className="text-white">{LEGAL_INFO.brand}</strong> cède au Client, à titre non
          exclusif, pour le monde entier et pour la durée légale de protection des droits
          d&apos;auteur, les droits de reproduction et de représentation des contenus livrés pour
          leur diffusion sur les réseaux sociaux et supports digitaux propres du Client (Instagram,
          Facebook, TikTok, LinkedIn, YouTube Shorts, site internet et fiche Google Business).
        </p>
        <p>
          Les fichiers bruts de tournage (rushes non montés et fichiers RAW) demeurent la propriété
          matérielle et intellectuelle du Prestataire, sauf accord spécifique mentionné au devis.
          Sauf opposition écrite du Client, <strong className="text-white">{LEGAL_INFO.brand}</strong>{" "}
          est autorisé à présenter un extrait des contenus réalisés à titre de référence
          professionnelle dans son portfolio (<strong className="text-white">{LEGAL_INFO.websiteDisplay}</strong>{" "}
          et comptes sociaux officiels).
        </p>
      </section>

      {/* 5. Droit applicable & règlement des différends */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          5. Droit applicable &amp; règlement amiable
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de difficulté relative à
          l&apos;interprétation ou à l&apos;exécution d&apos;une prestation, les parties
          s&apos;engagent à rechercher prioritairement une solution amiable en contactant{" "}
          <a
            href={LEGAL_INFO.emailHref}
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            {LEGAL_INFO.email}
          </a>
          . À défaut d&apos;accord amiable dans un délai de trente (30) jours, le litige relèvera de
          la compétence des tribunaux matériellement et territorialement compétents du ressort du
          siège du Prestataire.
        </p>
      </section>
    </LegalPageShell>
  );
}
