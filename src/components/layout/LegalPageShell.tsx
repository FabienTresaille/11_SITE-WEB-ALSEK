import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LEGAL_INFO } from "@/data/legal";

interface LegalPageShellProps {
  badge: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function LegalPageShell({
  badge,
  title,
  subtitle,
  children,
}: LegalPageShellProps) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#0B0F29] text-white pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Halo d'ambiance discret */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[640px] h-[300px] bg-[#1E3AFF]/15 blur-[140px] rounded-full"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Bouton retour rapide vers l'accueil */}
          <div className="mb-8">
            <Link
              href="/"
              aria-label="Retour à l'accueil alsek"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white/80 hover:text-[#00E676] bg-white/5 border border-white/10 hover:border-[#00E676]/50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour à l&apos;accueil
            </Link>
          </div>

          {/* En-tête de la page juridique */}
          <header className="mb-10 pb-8 border-b border-white/10">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00E676] mb-2.5">
              {badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
              {title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/45">
              Dernière mise à jour : {LEGAL_INFO.lastUpdated}
            </p>
          </header>

          {/* Corps structuré en cartes lisibles */}
          <div className="space-y-6">{children}</div>

          {/* Navigation croisée entre les 4 pages légales */}
          <nav
            aria-label="Autres documents juridiques"
            className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#00E676] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour à l&apos;accueil
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              {LEGAL_INFO.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00E676]/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer compact />
    </>
  );
}
