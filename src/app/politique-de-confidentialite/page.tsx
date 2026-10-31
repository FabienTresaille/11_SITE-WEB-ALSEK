import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/layout/LegalPageShell";
import { LEGAL_INFO } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité (RGPD) | alsek",
  description:
    "Politique de protection des données personnelles (RGPD) d'alsek — collecte, sécurité SMTP OVHcloud, durées de conservation et droits des utilisateurs.",
  robots: {
    index: false,
    follow: true,
  },
};

const cardClass =
  "rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 space-y-3 text-sm text-white/80 leading-relaxed";

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell
      badge="PROTECTION DES DONNÉES (RGPD)"
      title="Politique de confidentialité"
      subtitle="Transparence complète sur les données collectées via www.alsek.fr, leur acheminement sécurisé en Union Européenne et l'exercice de vos droits conformément au Règlement (UE) 2016/679 (RGPD)."
    >
      {/* 1. Responsable du traitement */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          1. Responsable du traitement
        </h2>
        <p>
          Le responsable du traitement des données à caractère personnel collectées sur le site{" "}
          <strong className="text-white">{LEGAL_INFO.websiteDisplay}</strong> est{" "}
          <strong className="text-white">{LEGAL_INFO.commercialName}</strong> (
          {LEGAL_INFO.publicationDirector}, SIRET : {LEGAL_INFO.siret}, {LEGAL_INFO.address}).
        </p>
        <p>
          Point de contact dédié à la protection des données (DPO) :{" "}
          <a
            href={LEGAL_INFO.emailHref}
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            {LEGAL_INFO.dpoEmail}
          </a>{" "}
          — Tél. :{" "}
          <a href={LEGAL_INFO.phoneHref} className="text-white hover:text-[#00E676]">
            {LEGAL_INFO.phone}
          </a>
          .
        </p>
      </section>

      {/* 2. Données collectées & finalités */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          2. Données collectées via le formulaire de contact
        </h2>
        <p>
          Lorsque vous nous adressez une demande de devis ou de réservation de tournage, nous
          collectons strictement les informations nécessaires au traitement de votre demande :
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside text-white/80">
          <li>
            <strong className="text-white">Données d&apos;identification :</strong> Nom, prénom et/ou
            nom de l&apos;entreprise.
          </li>
          <li>
            <strong className="text-white">Coordonnées professionnelles :</strong> Adresse e-mail et
            numéro de téléphone (optionnel).
          </li>
          <li>
            <strong className="text-white">Projet éditorial :</strong> Formule envisagée (
            <em>Essentiel</em>, <em>Évolution</em>, <em>Maîtrise</em> ou <em>Projet sur-mesure</em>)
            et contenu de votre message.
          </li>
        </ul>
        <p>
          <strong className="text-white">Finalités :</strong> établissement d&apos;une proposition
          commerciale adaptée, planification des sessions de tournage et suivi de la relation
          précontractuelle.
        </p>
        <p>
          <strong className="text-white">Bases légales :</strong> exécution de mesures
          précontractuelles prises à votre demande (article 6.1.b du RGPD) et intérêt légitime de
          sécurisation anti-spam du formulaire (article 6.1.f du RGPD).
        </p>
      </section>

      {/* 3. Acheminement & sécurité */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          3. Acheminement chiffré &amp; souveraineté des données
        </h2>
        <p>
          Les messages soumis via le formulaire de contact sont transmis de manière chiffrée
          (protocole TLS/SSL sur le port sécurisé 465) directement via les serveurs SMTP souverains
          d&apos;OVHcloud (<code className="text-[#00E676]">ssl0.ovh.net</code>) vers la boîte
          professionnelle{" "}
          <strong className="text-white">{LEGAL_INFO.email}</strong>, sans revente ni stockage
          intermédiaire dans une base de données commerciale tierce hors Union Européenne.
        </p>
        <p>
          L&apos;application web est hébergée au sein du {LEGAL_INFO.host.datacenter}. Lorsque vous
          acceptez explicitement les traceurs optionnels de mesure d&apos;audience ou publicitaires,
          certaines données techniques de navigation peuvent être traitées par Google Ireland
          Limited et Meta Platforms Ireland Limited selon les modalités détaillées dans notre{" "}
          <Link
            href="/politique-cookies"
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            Politique de cookies
          </Link>
          .
        </p>
      </section>

      {/* 4. Durées de conservation */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          4. Durées de conservation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Prospects (Formulaire)
            </div>
            <div className="mt-1 text-base font-extrabold text-white">3 ans</div>
            <p className="mt-1 text-xs text-white/65">
              À compter du dernier contact émanant du prospect.
            </p>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Facturation (Clients)
            </div>
            <div className="mt-1 text-base font-extrabold text-white">10 ans</div>
            <p className="mt-1 text-xs text-white/65">
              Obligation légale comptable (art. L123-22 du Code de commerce).
            </p>
          </div>
          <div className="rounded-xl bg-[#0B0F29]/70 border border-white/10 p-4">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#00E676]">
              Choix Cookies
            </div>
            <div className="mt-1 text-base font-extrabold text-white">6 mois</div>
            <p className="mt-1 text-xs text-white/65">
              Conservation locale de votre consentement ou refus (180 jours).
            </p>
          </div>
        </div>
      </section>

      {/* 5. Droits des utilisateurs */}
      <section className={cardClass}>
        <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-white">
          5. Vos droits &amp; recours auprès de la CNIL
        </h2>
        <p>
          Conformément aux articles 15 à 22 du RGPD et à la loi Informatique et Libertés modifiée,
          vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, de portabilité et d&apos;opposition au traitement de vos données personnelles.
        </p>
        <p>
          Pour exercer vos droits, adressez un simple e-mail à{" "}
          <a
            href={LEGAL_INFO.emailHref}
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            {LEGAL_INFO.email}
          </a>
          . Une réponse vous sera apportée dans un délai de{" "}
          <strong className="text-white">{LEGAL_INFO.retention.dpoResponseDelay}</strong>. Si vous
          estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez
          introduire une réclamation auprès de la{" "}
          <strong className="text-white">CNIL</strong> (Commission Nationale de l&apos;Informatique
          et des Libertés —{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00E676] underline underline-offset-2 hover:text-white"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </section>
    </LegalPageShell>
  );
}
