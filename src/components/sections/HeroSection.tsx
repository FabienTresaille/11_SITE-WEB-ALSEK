"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Play, Sparkles, Camera, Film } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";
import MagneticButton from "@/components/ui/MagneticButton";
import FloatingBadge, { type BadgeType } from "@/components/ui/FloatingBadge";

/* ------------------------------------------------------------------ */
/* Configuration des badges sociaux flottants (position + profondeur) */
/* ------------------------------------------------------------------ */
interface SocialBadgeConfig {
  type: BadgeType;
  className: string;
  /** Profondeur de parallaxe : plus la valeur est élevée, plus le badge bouge */
  depth: number;
  delay: number;
  rotate: number;
}

const SOCIAL_BADGES: SocialBadgeConfig[] = [
  { type: "facebook", className: "top-[22%] left-[6%] xl:left-[11%]", depth: 1.2, delay: 0, rotate: -12 },
  { type: "instagram", className: "bottom-[20%] left-[9%] xl:left-[14%]", depth: 0.7, delay: 0.8, rotate: 8 },
  { type: "tiktok", className: "top-[20%] right-[6%] xl:right-[11%]", depth: 0.9, delay: 0.4, rotate: 10 },
  { type: "linkedin", className: "bottom-[24%] right-[8%] xl:right-[13%]", depth: 1.4, delay: 1.2, rotate: -8 },
];

const SOCIAL_URL_BY_TYPE: Record<string, { href: string; label: string }> =
  Object.fromEntries(
    BRAND_CONTENT.identity.socialLinks.map((s) => [
      s.name.toLowerCase(),
      { href: s.href, label: `Suivre alsek sur ${s.name}` },
    ])
  );

function ParallaxBadge({
  config,
  mouseX,
  mouseY,
  scrollProgress,
  disabled,
}: {
  config: SocialBadgeConfig;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  disabled: boolean;
}) {
  const strength = disabled ? 0 : config.depth;
  const x = useTransform(mouseX, (v) => v * 46 * strength);
  const mouseOffsetY = useTransform(mouseY, (v) => v * 36 * strength);
  const scrollOffsetY = useTransform(scrollProgress, [0, 1], [0, -260 * strength]);
  const y = useTransform(
    [mouseOffsetY, scrollOffsetY] as MotionValue<number>[],
    ([m, s]: number[]) => m + s
  );
  const linkMeta = SOCIAL_URL_BY_TYPE[config.type];

  return (
    <motion.div
      style={{ x, y, rotate: config.rotate }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 + config.delay * 0.25, type: "spring", bounce: 0.45 }}
      className={`hidden md:block absolute z-20 ${config.className}`}
    >
      <FloatingBadge
        type={config.type}
        size="md"
        delay={config.delay}
        href={linkMeta?.href}
        label={linkMeta?.label}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Silhouette de trépied + softbox (éclairage studio en fond)         */
/* ------------------------------------------------------------------ */
function SoftboxSilhouette({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 520"
      className={`w-[150px] xl:w-[200px] h-auto ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`softbox-face-${flip ? "r" : "l"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* Boîte à lumière */}
      <g transform="rotate(-14 110 90)">
        <path d="M40 30 L180 30 L160 150 L60 150 Z" fill="#0B0F29" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <path d="M48 150 L172 150 L168 162 L52 162 Z" fill={`url(#softbox-face-${flip ? "r" : "l"})`} />
      </g>
      {/* Rotule */}
      <circle cx="112" cy="168" r="6" fill="rgba(255,255,255,0.25)" />
      {/* Mât */}
      <line x1="112" y1="170" x2="112" y2="400" stroke="rgba(255,255,255,0.22)" strokeWidth="4" />
      {/* Pieds du trépied */}
      <line x1="112" y1="400" x2="40" y2="515" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      <line x1="112" y1="400" x2="184" y2="515" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      <line x1="112" y1="400" x2="112" y2="515" stroke="rgba(255,255,255,0.14)" strokeWidth="3" />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [enableDesktopVideo, setEnableDesktopVideo] = useState(false);

  // Économie 4G sur mobile (< 768px) : on affiche uniquement le poster WebP léger (14 Ko)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableDesktopVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Position souris normalisée (-0.5 → 0.5) lissée par ressort
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  // Spotlight qui suit le curseur (en px)
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}px ${spotY}px, rgba(30,58,255,0.16), transparent 65%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lightsY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 180]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const titleWords = BRAND_CONTENT.hero.titleRest.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Présentation alsek"
      className="relative min-h-[90svh] flex items-center justify-center pt-24 pb-14 overflow-hidden bg-[#0B0F29] isolate"
    >
      {/* ---------- COUCHE 1 : vidéo backstage basse opacité (desktop) / poster WebP léger (mobile) ---------- */}
      {enableDesktopVideo ? (
        <video
          src={BRAND_CONTENT.hero.showreelSrc}
          poster={BRAND_CONTENT.hero.showreelPoster}
          autoPlay
          playsInline
          muted
          loop
          preload="metadata"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 w-full h-full object-cover opacity-[0.12] grayscale"
        />
      ) : (
        <Image
          src={BRAND_CONTENT.hero.showreelPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="pointer-events-none -z-20 object-cover opacity-[0.12] grayscale"
        />
      )}

      {/* ---------- COUCHE 2 : éclairage studio ---------- */}
      <motion.div style={{ y: lightsY }} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Key light principale (douche de lumière zénithale) qui « s'allume » */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.4, 1] }}
          transition={{ duration: 1.4, times: [0, 0.2, 0.35, 1], ease: "easeOut" }}
          className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[1100px] h-[900px]"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 50% 30%, rgba(255,255,255,0.10), rgba(30,58,255,0.10) 45%, transparent 75%)",
          }}
        />
        {/* Cônes de softbox gauche / droite */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="absolute top-[8%] left-[6%] w-[420px] h-[760px] origin-top-left rotate-[-28deg] blur-3xl"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(30,58,255,0.06) 40%, transparent 80%)" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="absolute top-[8%] right-[6%] w-[420px] h-[760px] origin-top-right rotate-[28deg] blur-3xl"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,230,118,0.05) 40%, transparent 80%)" }}
        />
        {/* Halos colorés d'ambiance (allégés sur GPU mobile) */}
        <div className="absolute top-[-10%] left-[18%] w-[320px] md:w-[480px] h-[320px] md:h-[480px] bg-[#1E3AFF]/25 rounded-full blur-3xl md:blur-[150px]" />
        <div className="absolute top-[35%] right-[10%] w-[260px] md:w-[380px] h-[260px] md:h-[380px] bg-[#00E676]/10 rounded-full blur-3xl md:blur-[150px]" />

        {/* Silhouettes trépieds + softbox */}
        <div className="hidden lg:block absolute bottom-0 left-[1%] opacity-40">
          <SoftboxSilhouette />
        </div>
        <div className="hidden lg:block absolute bottom-0 right-[1%] opacity-40">
          <SoftboxSilhouette flip />
        </div>
      </motion.div>

      {/* Spotlight interactif qui suit le curseur */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
      />

      {/* Grille de points + grain film (desktop uniquement pour fluidité GPU mobile) + fondu bas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-studio-grain [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="hidden md:block pointer-events-none absolute inset-0 z-[1] film-grain opacity-[0.07]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-[1] bg-gradient-to-t from-[#0B0F29] to-transparent" />

      {/* ---------- COUCHE 3 : badges sociaux en parallaxe ---------- */}
      {SOCIAL_BADGES.map((config) => (
        <ParallaxBadge
          key={config.type}
          config={config}
          mouseX={mouseX}
          mouseY={mouseY}
          scrollProgress={scrollYProgress}
          disabled={prefersReducedMotion}
        />
      ))}

      {/* ---------- COUCHE 4 : contenu visible dès le 1er paquet HTML (zéro écran vide avant hydratation JS) ---------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge supérieur avec indicateur « REC » */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF3B5C] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3B5C]" />
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/90">
            {BRAND_CONTENT.hero.topBadge}
          </span>
        </div>

        {/* H1 immédiatement lisible dès le SSR */}
        <h1 className="font-extrabold uppercase tracking-tight leading-[1.06] text-white">
          {/* Phrase clé en vert néon, sur sa propre ligne */}
          <span className="relative block text-3xl sm:text-5xl md:text-[3.35rem] lg:text-[3.85rem]">
            <span className="block pb-1.5">
              <span className="inline-block neon-text">
                {BRAND_CONTENT.hero.titleHighlight}
              </span>
            </span>
            {/* Trait néon dessiné sous la phrase clé */}
            <svg
              viewBox="0 0 600 24"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 sm:-bottom-1 w-[68%] h-2.5 sm:h-3.5"
            >
              <motion.path
                d="M4 16 C 120 4, 260 22, 380 10 S 560 8, 596 14"
                fill="none"
                stroke="#00E676"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0.25, opacity: 0.85 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 6px rgba(0,230,118,0.75))" }}
              />
            </svg>
          </span>

          {/* Reste du titre */}
          <span className="mt-3 sm:mt-4 block text-lg sm:text-2xl md:text-[1.7rem] lg:text-[2rem] leading-[1.18]">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block align-bottom">
                {word}
                {i < titleWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </span>
        </h1>

        {/* Sous-titre (affiché instantanément dès le HTML SSR) */}
        <p className="mt-5 max-w-xl mx-auto text-sm sm:text-[15px] text-white/85 leading-relaxed">
          {BRAND_CONTENT.hero.subtitle}
        </p>

        {/* CTA */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <MagneticButton href="#offres" variant="primary" ariaLabel={BRAND_CONTENT.hero.primaryCta}>
            <span>{BRAND_CONTENT.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton href="#realisations" variant="outline" ariaLabel={BRAND_CONTENT.hero.secondaryCta}>
            <Play className="w-3.5 h-3.5 text-[#00E676] fill-[#00E676]" />
            <span>{BRAND_CONTENT.hero.secondaryCta}</span>
          </MagneticButton>
        </div>

        {/* Icônes réseaux cliquables (mobile uniquement, les badges flottants étant masqués) */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-2.5">
          {SOCIAL_BADGES.map((b) => {
            const linkMeta = SOCIAL_URL_BY_TYPE[b.type];
            return (
              <FloatingBadge
                key={b.type}
                type={b.type}
                size="sm"
                delay={b.delay}
                href={linkMeta?.href}
                label={linkMeta?.label}
              />
            );
          })}
        </div>

        {/* Métriques */}
        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {BRAND_CONTENT.hero.metrics.map((metric, idx) => {
            const Icon = idx === 0 ? Sparkles : idx === 1 ? Camera : Film;
            return (
              <div
                key={metric.value}
                className="flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/12 backdrop-blur-sm hover:border-[#00E676]/40 transition-colors"
              >
                <Icon className={`w-4 h-4 shrink-0 ${idx === 1 ? "text-[#1E3AFF]" : "text-[#00E676]"}`} />
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-white">{metric.value}</div>
                  <div className="text-[11px] text-white/75">{metric.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
