"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Clapperboard,
  Signal,
  Wifi,
  BatteryFull,
  ImageIcon,
} from "lucide-react";
import type { VideoShowcaseItem } from "@/data/content";

interface VideoCard916Props {
  item: VideoShowcaseItem;
  index: number;
  /** true si cette carte détient actuellement le son (une seule à la fois) */
  isSoundOn: boolean;
  /** Demande l'activation (id) ou la coupure (null) du son */
  onSoundChange: (id: string | null) => void;
}

const FALLBACK_GRADIENTS = [
  "from-[#1E3AFF] via-[#0B0F29] to-[#00E676]/40",
  "from-[#FF3B5C]/70 via-[#0B0F29] to-[#1E3AFF]/70",
  "from-[#00E676]/50 via-[#0B0F29] to-[#1E3AFF]",
  "from-[#00A3FF]/70 via-[#0B0F29] to-[#1E3AFF]/80",
];

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-ZÀ-Ý]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Châssis smartphone (bezel, boutons latéraux, Dynamic Island)        */
/* ------------------------------------------------------------------ */
function PhoneFrame({
  children,
  live,
  soundActive,
}: {
  children: React.ReactNode;
  live: boolean;
  soundActive: boolean;
}) {
  return (
    <div
      className={`relative rounded-[1.9rem] p-[5px] bg-gradient-to-b from-[#3a3f5c] via-[#171b33] to-[#0d1130] shadow-[0_24px_48px_-14px_rgba(0,0,0,0.8)] transition-all duration-500 ${
        soundActive
          ? "ring-2 ring-[#00E676] shadow-[0_24px_55px_-14px_rgba(0,230,118,0.42)]"
          : "ring-1 ring-white/10 group-hover:shadow-[0_24px_55px_-14px_rgba(0,230,118,0.28)] group-hover:ring-[#00E676]/60"
      }`}
    >
      {/* Boutons latéraux */}
      <span aria-hidden="true" className="absolute -left-[2.5px] top-[18%] h-6 w-[2.5px] rounded-l bg-[#2a2f4a]" />
      <span aria-hidden="true" className="absolute -left-[2.5px] top-[28%] h-10 w-[2.5px] rounded-l bg-[#2a2f4a]" />
      <span aria-hidden="true" className="absolute -right-[2.5px] top-[24%] h-12 w-[2.5px] rounded-r bg-[#2a2f4a]" />

      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.55rem] bg-[#05071a]">
        {children}

        {/* Dynamic Island avec voyant d'activité */}
        <div
          aria-hidden="true"
          className="absolute top-2 left-1/2 -translate-x-1/2 z-40 h-[18px] w-[32%] rounded-full bg-black flex items-center justify-end pr-2"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              live ? "bg-[#00E676] shadow-[0_0_6px_#00E676]" : "bg-white/10"
            }`}
          />
        </div>

        {/* Barre de statut */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 z-30 h-9 px-4 flex items-center justify-between text-[9px] font-semibold text-white/90"
        >
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal className="w-2.5 h-2.5" />
            <Wifi className="w-2.5 h-2.5" />
            <BatteryFull className="w-3 h-3" />
          </span>
        </div>

        {/* Reflet vitre */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 rounded-[1.55rem] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rail d'actions façon Reels / TikTok (décoratif)                      */
/* ------------------------------------------------------------------ */
function ActionRail() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-2 bottom-[28%] z-30 flex flex-col items-center gap-2.5 text-white"
    >
      <span className="flex flex-col items-center">
        <span className="w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center border border-white/10">
          <Heart className="w-3.5 h-3.5 fill-[#FF3B5C] text-[#FF3B5C]" />
        </span>
      </span>
      <span className="w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center border border-white/10">
        <MessageCircle className="w-3.5 h-3.5" />
      </span>
      <span className="w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center border border-white/10">
        <Bookmark className="w-3.5 h-3.5" />
      </span>
      <span className="w-7 h-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center border border-white/10">
        <Send className="w-3.5 h-3.5 -rotate-12" />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback élégant si le média est absent / illisible                  */
/* ------------------------------------------------------------------ */
function MediaFallback({ item, index }: { item: VideoShowcaseItem; index: number }) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${
        FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]
      } flex flex-col items-center justify-center p-6 text-center overflow-hidden shimmer`}
    >
      <div className="absolute inset-0 bg-studio-grain opacity-60" />
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center mb-4"
      >
        {item.mediaType === "photo" ? (
          <ImageIcon className="w-7 h-7 text-[#00E676]" />
        ) : (
          <Clapperboard className="w-7 h-7 text-[#00E676]" />
        )}
      </motion.div>
      <span className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E676] bg-[#0B0F29]/70 px-3 py-1 rounded-full border border-[#00E676]/30 mb-2">
        {item.mediaType === "photo" ? "Visuel Studio 9:16" : "Aperçu Studio 9:16"}
      </span>
      <p className="relative text-xs text-white/75 max-w-[175px]">{item.aspectInfo}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Badge sonore animé (égaliseur)                                       */
/* ------------------------------------------------------------------ */
function Equalizer({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-end gap-[2px] h-3.5 ${className}`}>
      {[0, 0.2, 0.4, 0.1].map((delay, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] h-full rounded-full bg-current"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

export default function VideoCard916({
  item,
  index,
  isSoundOn,
  onSoundChange,
}: VideoCard916Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState("");
  const [showSoundToast, setShowSoundToast] = useState(false);

  const isVideo = item.mediaType === "video";

  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasError) return;
    video.play().catch(() => {
      /* lecture bloquée par le navigateur : on reste sur la vignette */
    });
  }, [hasError]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  /* Synchronisation initiale si les métadonnées vidéo sont déjà en cache à l'hydratation */
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      setIsReady(true);
      if (video.duration) setDuration(formatDuration(video.duration));
    }
  }, [isVideo, item.src]);

  /* Barre de progression fluide (rAF) pendant la lecture */
  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && progressRef.current && v.duration) {
        progressRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  /* Mobile / tactile : lecture muette à l'entrée dans le viewport via IntersectionObserver */
  useEffect(() => {
    if (!isVideo || hasError) return;
    const el = containerRef.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          safePlay();
        } else {
          pause();
          if (isSoundOn) onSoundChange(null);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVideo, hasError, safePlay, pause, isSoundOn, onSoundChange]);

  /* Coupe automatiquement le son si une autre carte prend la main */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;
    if (!isSoundOn) {
      video.muted = true;
      if (!hoveringRef.current && window.matchMedia("(hover: hover)").matches) {
        video.pause();
      }
    }
  }, [isSoundOn, hasError]);

  const handleMouseEnter = () => {
    hoveringRef.current = true;
    if (isVideo) safePlay();
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    if (isVideo && !isSoundOn) pause();
  };

  /* Activation synchrone du son et remise à zéro (currentTime = 0) au clic (AGENTS.md §4) */
  const handleActivate = () => {
    if (!isVideo || hasError) return;
    const video = videoRef.current;
    if (isSoundOn) {
      if (video) video.muted = true;
      onSoundChange(null);
    } else {
      if (video) {
        video.currentTime = 0;
        video.muted = false;
        video.play().catch(() => {});
      }
      onSoundChange(item.id);
      setShowSoundToast(true);
      window.setTimeout(() => setShowSoundToast(false), 1600);
    }
  };

  const clientInitials = initials(item.client);

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      role={isVideo ? "button" : "figure"}
      tabIndex={isVideo ? 0 : -1}
      aria-label={
        isVideo
          ? `${item.title} — ${item.client}. ${
              isSoundOn ? "Couper le son" : "Activer le son et relire depuis le début"
            }`
          : `${item.title} — ${item.client}`
      }
      aria-pressed={isVideo ? isSoundOn : undefined}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] rounded-[1.9rem] ${
        isVideo ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <PhoneFrame live={isPlaying} soundActive={isSoundOn}>
        {/* ---------- Média ---------- */}
        {hasError ? (
          <MediaFallback item={item} index={index} />
        ) : isVideo ? (
          <>
            {!isReady && !item.poster && (
              <div className="absolute inset-0 bg-[#0d1130] shimmer" aria-hidden="true" />
            )}
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              playsInline
              muted
              loop
              preload="none"
              onLoadedMetadata={(e) => {
                setDuration(formatDuration(e.currentTarget.duration));
                setIsReady(true);
              }}
              onLoadedData={() => setIsReady(true)}
              onCanPlay={() => setIsReady(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setHasError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.03] ${
                isReady || Boolean(item.poster) ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <Image
            src={item.src}
            alt={`${item.title} — ${item.client}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setHasError(true)}
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
          />
        )}

        {/* ---------- Barre de progression façon Stories ---------- */}
        <div aria-hidden="true" className="absolute top-9 inset-x-3.5 z-30 flex gap-1">
          {isVideo ? (
            <div className="h-[2.5px] flex-1 rounded-full bg-white/25 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-[#00E676]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          ) : (
            [0, 1, 2, 3].map((seg) => (
              <div key={seg} className="h-[2.5px] flex-1 rounded-full bg-white/25 overflow-hidden">
                <div className={`h-full bg-white ${seg === 0 ? "w-full" : "w-0"}`} />
              </div>
            ))
          )}
        </div>

        {/* ---------- En-tête : client + indicateur sonore ---------- */}
        <div className="absolute top-12 inset-x-3 z-30 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 min-w-0 bg-black/35 backdrop-blur-md pr-2.5 pl-1 py-0.5 rounded-full border border-white/10">
            <span className="w-5 h-5 shrink-0 rounded-full bg-gradient-to-br from-[#1E3AFF] to-[#00E676] p-[1.5px]">
              <span className="w-full h-full rounded-full bg-[#0B0F29] flex items-center justify-center text-[8px] font-extrabold text-white">
                {clientInitials}
              </span>
            </span>
            <span className="truncate text-[10px] font-bold text-white drop-shadow">
              {item.client}
            </span>
          </span>

          {isVideo && !hasError && (
            <span
              aria-hidden="true"
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isSoundOn
                  ? "bg-[#00E676] text-[#0B0F29] shadow-[0_0_16px_rgba(0,230,118,0.7)] scale-105"
                  : "bg-black/45 text-white border border-white/20 group-hover:border-[#00E676]"
              }`}
            >
              {isSoundOn ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </span>
          )}
        </div>

        {/* ---------- Indicateur central Play ---------- */}
        {isVideo && !hasError && (
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              >
                <span className="relative w-12 h-12 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-[#00E676]/60 animate-ping" />
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ---------- Badge animé « Son activé » ---------- */}
        <AnimatePresence>
          {showSoundToast && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00E676] text-[#0B0F29] text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_24px_rgba(0,230,118,0.6)]"
            >
              <Equalizer />
              Son activé
            </motion.div>
          )}
        </AnimatePresence>

        <ActionRail />

        {/* ---------- Pied : infos réalisation ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 pt-16 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1E3AFF] text-white">
              {item.categoryLabel}
            </span>
            {duration && (
              <span className="text-[9px] font-semibold text-white/85 px-1.5 py-0.5 rounded bg-white/15">
                {duration}
              </span>
            )}
            {isPlaying && !isSoundOn && (
              <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#00E676]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] animate-pulse" />
                Live
              </span>
            )}
            {isSoundOn && <Equalizer className="ml-auto text-[#00E676]" />}
          </div>
          <h3 className="pr-8 text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-[#00E676] transition-colors">
            {item.title}
          </h3>
          <p className="mt-1 text-[10px] text-white/65 line-clamp-1">{item.aspectInfo}</p>
          {isVideo && !hasError && (
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#00E676] opacity-80 group-hover:opacity-100 transition-opacity">
              {isSoundOn ? "Cliquer pour couper le son" : "Cliquer pour activer le son 🔊"}
            </p>
          )}
        </div>
      </PhoneFrame>
    </motion.div>
  );
}
