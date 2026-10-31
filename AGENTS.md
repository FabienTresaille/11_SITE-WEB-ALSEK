# AGENTS.md — Règles Systèmes & Directives IA (Google Antigravity)

Ce fichier définit les règles strictes que tous les modèles IA (Gemini 4 Argon, Claude Opus 5.5, Claude Sonnet 5.5) doivent respecter à chaque génération ou modification de code sur le projet **alsek**.

---

## 1. Identité de Marque (Règle Absolue)
- **Nom de la marque :** Toujours écrire `alsek` en **minuscules**.
- **Typographie du logo :** Police géométrique **Poppins** (Bold / ExtraBold, tracking serré).
- **Aucun emblème / icône :** Le logo `alsek` est **strictement typographique**. Ne jamais générer de pictogramme, d'icône abstrait ou de symbole à côté du texte `alsek`.
- **Sous-titre officiel :** `MARKETING DIGITAL` en majuscules, police Poppins Regular/Medium, espacement des lettres large (`tracking-[0.25em]`), placé sous `alsek`.

---

## 2. Stack Technique Imposée
- **Framework :** Next.js 15+ (App Router uniquement, dossier `src/app/`).
- **Langage :** TypeScript strict (`strict: true`, aucun type `any`).
- **Styling :** Tailwind CSS + variables CSS personnalisées pour la palette de marque.
- **Animations & Scroll :**
  - `lenis` (`@studio-freight/lenis` ou `lenis/react`) pour le smooth scrolling global (inertie fluide type Buzzman).
  - `gsap` + `@gsap/react` (ScrollTrigger) pour les sections épinglées et la typographie cinétique.
  - `framer-motion` pour les micro-interactions UI, les cartes d'offres et les modales vidéo.
- **Icônes :** `lucide-react` + SVGs officiels pour Facebook, Instagram, TikTok et LinkedIn.
- **Déploiement local & Production :** Mode `output: 'standalone'` activé dans `next.config.ts` pour la conteneurisation Docker légère.

---

## 3. Palette de Couleurs & Design System
- **Fond Principal (Dark Navy) :** `#0B0F29` (`bg-[#0B0F29]`)
- **Bleu Électrique (Cartes Prix & CTA Primaires) :** `#1E3AFF` (`bg-[#1E3AFF]`)
- **Vert Néon Viral (Hooks Visuels & Surlignage) :** `#00E676` (`text-[#00E676]`)
- **Surface Claire (Cartes d'Offres) :** `#F4F5F8` (`bg-[#F4F5F8]` avec texte `#0B0F29`)
- **Accents Sociaux :** Rouge Corail (`#FF3B5C`) pour les badges "Cœur" et Bleu Clair (`#00A3FF`) pour les badges "Pouce".

---

## 4. Règles de Performance & Médias (Style Coudac)
- **Zéro iframe externe au chargement :** Ne jamais intégrer d'embeds natifs Instagram ou TikTok qui bloquent le thread principal.
- **Lecteur Vidéo 9:16 Natif :** Utiliser la balise HTML5 `<video>` avec `playsInline`, `muted`, `loop`, `preload="metadata"`.
- **Comportement d'interaction :**
  - Lecture automatique muette au survol (desktop) ou à l'entrée dans le viewport (mobile via `IntersectionObserver`).
  - Activation du son et remise à zéro (`currentTime = 0`) au clic de l'utilisateur avec affichage d'un badge sonore animé.
- **Accessibilité & SEO :** Balises sémantiques (`header`, `main`, `section`, `footer`), attributs `aria-label` sur tous les boutons interactifs, métadonnées OpenGraph complètes.

---

## 5. Conventions de Code
- Composants modulaires découpés dans `src/components/sections/` et `src/components/ui/`.
- Toutes les données textuelles (offres, tarifs, FAQ, réalisations) doivent être centralisées dans `src/data/content.ts` pour faciliter la maintenance sans toucher au JSX.
- Toujours vérifier que le build (`npm run build`) passe sans erreur TypeScript ni avertissement ESLint avant de valider une étape.
