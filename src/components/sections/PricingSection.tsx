"use client";

import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, ArrowRight, Sparkles, CheckCircle2, Flame, Crown } from "lucide-react";
import { useLenis } from "lenis/react";
import { BRAND_CONTENT, type OfferItem } from "@/data/content";
import FloatingBadge from "@/components/ui/FloatingBadge";

interface PricingSectionProps {
  selectedOffer: string;
  onSelectOffer: (offerId: string) => void;
}

/* ------------------------------------------------------------------ */
/* Ligne d'offre bi-bloc : carte claire #F4F5F8 + bloc action #1E3AFF   */
/* ------------------------------------------------------------------ */
function OfferRow({
  offer,
  index,
  isSelected,
  onChoose,
}: {
  offer: OfferItem;
  index: number;
  isSelected: boolean;
  onChoose: (offer: OfferItem) => void;
}) {
  const reduce = useReducedMotion() ?? false;

  // Inclinaison 3D subtile au survol
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], reduce ? [0, 0] : [2, -2]),
    { stiffness: 200, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], reduce ? [0, 0] : [-2, 2]),
    { stiffness: 200, damping: 22 }
  );

  // Reflet lumineux qui suit le curseur sur le bloc bleu
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shine = useMotionTemplate`radial-gradient(220px circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.24), transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };
  const handleShine = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    shineX.set(((e.clientX - r.left) / r.width) * 100);
    shineY.set(((e.clientY - r.top) / r.height) * 100);
  };

  const featured = offer.popular || offer.highlight;
  const BadgeIcon = offer.popular ? Flame : Crown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex flex-col lg:flex-row lg:items-stretch rounded-3xl"
      >
        {/* Badge mise en avant (Évolution / Maîtrise) */}
        {offer.badge && (
          <motion.span
            initial={{ opacity: 0, y: 8, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.08, type: "spring", bounce: 0.45 }}
            className={`absolute -top-3.5 left-5 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-[0.14em] shadow-md ${
              offer.popular
                ? "bg-[#00E676] text-[#0B0F29] shadow-[0_6px_18px_rgba(0,230,118,0.4)]"
                : "bg-[#0B0F29] text-[#00E676] border border-[#00E676]/60"
            }`}
          >
            <BadgeIcon className="w-3 h-3" />
            {offer.badge}
          </motion.span>
        )}

        {/* Pastille « Offre sélectionnée » */}
        {isSelected && (
          <motion.span
            layoutId="offer-selected-tag"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="absolute -top-3.5 right-5 lg:right-[245px] z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0B0F29] text-[10px] font-extrabold uppercase tracking-wider shadow-md"
          >
            <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
            Offre sélectionnée
          </motion.span>
        )}

        {/* ---------- BLOC GAUCHE : carte descriptive claire ---------- */}
        <div
          className={`relative flex-1 rounded-3xl bg-[#F4F5F8] text-[#0B0F29] p-5 sm:p-7 lg:pr-14 transition-shadow duration-300 ${
            isSelected
              ? "ring-[3px] ring-[#00E676]"
              : featured
              ? "ring-2 ring-[#1E3AFF]/35"
              : "ring-1 ring-black/5"
          } shadow-[0_20px_45px_-20px_rgba(0,0,0,0.55)]`}
        >
          <div className="flex items-baseline gap-2.5 flex-wrap mb-1.5">
            <span className="text-[11px] font-extrabold text-[#1E3AFF] tracking-widest">
              0{index + 1}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-extrabold uppercase tracking-tight leading-none">
              {offer.name}&nbsp;:
            </h3>
          </div>

          <p className="text-xs sm:text-sm font-medium text-[#0B0F29]/65 mb-4 max-w-xl">
            {offer.idealFor}
          </p>

          {/* Liste en capitales structurées */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
            {offer.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-[#1E3AFF] text-white flex items-center justify-center shrink-0 shadow-[0_3px_10px_rgba(30,58,255,0.35)]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wide">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ---------- BLOC DROIT : bloc d'action bleu électrique (sans tarif) ---------- */}
        <div
          onMouseMove={handleShine}
          className="relative -mt-4 mx-3 lg:mx-0 lg:mt-0 lg:-ml-8 lg:w-[255px] shrink-0 z-10 rounded-3xl bg-[#1E3AFF] text-white p-5 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_20px_50px_-15px_rgba(30,58,255,0.65)] lg:rotate-[-1.5deg] lg:group-hover:rotate-0 transition-transform duration-500"
        >
          {/* Reflet dynamique */}
          <motion.div
            aria-hidden="true"
            style={{ background: shine }}
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-10 w-32 h-32 rounded-full border-[14px] border-white/10" />

          <span className="relative text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/75">
            1 mois de contenu
          </span>

          <div className="relative my-2">
            <div className="text-base sm:text-lg font-extrabold uppercase tracking-tight leading-snug text-white">
              {offer.volumeHighlight}
            </div>
            <div className="mt-0.5 text-[11px] font-bold text-[#00E676]">
              {offer.volumeSublabel}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChoose(offer)}
            aria-pressed={isSelected}
            aria-label={`${offer.ctaText} (${offer.name})`}
            className="relative mt-2.5 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0B0F29] hover:bg-[#00E676] text-white hover:text-[#0B0F29] font-extrabold uppercase tracking-wider px-4 py-2.5 text-[11px] transition-colors duration-300 shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676]"
          >
            {offer.ctaText}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <span className="relative mt-2 text-[10px] font-semibold text-white/80">
            Devis sous 24h • Sans engagement
          </span>
        </div>

        {/* Pastille cœur sur le bord droit (Essentiel / Évolution) */}
        {offer.reactionBadge === "heart" && (
          <div className="hidden sm:block absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20">
            <FloatingBadge type="heart" size="md" delay={index * 0.5} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PricingSection({ selectedOffer, onSelectOffer }: PricingSectionProps) {
  const lenis = useLenis();
  const offers = BRAND_CONTENT.pricing.offers;

  const handleChoose = (offer: OfferItem) => {
    // State partagé (page.tsx) → pré-sélection immédiate dans le menu déroulant du formulaire
    onSelectOffer(offer.id);
    // Ancre partageable (#offre-xxx) sans déclencher de saut de page
    window.history.replaceState(null, "", `#offre-${offer.id}`);
    window.setTimeout(() => {
      if (lenis) lenis.scrollTo("#contact-form", { offset: -90, duration: 1.3 });
      else document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <section id="offres" className="relative py-16 md:py-20 bg-[#0B0F29] border-t border-white/10 overflow-hidden">
      {/* Ambiance */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -left-40 w-[420px] h-[420px] bg-[#1E3AFF]/20 blur-[150px] rounded-full" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-10 -right-40 w-[420px] h-[420px] bg-[#00E676]/10 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête équilibré */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1E3AFF]/20 border border-[#1E3AFF]/50 text-[#00E676] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] mb-4"
          >
            <Sparkles className="w-3 h-3" />
            {BRAND_CONTENT.pricing.topBadge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.02]"
          >
            {BRAND_CONTENT.pricing.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-3.5 text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-tight text-white/90"
          >
            <span className="neon-text">{BRAND_CONTENT.hero.titleHighlight}</span>{" "}
            {BRAND_CONTENT.pricing.subtitle.replace(BRAND_CONTENT.hero.titleHighlight, "").trim()}
          </motion.p>

          <p className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-semibold text-white/85">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
            {BRAND_CONTENT.pricing.reassuranceBadge}
          </p>
        </div>

        {/* Pile des 3 offres */}
        <div className="space-y-8 lg:space-y-9">
          {offers.map((offer, index) => (
            <React.Fragment key={offer.id}>
              <OfferRow
                offer={offer}
                index={index}
                isSelected={selectedOffer === offer.id}
                onChoose={handleChoose}
              />

              {/* Pastille pouce entre Évolution et Maîtrise */}
              {offer.id === "evolution" && (
                <div aria-hidden="true" className="relative h-0">
                  <div className="absolute left-1/2 lg:left-[58%] -translate-x-1/2 -top-7 lg:-top-8 z-30">
                    <FloatingBadge type="thumb" size="md" delay={0.3} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Transition vers le contact */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#00E676] hover:text-white transition-colors"
          >
            Cliquez sur une formule pour recevoir votre devis personnalisé
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              ↓
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}
