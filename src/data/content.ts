export interface OfferItem {
  id: "essentiel" | "evolution" | "maitrise";
  name: string;
  badge?: string;
  volumeHighlight: string;
  volumeSublabel: string;
  idealFor: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  highlight?: boolean;
  reactionBadge?: "heart" | "thumb";
}

export type ShowcaseCategory = "shorts" | "scenarised" | "photos";

export interface VideoShowcaseItem {
  id: string;
  title: string;
  client: string;
  category: ShowcaseCategory;
  categoryLabel: string;
  /** "video" => lecteur 9:16 natif, "photo" => visuel publication / story */
  mediaType: "video" | "photo";
  /** Chemin statique servi depuis public/videos ou public/photos */
  src: string;
  /** Miniature WebP instantanée pour les vidéos (zéro téléchargement MP4 avant lecture) */
  poster?: string;
  aspectInfo: string;
}

export interface SocialLinkItem {
  name: "Facebook" | "Instagram" | "TikTok" | "LinkedIn";
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  highlightTag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClientLogo {
  name: string;
  sector: string;
}

export const BRAND_CONTENT = {
  identity: {
    brand: "alsek", // Toujours en minuscules (Règle absolue AGENTS.md)
    baseline: "MARKETING DIGITAL",
    phone: "06.14.30.88.01",
    phoneHref: "tel:+33614308801",
    whatsappHref:
      "https://wa.me/33614308801?text=Bonjour%20alsek%2C%20je%20souhaite%20un%20devis%20pour%201%20mois%20de%20contenu.",
    email: "contact@alsek.fr",
    emailHref: "mailto:contact@alsek.fr",
    website: "www.alsek.fr",
    websiteDisplay: "WWW.ALSEK.FR",
    city: "Villefranche-sur-Saône",
    postalCode: "69400",
    serviceArea: "Villefranche-sur-Saône, Beaujolais, Lyon & alentours",
    socials: ["Facebook", "Instagram", "TikTok", "LinkedIn"] as const,
    socialLinks: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61590401673262",
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/alsek.marketing",
      },
      {
        name: "TikTok",
        href: "https://www.tiktok.com/@alsek.marketing",
      },
      {
        name: "LinkedIn",
        href: "https://fr.linkedin.com/company/alsek-marketing-digital",
      },
    ] as SocialLinkItem[],
  },

  navbar: {
    links: [
      { label: "Réalisations", href: "#realisations" },
      { label: "La Méthode", href: "#methode" },
      { label: "Nos 3 Offres", href: "#offres" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaPhone: "06.14.30.88.01",
    ctaButton: "Réserver mon mois",
  },

  hero: {
    topBadge: "AGENCE CRÉATION CONTENU & VIDÉO • VILLEFRANCHE-SUR-SAÔNE & ALENTOURS",
    titleHighlight: "1 MOIS DE CONTENU",
    titleRest: "À POSTER TOUS LES JOURS SUR VOS RÉSEAUX SOCIAUX !",
    fullTitle:
      "1 MOIS DE CONTENU À POSTER TOUS LES JOURS SUR VOS RÉSEAUX SOCIAUX !",
    subtitle:
      "Arrêtez de poster dans le vide. Nous nous déplaçons à Villefranche-sur-Saône et alentours (Beaujolais, Lyon) pour tourner, scénariser et produire 30 jours de photos, stories et vidéos verticales conçus pour faire passer vos clients à l'action.",
    primaryCta: "Découvrir nos 3 offres",
    secondaryCta: "Voir nos réalisations ↓",
    /** Vidéo backstage en surimpression basse opacité (fond du Hero sur desktop) */
    showreelSrc: "/videos/hero-showreel.mp4",
    showreelPoster: "/videos/posters/hero-showreel.webp",
    metrics: [
      { value: "30 JOURS", label: "De présence continue" },
      { value: "1 TOURNAGE", label: "Villefranche & alentours" },
      { value: "9:16 NATIF", label: "Optimisé Reels & TikTok" },
    ],
  },

  clients: [
    { name: "Boulangerie Maison Fracchiolla", sector: "Artisanat & Pâtisserie" },
    { name: "Bistrot des Érudits", sector: "Restauration & Bistronomie" },
    { name: "Ô Fines Bouchées", sector: "Traiteur & Plateaux Gourmands" },
    { name: "Cappuccino CJ", sector: "Boutique Mode & Prêt-à-Porter" },
  ] as ClientLogo[],

  videoWall: {
    surtitle: "L'ATTENTION EST LA NOUVELLE MONNAIE",
    title: "ILS ONT CHOISI DE MARQUER LES ESPRITS À VILLEFRANCHE & ALENTOURS.",
    subtitle:
      "Un aperçu concret des Shorts, Reels, vidéos verticales scénarisées et shootings réalisés pour nos clients locaux.",
    bottomCta: "Obtenir le même résultat pour mon commerce",
    filters: [
      { id: "all", label: "Tous" },
      { id: "shorts", label: "Shorts / Reels (15 sec)" },
      { id: "scenarised", label: "Vidéos Scénarisées" },
      { id: "photos", label: "Photos & Stories" },
    ] as const,
    items: [
      {
        id: "fracchiolla-croissant",
        title: "Du tourage au fournil : nos croissants pur beurre en 13 secondes",
        client: "Maison Fracchiolla",
        category: "shorts",
        categoryLabel: "Short / Reel (15 sec)",
        mediaType: "video",
        src: "/videos/reel-1-croissant.mp4",
        poster: "/videos/posters/reel-1-croissant.webp",
        aspectInfo: "Savoir-faire artisanal & rythme",
      },
      {
        id: "bde-boite-pizza",
        title: "Quand l'ouverture de la boîte à pizza réserve une vraie surprise…",
        client: "Bistrot des Érudits",
        category: "scenarised",
        categoryLabel: "Vidéo Scénarisée",
        mediaType: "video",
        src: "/videos/reel-2-boite-pizza.mp4",
        poster: "/videos/posters/reel-2-boite-pizza.webp",
        aspectInfo: "Storytelling & mise en scène",
      },
      {
        id: "ofb-clignotement",
        title: "« Le Classique » : 4 pièces traiteur qui disparaissent en un clin d'œil",
        client: "Ô Fines Bouchées",
        category: "shorts",
        categoryLabel: "Short / Reel (15 sec)",
        mediaType: "video",
        src: "/videos/reel-3-fines-bouchees.mp4",
        poster: "/videos/posters/reel-3-fines-bouchees.webp",
        aspectInfo: "Hook visuel & montage cut",
      },
      {
        id: "ofb-panneau-noel",
        title: "Le panneau carton qui stoppe le scroll : « Commandez vos plateaux ! »",
        client: "Ô Fines Bouchées",
        category: "scenarised",
        categoryLabel: "Vidéo Scénarisée",
        mediaType: "video",
        src: "/videos/reel-4-panneau-traiteur.mp4",
        poster: "/videos/posters/reel-4-panneau-traiteur.webp",
        aspectInfo: "Hook viral & humour décalé",
      },
      {
        id: "bde-degustation",
        title: "Première bouchée en salle : la réaction qui donne faim instantanément",
        client: "Bistrot des Érudits",
        category: "shorts",
        categoryLabel: "Short / Reel (15 sec)",
        mediaType: "video",
        src: "/videos/reel-5-degustation.mp4",
        poster: "/videos/posters/reel-5-degustation.webp",
        aspectInfo: "Preuve sociale & gourmandise",
      },
      {
        id: "fracchiolla-fatigue",
        title: "Coup de mou derrière le comptoir ? La scène qui fait réagir l'audience",
        client: "Maison Fracchiolla",
        category: "scenarised",
        categoryLabel: "Vidéo Scénarisée",
        mediaType: "video",
        src: "/videos/reel-6-comptoir.mp4",
        poster: "/videos/posters/reel-6-comptoir.webp",
        aspectInfo: "Humour & proximité client",
      },
      {
        id: "cappuccino-photo",
        title: "Lookbook estival en boutique : robe broderie anglaise & panier tressé",
        client: "Cappuccino CJ",
        category: "photos",
        categoryLabel: "Photos & Stories",
        mediaType: "photo",
        src: "/photos/cappuccino-lookbook.jpg",
        aspectInfo: "Mode & lumière naturelle",
      },
      {
        id: "fracchiolla-photo",
        title: "Pâtisserie signature en clair-obscur : le visuel qui déclenche l'envie",
        client: "Maison Fracchiolla",
        category: "photos",
        categoryLabel: "Photos & Stories",
        mediaType: "photo",
        src: "/photos/fracchiolla-patisserie.jpg",
        aspectInfo: "Direction artistique & studio",
      },
      {
        id: "ofb-plateau-fetes",
        title: "Face caméra : le chef dévoile ses plateaux gourmands pièce par pièce",
        client: "Ô Fines Bouchées",
        category: "scenarised",
        categoryLabel: "Vidéo Scénarisée",
        mediaType: "video",
        src: "/videos/reel-8-plateau-fetes.mp4",
        poster: "/videos/posters/reel-8-plateau-fetes.webp",
        aspectInfo: "Prise de parole & incarnation",
      },
      {
        id: "bistrot-pizza-photo",
        title: "Pizza artisanale roquette & prosciutto : l'instant gourmand saisi à table",
        client: "Bistrot des Érudits",
        category: "photos",
        categoryLabel: "Photos & Stories",
        mediaType: "photo",
        src: "/photos/bistrot-pizza.jpg",
        aspectInfo: "Photographie culinaire & salle",
      },
      {
        id: "fracchiolla-pain-copains",
        title: "« Le Pain des Copains » : maïs, chorizo & mozza révélés en 10 secondes",
        client: "Maison Fracchiolla",
        category: "shorts",
        categoryLabel: "Short / Reel (15 sec)",
        mediaType: "video",
        src: "/videos/reel-7-pain-copains.mp4",
        poster: "/videos/posters/reel-7-pain-copains.webp",
        aspectInfo: "Format court & effet contraste",
      },
      {
        id: "ofb-mini-burger-photo",
        title: "Mini-burger sésame noir sur ardoise : la pièce cocktail qui attire l'œil",
        client: "Ô Fines Bouchées",
        category: "photos",
        categoryLabel: "Photos & Stories",
        mediaType: "photo",
        src: "/photos/ofb-mini-burger.jpg",
        aspectInfo: "Éclairage studio & macro",
      },
    ] as VideoShowcaseItem[],
  },

  process: {
    surtitle: "ZÉRO CHARGE MENTALE • VILLEFRANCHE, BEAUJOLAIS & LYON",
    title: "1 SEUL TOURNAGE CHEZ VOUS = 30 JOURS DE VISIBILITÉ.",
    steps: [
      {
        number: "01",
        title: "Stratégie & Hooks",
        description:
          "Conseils stratégiques et écriture des scénarios pour retenir l'audience dès les 2 premières secondes.",
        highlightTag: "Angles viraux & Scripts sur-mesure",
      },
      {
        number: "02",
        title: "Production Studio Mobile",
        description:
          "Déplacement dans vos locaux à Villefranche-sur-Saône et alentours (Beaujolais, Lyon, Rhône & Ain) avec éclairage studio, caméras cinéma et prise de son professionnelle.",
        highlightTag: "Demi-journée sans bloquer votre activité",
      },
      {
        number: "03",
        title: "Prêt à Poster",
        description:
          "Livraison de votre pack mensuel complet (publications, stories, Reels et vidéos scénarisées) optimisé pour Facebook, Instagram, TikTok et LinkedIn.",
        highlightTag: "30 jours de présence quotidienne",
      },
    ] as ProcessStep[],
  },

  pricing: {
    topBadge: "3 FORMULES CLÉS EN MAIN • 1 SEUL TOURNAGE",
    title: "NOS 3 OFFRES RÉSEAUX SOCIAUX !",
    subtitle:
      "1 MOIS DE CONTENU À POSTER TOUS LES JOURS SUR VOS RÉSEAUX SOCIAUX !",
    reassuranceBadge: "Devis gratuit sous 24h • Sans engagement • Adapté aux commerces & TPE",
    offers: [
      {
        id: "essentiel",
        name: "ESSENTIEL",
        volumeHighlight: "31 VISUELS",
        volumeSublabel: "Prêts à poster • Sur devis",
        idealFor:
          "Assurer une présence visuelle quotidienne, propre et régulière.",
        features: [
          "TOURNAGE SUR PLACE INCLUS",
          "31 PHOTOS DE PUBLICATIONS RETOUCHÉES",
          "FORMATS PRÊTS À POSTER",
          "CONSEILS STRATÉGIQUES",
        ],
        ctaText: "Choisir l'offre Essentiel",
        reactionBadge: "heart",
      },
      {
        id: "evolution",
        name: "ÉVOLUTION",
        badge: "LE PLUS POPULAIRE",
        volumeHighlight: "10 REELS + 52 PHOTOS",
        volumeSublabel: "Pack 30 jours • Sur devis",
        idealFor:
          "Dynamiser votre audience avec le combo quotidien Stories + Formats courts viraux.",
        features: [
          "21 PHOTOS DE PUBLICATIONS",
          "31 PHOTOS DE STORY",
          "CONSEILS STRATÉGIQUES",
          "10 SHORTS / REELS (15 SEC)",
        ],
        ctaText: "Choisir l'offre Évolution",
        popular: true,
        reactionBadge: "heart",
      },
      {
        id: "maitrise",
        name: "MAÎTRISE",
        badge: "IMPACT MAXIMUM",
        volumeHighlight: "10 VIDÉOS + 52 PHOTOS",
        volumeSublabel: "Dont 5 scénarisées • Sur devis",
        idealFor:
          "Dominer votre secteur local grâce au storytelling et aux vidéos verticales scénarisées.",
        features: [
          "21 PHOTOS DE PUBLICATIONS",
          "CONSEILS STRATÉGIQUES",
          "31 PHOTOS DE STORY",
          "5 SHORTS / REELS (15 SEC)",
          "5 VIDÉOS VERTICALES SCÉNARISÉES",
        ],
        ctaText: "Choisir l'offre Maîtrise",
        highlight: true,
      },
    ] as OfferItem[],
  },

  faq: {
    surtitle: "QUESTIONS FRÉQUENTES",
    title: "TOUT SAVOIR SUR VOTRE CRÉATION DE CONTENU À VILLEFRANCHE & LYON.",
    items: [
      {
        question: "Dans quelle zone géographique vous déplacez-vous pour les tournages ?",
        answer:
          "Nous sommes basés à Villefranche-sur-Saône (69400) et nous nous déplaçons directement dans votre établissement sur tout le secteur caladois, le Beaujolais, la métropole de Lyon, le Rhône et l'Ain limitrophe.",
      },
      {
        question: "Combien de temps dure le tournage dans mon entreprise ?",
        answer:
          "Tout est concentré sur une demi-journée (2h à 4h selon l'offre choisie). Nous préparons les plans et les scénarios en amont pour ne jamais perturber votre activité ou votre service.",
      },
      {
        question:
          "Quelle est la différence entre un Short/Reel (15 sec) et une vidéo verticale scénarisée ?",
        answer:
          "Le Short/Reel de 15 secondes capte l'attention rapidement sur votre savoir-faire, vos produits ou l'ambiance de votre établissement. La vidéo verticale scénarisée (incluse dans l'offre Maîtrise) raconte une véritable histoire avec prise de parole, mise en scène ou humour pour générer un maximum de partages et de mémorisation.",
      },
      {
        question: "Sur quels réseaux sociaux puis-je utiliser les contenus ?",
        answer:
          "Tous nos formats photos et vidéos (9:16 et 4:5) sont optimisés pour Facebook, Instagram, TikTok et LinkedIn, ainsi que YouTube Shorts et votre fiche Google.",
      },
      {
        question:
          "Je ne suis pas à l'aise devant la caméra, comment ça se passe ?",
        answer:
          "C'est notre métier ! Nous vous dirigeons pas à pas avec bienveillance. Et si vous ne souhaitez pas parler face caméra, nous valorisons vos gestes, vos produits et votre équipe avec un montage dynamique.",
      },
      {
        question: "Comment réserver mon premier mois de contenu ?",
        answer:
          "Sélectionnez l'offre qui est faite pour vous ci-dessous ou appelez-nous directement au 06.14.30.88.01. Nous fixons ensemble la date du tournage et lançons la préparation stratégique.",
      },
    ] as FaqItem[],
  },

  footer: {
    headline: "CHOISISSEZ L'OFFRE QUI EST FAITE POUR VOUS",
    subHeadline: "CONTACTEZ NOUS ↓",
    phone: "06.14.30.88.01",
    email: "contact@alsek.fr",
    domain: "WWW.ALSEK.FR",
    packOptions: [
      { value: "essentiel", label: "Offre Essentiel" },
      { value: "evolution", label: "Offre Évolution (Populaire)" },
      { value: "maitrise", label: "Offre Maîtrise (Impact Maximum)" },
      { value: "sur-mesure", label: "Projet sur-mesure" },
    ],
  },

  contactForm: {
    title: "Demander un devis / Réserver mon tournage",
    intro:
      "Sélectionnez la formule qui correspond à vos objectifs : nous vous rappelons rapidement avec une proposition adaptée.",
    quickCallLabel: "Pressé ? Appeler directement le 06.14.30.88.01",
    fields: {
      name: { label: "Nom & Entreprise", placeholder: "Ex : Julie — Boulangerie du Centre" },
      phone: { label: "Téléphone", placeholder: "06 00 00 00 00" },
      email: { label: "E-mail (optionnel)", placeholder: "vous@entreprise.fr" },
      offer: { label: "Formule souhaitée" },
      message: {
        label: "Votre message (optionnel)",
        placeholder: "Ex : secteur d'activité, créneau souhaité pour être rappelé…",
      },
    },
    submit: "Recevoir mon devis & réserver",
    submitting: "Envoi en cours…",
    successTitle: "Demande bien reçue !",
    successText:
      "Merci, nous revenons vers vous très rapidement pour fixer ensemble la date de votre tournage.",
    successReset: "Envoyer une autre demande",
    genericError:
      "L'envoi a échoué. Réessayez dans un instant ou appelez-nous directement au 06.14.30.88.01.",
    privacy:
      "Vos informations sont uniquement utilisées pour répondre à votre demande.",
  },
} as const;
