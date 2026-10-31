# alsek — MARKETING DIGITAL (`www.alsek.fr`)

Site vitrine et tunnel d'acquisition de l'agence **alsek** (Next.js 15 App Router, TypeScript strict, Tailwind CSS, Lenis, GSAP ScrollTrigger, Framer Motion, Nodemailer SMTP OVH).

---

## 1. Démarrage en développement local

```bash
npm install
npm run dev
```

Application accessible sur `http://localhost:3000`.

### Variables d'environnement SMTP OVH (`.env.local`)

Copier `.env.example` vers `.env.local` et renseigner le mot de passe de la boîte OVH `contact@alsek.fr` :

```env
PORT=3000
NODE_ENV=development

SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@alsek.fr
SMTP_PASS=VotreMotDePasseOVH
CONTACT_RECEIVER=contact@alsek.fr
```

---

## 2. Architecture du projet

- `src/data/content.ts` — Source unique des textes, offres, FAQ et références médias.
- `src/components/layout/` — `Navbar`, `Footer`, `SmoothScrollProvider` (Lenis + GSAP).
- `src/components/sections/` — `HeroSection`, `LogoMarquee`, `VideoWallSection`, `ProcessSection`, `PricingSection`, `FaqSection`.
- `src/components/ui/` — `VideoCard916` (lecteur 9:16 natif HTML5), `ContactForm` (connecté à `/api/contact` + présélection d'offre), `FloatingBadge`, `MagneticButton`, `SocialIcons`.
- `src/app/api/contact/route.ts` — Route API `POST` sécurisée (anti-spam honeypot + validation + envoi SMTP OVH SSL 465).
- `public/videos/` & `public/photos/` — Médias clients optimisés servis en statique (et embarqués dans l'image Docker).

---

## 3. Déploiement Docker & Traefik v3 (VPS OVH)

### Test du conteneur en local

```bash
docker compose -f docker-compose.local.yml up --build -d
# → http://localhost:3000
docker compose -f docker-compose.local.yml down
```

### Mise en production sur le VPS (via GitHub Desktop + SSH)

1. Publier / pousser le dépôt via **GitHub Desktop** (le dossier brut `/Ressource/` et les fichiers `.env*` sensibles sont automatiquement ignorés par `.gitignore`).
2. Sur le VPS OVH :

```bash
cd /opt/docker/apps/alsek-web
git pull

# Créer le fichier .env de production (première installation uniquement)
cp .env.example .env
nano .env

# Construire et démarrer derrière Traefik v3 (réseau edge-public-net)
docker compose -f docker-compose.prod.yml up -d --build
```
