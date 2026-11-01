"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, MousePointerClick, Volume2, X } from "lucide-react";
import { BRAND_CONTENT, type VideoShowcaseItem } from "@/data/content";
import VideoCard916 from "@/components/ui/VideoCard916";

type FilterId = (typeof BRAND_CONTENT.videoWall.filters)[number]["id"];

const MOBILE_INITIAL_COUNT = 6;

export default function VideoWallSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [soundOwnerId, setSoundOwnerId] = useState<string | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<VideoShowcaseItem | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileViewport(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!lightboxPhoto) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxPhoto]);

  const items = BRAND_CONTENT.videoWall.items;

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    items.forEach((it) => {
      map[it.category] = (map[it.category] ?? 0) + 1;
    });
    return map;
  }, [items]);

  const filteredItems = useMemo(
    () => (activeFilter === "all" ? items : items.filter((it) => it.category === activeFilter)),
    [activeFilter, items]
  );

  const shouldTruncateMobile =
    isMobileViewport &&
    !expandedMobile &&
    filteredItems.length > MOBILE_INITIAL_COUNT;

  const visibleItems = useMemo(
    () =>
      shouldTruncateMobile
        ? filteredItems.slice(0, MOBILE_INITIAL_COUNT)
        : filteredItems,
    [filteredItems, shouldTruncateMobile]
  );

  const handleFilter = (id: FilterId) => {
    setActiveFilter(id);
    setSoundOwnerId(null);
  };

  const handleSoundChange = useCallback((id: string | null) => {
    setSoundOwnerId(id);
  }, []);

  return (
    <section id="realisations" className="relative py-16 md:py-20 bg-[#0B0F29] overflow-hidden">
      {/* Ambiance */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 left-1/2 -translate-x-1/2 w-[360px] md:w-[750px] h-[260px] md:h-[420px] bg-[#1E3AFF]/15 blur-3xl md:blur-[150px] rounded-full"
      />

      <div className="relative max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="max-w-2xl mx-auto text-center mb-9">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00E676] mb-2.5"
          >
            {BRAND_CONTENT.videoWall.surtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-[1.08]"
          >
            {BRAND_CONTENT.videoWall.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mt-3.5 text-sm sm:text-[15px] text-white/80"
          >
            {BRAND_CONTENT.videoWall.subtitle}
          </motion.p>
        </div>

        {/* Filtres */}
        <div className="flex justify-center mb-5">
          <div
            role="tablist"
            aria-label="Filtrer les réalisations par format"
            className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-2xl sm:rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm"
          >
            {BRAND_CONTENT.videoWall.filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = counts[filter.id] ?? 0;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${filter.label} (${count})`}
                  onClick={() => handleFilter(filter.id)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive ? "text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="videowall-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#1E3AFF] shadow-[0_0_20px_rgba(30,58,255,0.55)]"
                    />
                  )}
                  <span className="relative inline-flex items-center gap-1.5">
                    {filter.label}
                    <span
                      className={`min-w-4 h-4 px-1 rounded-full text-[10px] flex items-center justify-center ${
                        isActive ? "bg-[#00E676] text-[#0B0F29]" : "bg-white/15 text-white/85"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aide à l'interaction (contraste WCAG AA renforcé) */}
        <p className="flex items-center justify-center gap-4 mb-8 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <MousePointerClick className="w-3.5 h-3.5 text-[#00E676]" /> Survolez pour lire
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#00E676]" /> Cliquez pour le son ou agrandir
          </span>
        </p>

        {/* Grille 2 colonnes compactes dès mobile + 4 colonnes desktop */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 sm:gap-x-5 gap-y-4 sm:gap-y-7 mx-auto"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.38, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className={`${!expandedMobile && idx >= MOBILE_INITIAL_COUNT ? "hidden sm:block " : ""}${
                  idx % 2 === 1 ? "lg:mt-6" : ""
                }`}
              >
                <VideoCard916
                  item={item}
                  index={idx}
                  isSoundOn={soundOwnerId === item.id}
                  onSoundChange={handleSoundChange}
                  onOpenPhoto={setLightboxPhoto}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bouton « Voir les 12 réalisations » sur mobile */}
        {shouldTruncateMobile && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setExpandedMobile(true)}
              aria-label={`Voir les ${filteredItems.length} réalisations`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.06] hover:bg-[#1E3AFF] border border-white/20 text-xs font-extrabold uppercase tracking-wider text-white transition-colors shadow-lg cursor-pointer"
            >
              <span>Voir les {filteredItems.length} réalisations</span>
              <ChevronDown className="w-4 h-4 text-[#00E676]" />
            </button>
          </div>
        )}

        {/* CTA de relance conversion sous la galerie */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="#offres"
            aria-label={BRAND_CONTENT.videoWall.bottomCta}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1E3AFF] hover:bg-[#00E676] text-white hover:text-[#0B0F29] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-[0_12px_35px_rgba(30,58,255,0.45)] transition-all"
          >
            <span>{BRAND_CONTENT.videoWall.bottomCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Lightbox plein écran pour les cartes Photos & Stories */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            key="photo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxPhoto.title} — ${lightboxPhoto.client}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-[#0B0F29] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Fermer l'aperçu photo"
                className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-[#00E676] text-white hover:text-[#0B0F29] border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[4/5] w-full bg-black">
                <Image
                  src={lightboxPhoto.src}
                  alt={`${lightboxPhoto.title} — ${lightboxPhoto.client}`}
                  fill
                  sizes="(max-width: 640px) 92vw, 448px"
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col gap-3">
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1E3AFF]/30 text-[#00E676] border border-[#1E3AFF]/50 mb-1.5">
                    {lightboxPhoto.client} • {lightboxPhoto.categoryLabel}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {lightboxPhoto.title}
                  </h3>
                </div>

                <a
                  href="#offres"
                  onClick={() => setLightboxPhoto(null)}
                  aria-label="Découvrir nos offres pour un shooting similaire"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3AFF] hover:bg-[#00E676] text-white hover:text-[#0B0F29] text-xs font-extrabold uppercase tracking-wider transition-colors"
                >
                  <span>Demander le même rendu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
