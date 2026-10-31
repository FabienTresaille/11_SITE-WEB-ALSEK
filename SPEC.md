# SPEC.md — Cahier des Charges Technique & Expérience Utilisateur

## 1. Vision du Projet
Créer le site vitrine et tunnel de conversion de l'agence **alsek** (`www.alsek.fr`).
Le site fusionne deux références majeures :
1. **Buzzman.eu :** Direction artistique audacieuse, mode sombre profond, typographie cinétique plein écran, transitions franches et accroches ("hooks") qui stoppent le scroll.
2. **Coudac.com :** Approche orientée performance et viralité courte durée (Shorts / Reels / TikTok), grille Bento de vidéos verticales 9:16 ultra-fluide, preuves sociales immédiates et clarté des offres B2B.

---

## 2. Architecture du Projet (Next.js 15 App Router)

```text
alsek-site/
├── public/
│   ├── videos/
│   │   ├── hero-showreel.mp4       # Boucle vidéo backstage (5-10s, muet)
│   │   ├── reel-1.mp4              # Réalisation client 9:16 #1
│   │   ├── reel-2.mp4              # Réalisation client 9:16 #2
│   │   ├── reel-3.mp4              # Réalisation client 9:16 #3
│   │   ├── reel-4.mp4              # Réalisation client 9:16 #4
│   │   └── reel-5.mp4              # Vidéo verticale scénarisée #5
│   ├── photos/                     # Exemples de photos de publications & stories
│   └── logos/                      # Logos clients en blanc monochrome (.svg/.png)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Chargement police Poppins, Lenis Smooth Scroll, SEO
│   │   ├── page.tsx                # Assemblage des sections
│   │   └── globals.css             # Variables Tailwind, styles custom, grain subtil
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Header flottant glassmorphism ("alsek" + CTA rapide)
│   │   │   └── Footer.tsx          # Footer de conversion + coordonnées directes
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Hook d'entrée + Showreel + Promesse 30 jours
│   │   │   ├──LogoMarquee.tsx      # Bandeau défilant infini des clients
│   │   │   ├── VideoWallSection.tsx# Grille 9:16 interactive style Coudac
│   │   │   ├── ProcessSection.tsx  # Méthode en 3 étapes animées au scroll (GSAP)
│   │   │   ├── PricingSection.tsx  # Les 3 offres (Essentiel, Évolution, Maîtrise)
│   │   │   └── FaqSection.tsx      # Accordéon levant les objections B2B
│   │   └── ui/
│   │       ├── VideoCard916.tsx    # Composant lecteur smartphone 9:16 interactif
│   │       ├── MagneticButton.tsx  # Bouton CTA avec effet magnétique au curseur
│   │       └── FloatingBadge.tsx   # Pastilles 3D/2D (Coeur, Pouce, Icônes réseaux)
│   └── data/
│       └── content.ts              # Textes, tarifs, réalisations et FAQ typés
├── Dockerfile                      # Multi-stage build Node 22 Alpine
└── docker-compose.yml              # Configuration locale + labels Traefik prêts
```

---

## 3. Détail des Sections & Hooks Visuels

### Section 1 : Navbar Flottante (`Navbar.tsx`)
- **Design :** Barre fixe en haut avec `backdrop-blur-md bg-[#0B0F29]/80`, bordure subtile `border-white/10`.
- **Gauche :** Marque `alsek` en minuscules (Poppins Bold) + sous-titre `MARKETING DIGITAL`.
- **Centre :** Liens d'ancrage fluides (`Réalisations`, `La Méthode`, `Nos 3 Offres`, `FAQ`).
- **Droite :** Bouton CTA `06.14.30.88.01` / `Réserver mon mois`.

### Section 2 : Hero Section (`HeroSection.tsx`)
- **Hook Visuel :** Arrière-plan immersif (éclairage studio sombre avec trépieds/softbox en silhouette et vidéo backstage en surimpression basse opacité) + badges réseaux sociaux flottants en légère parallaxe (Facebook, Instagram, TikTok, LinkedIn).
- **Typographie :** Titre massif en Poppins ExtraBold, avec la phrase clé **"1 MOIS DE CONTENU"** surlignée en vert néon `#00E676`.
- **Actions :**
  - CTA Primaire (`#1E3AFF`) : *"Choisir mon offre →"* (scroll vers Pricing).
  - CTA Secondaire (contour blanc) : *"Voir nos vidéos (9:16)"* (scroll vers VideoWall).

### Section 3 : Le Mur de Viralité 9:16 (`VideoWallSection.tsx`)
- **Hook Visuel :** Grille de 4 à 5 châssis de smartphones verticaux (ratio `aspect-[9/16]`), coins arrondis `rounded-3xl`, bordure lumineuse au survol.
- **Fonctionnalités :**
  - Filtres rapides par format : `Tous`, `Shorts / Reels (15 sec)`, `Vidéos Scénarisées`, `Photos & Stories`.
  - Chaque carte affiche un badge client, le type de format et un bouton son (`Mute / Unmute`).
- **Bandeau Clients (`LogoMarquee.tsx`) :** Défilement horizontal infini des logos des commerçants et entreprises accompagnés.

### Section 4 : La Mécanique en 3 Étapes (`ProcessSection.tsx`)
- **Hook Visuel :** Barre de progression verticale lumineuse qui se remplit au scroll (GSAP ScrollTrigger).
- **Étapes :**
  1. **Conseils Stratégiques & Scénarisation :** Définition des angles viraux et des scripts adaptés à votre cible locale ou nationale.
  2. **1 Seul Tournage Concentré :** Nous venons avec notre studio mobile (caméras cinéma, éclairage studio, micros) sans bloquer votre activité.
  3. **30 Jours de Présence Quotidienne :** Livraison de vos photos, stories, Reels et vidéos scénarisées prêts à capter l'attention chaque jour.

### Section 5 : Grille des 3 Offres (`PricingSection.tsx`)
- **Fidélité visuelle à l'affiche officielle :**
  - Reproduction moderne et interactive du layout bi-bloc : à gauche la carte blanche (`#F4F5F8`) détaillant le contenu en capitales structurées, à droite ou en bloc accolé le pavé prix bleu électrique (`#1E3AFF`) avec le tarif en grand.
  - Pastilles de réactions flottantes (Cœur rouge corail sur le bord droit d'Essentiel/Évolution, Pouce bleu entre Évolution et Maîtrise).
  - Mise en avant de l'offre **ÉVOLUTION (300€ TTC*)** et **MAÎTRISE (500€ TTC*)**.
  - Mention légale obligatoire sous la grille : `*TVA NON RÉCUPÉRABLE`.
  - Au clic sur une offre, pré-sélection automatique de l'offre dans le bloc de contact juste en dessous.

### Section 6 : Conversion Directe & FAQ (`FaqSection.tsx` + `Footer.tsx`)
- **Hook Visuel :** Flèche directionnelle animée pointant vers le bloc de contact direct, fidèle au bas de l'affiche (`CHOISISSEZ L'OFFRE QUI EST FAITE POUR VOUS` -> `CONTACTEZ NOUS ↓`).
- **Formulaire Express + Contact Direct :**
  - Sélecteur de pack (`Essentiel - 160€`, `Évolution - 300€`, `Maîtrise - 500€`, `Projet sur-mesure`).
  - Bouton d'appel direct en 1 clic sur mobile (`tel:0614308801`) et e-mail (`mailto:contact@alsek.fr`).
