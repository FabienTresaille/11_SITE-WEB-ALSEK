# DOCKER_DEPLOY_ALSEK.md — Guide de Conteneurisation & Déploiement

Ce document regroupe les fichiers de conteneurisation intégrant la gestion sécurisée des variables SMTP OVH et la procédure de déploiement via GitHub Desktop.

---

## 1. Fichiers de Configuration Docker

### A. `.env.example` (À commiter sur GitHub)
```env
# Port d'écoute
PORT=3000
NODE_ENV=production

# SMTP OVHcloud (contact@alsek.fr)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@alsek.fr
SMTP_PASS=RemplacerParLeMotDePasseBoiteMailOVH
CONTACT_RECEIVER=contact@alsek.fr
```

### B. `.dockerignore`
```text
node_modules
.next
.git
.gitignore
.env
.env.local
.env*.local
Dockerfile*
docker-compose*
README*
*.md
```

### C. `Dockerfile` (Multi-stage Node 22 Alpine)
```dockerfile
# 1. Dépendances
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3. Production Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

### D. `docker-compose.local.yml` (Test local PC)
```yaml
services:
  alsek-dev:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app-alsek-local
    restart: unless-stopped
    ports:
      - "3000:3000"
    env_file:
      - .env.local
```

### E. `docker-compose.prod.yml` (Production VPS derrière Traefik)
```yaml
services:
  alsek-web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app-alsek-prod
    restart: unless-stopped
    env_file:
      - .env
    networks:
      - edge-public-net
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.alsek.rule=Host(`alsek.fr`) || Host(`www.alsek.fr`)"
      - "traefik.http.routers.alsek.entrypoints=websecure"
      - "traefik.http.routers.alsek.tls.certresolver=letsencrypt"
      - "traefik.http.routers.alsek.middlewares=sec-headers@file"
      - "traefik.http.services.alsek.loadbalancer.server.port=3000"

networks:
  edge-public-net:
    external: true
```

---

## 2. Procédure de Déploiement

### Étape 1 : Tester en local sur votre PC
```bash
# Lancer le build et tester
docker compose -f docker-compose.local.yml up --build -d
# Tester l'envoi du formulaire sur http://localhost:3000
# Stopper le test
docker compose -f docker-compose.local.yml down
```

### Étape 2 : Pousser via GitHub Desktop
1. Ouvrez **GitHub Desktop**.
2. Validez les fichiers (`feat: contact form smtp ovh and traefik containerization`).
3. Cliquez sur **Push origin**.

### Étape 3 : Démarrer sur le VPS (SSH)
```bash
cd /opt/docker/apps/alsek-web

# Créer le fichier .env de prod avec le mot de passe réel
cp .env.example .env
nano .env

# Déployer avec Traefik
docker compose -f docker-compose.prod.yml up -d --build
```