"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { BRAND_CONTENT } from "@/data/content";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Navbar compacte après 40px + masquée en descendant, réaffichée en remontant
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 400 && latest > previous && !mobileMenuOpen);
  });

  // Section active (indicateur de lien sur la page d'accueil)
  useEffect(() => {
    if (!isHome) {
      setActiveHref("");
      return;
    }
    const ids = BRAND_CONTENT.navbar.links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resolveHref = (anchor: string) => (isHome ? anchor : `/${anchor}`);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3"
    >
      <div
        className={`relative max-w-6xl mx-auto flex items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled || !isHome
            ? "h-14 px-4 sm:px-5 backdrop-blur-md bg-[#0B0F29]/85 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
            : "h-16 px-3 sm:px-4 bg-transparent border-transparent"
        }`}
      >
        {/* Logo strictement typographique (AGENTS.md §1) : « alsek » minuscule + MARKETING DIGITAL, aucun pictogramme */}
        <Link
          href="/"
          onClick={scrollToTop}
          aria-label="alsek — retour à l'accueil"
          className="inline-flex flex-col items-start group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] rounded-md"
        >
          <span
            className={`font-extrabold tracking-tighter text-white lowercase leading-none transition-all duration-500 group-hover:text-[#00E676] ${
              scrolled || !isHome ? "text-xl md:text-[1.4rem]" : "text-2xl md:text-[1.6rem]"
            }`}
          >
            {BRAND_CONTENT.identity.brand}
          </span>
          <span className="text-[7px] md:text-[8px] font-medium uppercase tracking-[0.25em] text-white/75 mt-1 leading-none">
            {BRAND_CONTENT.identity.baseline}
          </span>
        </Link>

        {/* Liens d'ancrage avec pastille active animée */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
          {BRAND_CONTENT.navbar.links.map((link) => {
            const isActive = isHome && activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isActive ? "text-[#0B0F29]" : "text-white/75 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#00E676]"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA rapides */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={BRAND_CONTENT.identity.phoneHref}
            aria-label={`Appeler alsek au ${BRAND_CONTENT.identity.phone}`}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold text-white border border-white/15 bg-white/5 hover:border-[#00E676] hover:text-[#00E676] transition-all"
          >
            <Phone className="w-3 h-3 text-[#00E676]" />
            {BRAND_CONTENT.navbar.ctaPhone}
          </a>
          <Link
            href={resolveHref("#offres")}
            aria-label={BRAND_CONTENT.navbar.ctaButton}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#1E3AFF] text-white hover:bg-[#00E676] hover:text-[#0B0F29] shadow-[0_0_20px_rgba(30,58,255,0.5)] transition-all"
          >
            {BRAND_CONTENT.navbar.ctaButton}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#00E676]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Barre de progression de lecture */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={`absolute left-4 right-4 bottom-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#1E3AFF] to-[#00E676] transition-opacity ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-[#0B0F29]/95 backdrop-blur-xl border border-white/10 px-6 py-6 space-y-4"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col">
              {BRAND_CONTENT.navbar.links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={resolveHref(link.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg font-extrabold uppercase tracking-tight text-white hover:text-[#00E676] py-2 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={BRAND_CONTENT.identity.phoneHref}
                aria-label={`Appeler alsek au ${BRAND_CONTENT.identity.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold border border-white/20 text-white"
              >
                <Phone className="w-4 h-4 text-[#00E676]" />
                {BRAND_CONTENT.navbar.ctaPhone}
              </a>
              <Link
                href={resolveHref("#offres")}
                onClick={() => setMobileMenuOpen(false)}
                aria-label={BRAND_CONTENT.navbar.ctaButton}
                className="w-full inline-flex items-center justify-center py-3.5 rounded-full text-sm font-bold bg-[#1E3AFF] text-white"
              >
                {BRAND_CONTENT.navbar.ctaButton}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
