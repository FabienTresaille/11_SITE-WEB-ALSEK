# PROMPTS_WORKFLOW.md — Plan d'Exécution Pas-à-Pas dans Google Antigravity

Suivez cet ordre précis dans **Google Antigravity** pour développer, tester, intégrer l'envoi d'e-mails et conteneuriser le site avant l'envoi sur votre VPS OVH via GitHub Desktop.

---

## Rappels Techniques d'Infrastructure
- **Réseau Public Traefik :** `edge-public-net` (réseau bridge externe).
- **Middleware Sécurité :** `sec-headers@file`.
- **CertResolver :** `letsencrypt`.
- **Domaines :** `alsek.fr` et `www.alsek.fr`.
- **E-mail Transactionnel :** SMTP OVH officiel (`ssl0.ovh.net`, port 465, SSL direct).

---

## Étape 0 : Préparation Locale (2 minutes)
1. Ouvrez le dossier `alsek-site` dans **Google Antigravity**.
2. Assurez-vous de la présence de `AGENTS.md`, `SPEC.md`, `COPYWRITING.md` et `affiche-offres.png`.

---

## Étape 1 : Initialisation & Socle (Modèle : Gemini 4 Argon)
*Rôle d'Argon 4 :* Mise en place Next.js 15, typographie Poppins, palette `#0B0F29`, `#1E3AFF`, `#00E676`, `#F4F5F8` et centralisation des données dans `src/data/content.ts`.

---

## Étape 2 : Direction Artistique "Buzzman × Coudac" (Modèle : Claude Opus 5.5 ou Sonnet 5.5)
*Rôle de Claude :* Animations GSAP ScrollTrigger, Lenis smooth scroll, lecteurs vidéo verticaux 9:16 interactifs et grille des 3 offres bi-bloc.

---

## Étape 3 : Médias Réels & Hooks Vidéo (Modèle : Gemini 4 Argon)
*Rôle d'Argon 4 :* Visionnage des `.mp4` déposés dans `public/videos/` et mise à jour des hooks.

---

## Étape 4 : Formulaire Contact SMTP OVH & Conteneurisation Docker (Modèle : Gemini 4 Argon)
*Rôle d'Argon 4 :* Câblage de l'API Nodemailer avec honeypot anti-spam, liaison bidirectionnelle entre la grille des prix et le formulaire, activation du mode `standalone`, et génération des fichiers Docker (`Dockerfile`, `docker-compose.local.yml`, `docker-compose.prod.yml`).

*(Voir le prompt d'exécution complet ci-dessous)*.