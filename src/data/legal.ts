/**
 * Données légales, éditoriales et RGPD centralisées d'alsek (www.alsek.fr).
 * Complétez les 3 constantes ci-dessous en une seconde avant la mise en ligne.
 */

export const RESPONSABLE_PUBLICATION = "[NOM PRÉNOM À COMPLÉTER]";
export const NUMERO_SIRET = "[SIRET À COMPLÉTER]";
export const ADRESSE_POSTALE = "[ADRESSE POSTALE À COMPLÉTER]";

export interface CookieCategoryDoc {
  id: "necessary" | "analytics" | "marketing";
  category: string;
  badge: string;
  requiresConsent: boolean;
  cookies: string;
  provider: string;
  purpose: string;
  duration: string;
}

export interface LegalOfferSummary {
  name: string;
  deliverables: string[];
}

export const LEGAL_INFO = {
  brand: "alsek", // Toujours en minuscules (Règle absolue AGENTS.md §1)
  commercialName: "alsek — Marketing Digital",
  legalForm: "Entrepreneur Individuel / Micro-entreprise",
  vatNotice: "TVA non applicable, article 293 B du Code Général des Impôts (CGI)",
  publicationDirector: RESPONSABLE_PUBLICATION,
  siret: NUMERO_SIRET,
  address: ADRESSE_POSTALE,
  phone: "06.14.30.88.01",
  phoneHref: "tel:+33614308801",
  email: "contact@alsek.fr",
  emailHref: "mailto:contact@alsek.fr",
  dpoEmail: "contact@alsek.fr",
  websiteUrl: "https://www.alsek.fr",
  websiteDisplay: "www.alsek.fr",
  lastUpdated: "Octobre 2026",

  host: {
    company: "OVH SAS (filiale de la société OVH Groupe SA)",
    capital: "50 000 000 €",
    rcs: "Lille Métropole 424 761 419 00045",
    vatNumber: "FR 22 424 761 419",
    address: "2 rue Kellermann, 59100 Roubaix, France",
    datacenter: "Datacenter OVHcloud de Francfort (Allemagne — Union Européenne)",
    smtpServer: "ssl0.ovh.net (chiffrement TLS/SSL de bout en bout, hébergé en Union Européenne)",
    website: "https://www.ovhcloud.com",
  },

  retention: {
    prospects: "3 ans à compter du dernier contact émanant du prospect",
    billing: "10 ans à compter de la clôture de l'exercice comptable (article L123-22 du Code de commerce)",
    cookies: "6 mois (180 jours, conformément aux recommandations de la CNIL)",
    dpoResponseDelay: "30 jours maximum",
  },

  links: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/politique-de-confidentialite" },
    { label: "Cookies", href: "/politique-cookies" },
    { label: "CGV", href: "/cgv" },
  ] as const,

  cookiesTable: [
    {
      id: "necessary",
      category: "Strictement nécessaires",
      badge: "Exempté de consentement",
      requiresConsent: false,
      cookies: "alsek_cookie_consent (localStorage)",
      provider: "alsek (interne)",
      purpose:
        "Mémorise vos choix d'acceptation ou de refus des traceurs afin de ne pas réafficher le bandeau à chaque visite.",
      duration: "6 mois (180 jours)",
    },
    {
      id: "analytics",
      category: "Mesure d'audience (Analytics)",
      badge: "Soumis à consentement",
      requiresConsent: true,
      cookies: "_ga, _ga_*",
      provider: "Google Ireland Limited (Google Analytics 4)",
      purpose:
        "Mesure anonymisée des visites, du parcours de lecture et des clics sur les formules afin d'améliorer l'expérience du site.",
      duration: "13 mois maximum",
    },
    {
      id: "marketing",
      category: "Publicité & Réseaux Sociaux (Marketing)",
      badge: "Soumis à consentement",
      requiresConsent: true,
      cookies: "_fbp, _fbc",
      provider: "Meta Platforms Ireland Limited (Pixel Meta)",
      purpose:
        "Mesure la performance des campagnes Instagram et Facebook d'alsek et comptabilise les demandes de devis (événement Lead).",
      duration: "90 jours (3 mois)",
    },
  ] as CookieCategoryDoc[],

  cgvOffers: [
    {
      name: "Formule Essentiel",
      deliverables: [
        "31 photos de publications prêtes à poster",
        "Conseils stratégiques éditoriaux",
      ],
    },
    {
      name: "Formule Évolution",
      deliverables: [
        "21 photos de publications",
        "31 photos au format Story (9:16)",
        "10 Shorts / Reels dynamiques (format vertical ~15 secondes)",
        "Conseils stratégiques éditoriaux",
      ],
    },
    {
      name: "Formule Maîtrise",
      deliverables: [
        "21 photos de publications",
        "31 photos au format Story (9:16)",
        "5 Shorts / Reels dynamiques (format vertical ~15 secondes)",
        "5 vidéos verticales scénarisées (storytelling, mise en scène ou prise de parole)",
        "Conseils stratégiques éditoriaux",
      ],
    },
  ] as LegalOfferSummary[],
} as const;
