"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, ArrowDown, Globe, SlidersHorizontal } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";
import { LEGAL_INFO } from "@/data/legal";
import { useConsent } from "@/context/ConsentContext";
import ContactForm from "@/components/ui/ContactForm";

interface FooterProps {
  selectedOffer?: string;
  onSelectOffer?: (offerId: string) => void;
  /** Mode compact pour les pages juridiques (sans dupliquer le formulaire complet) */
  compact?: boolean;
}

export default function Footer({
  selectedOffer,
  onSelectOffer,
  compact = false,
}: FooterProps) {
  const [fallbackOffer, setFallbackOffer] = useState("evolution");
  const { openPreferences } = useConsent();

  const currentOffer = selectedOffer ?? fallbackOffer;
  const handleSelectOffer = onSelectOffer ?? setFallbackOffer;

  return (
    <footer
      id={compact ? undefined : "contact"}
      className={`relative bg-[#0B0F29] border-t border-white/10 ${
        compact ? "pt-10 pb-10" : "pt-14 pb-10"
      } overflow-hidden`}
    >
      {/* Ambient Electric Blue Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-[#1E3AFF]/20 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!compact && (
          <>
            {/* Directional Conversion Hook */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00E676] mb-2">
                PASSEZ À L&apos;ACTION MAINTENANT
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                {BRAND_CONTENT.footer.headline}
              </h2>

              <div className="mt-4 inline-flex flex-col items-center">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E3AFF] text-white font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_0_24px_rgba(30,58,255,0.55)]">
                  {BRAND_CONTENT.footer.subHeadline}
                </span>
                <ArrowDown className="w-5 h-5 text-[#00E676] mt-2.5 animate-bounce" />
              </div>
            </div>

            {/* Express Conversion Grid: Form + Direct Contact Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
              {/* Formulaire express connecté à /api/contact (SMTP OVH) */}
              <ContactForm
                selectedOffer={currentOffer}
                onSelectOffer={handleSelectOffer}
              />

              {/* Direct Contact Card */}
              <div className="lg:col-span-5 rounded-3xl bg-[#1E3AFF] text-white p-5 sm:p-7 flex flex-col justify-between shadow-[0_16px_45px_rgba(30,58,255,0.38)]">
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] bg-white/15 px-3 py-1 rounded-full mb-3.5">
                    CONTACT DIRECT 7J/7
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase leading-tight mb-2.5">
                    Besoin d&apos;un lancement immédiat ?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-6">
                    Appelez-nous directement en 1 clic ou écrivez-nous. Réponse
                    rapide pour planifier votre demi-journée de tournage.
                  </p>

                  <div className="space-y-3">
                    <a
                      href={BRAND_CONTENT.identity.phoneHref}
                      aria-label={`Appeler le ${BRAND_CONTENT.footer.phone}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0B0F29] hover:bg-[#00E676] hover:text-[#0B0F29] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-[#0B0F29]/15 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#00E676] group-hover:text-[#0B0F29]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                          Ligne directe
                        </div>
                        <div className="text-base sm:text-lg font-extrabold tracking-tight">
                          {BRAND_CONTENT.footer.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={BRAND_CONTENT.identity.emailHref}
                      aria-label={`Envoyer un email à ${BRAND_CONTENT.footer.email}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider opacity-75 font-semibold">
                          E-mail officiel
                        </div>
                        <div className="text-sm sm:text-base font-extrabold tracking-tight break-all">
                          {BRAND_CONTENT.footer.email}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest">
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#00E676]" />
                    {BRAND_CONTENT.footer.domain}
                  </span>
                  <span className="text-white/80">ACCOMPAGNEMENT SUR-MESURE</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom Strict Brand Identity Signature */}
        <div
          className={`${
            compact ? "" : "pt-6 border-t border-white/10"
          } flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <Link
            href="/"
            aria-label="alsek — accueil"
            className="flex flex-col items-center sm:items-start group"
          >
            <span className="font-extrabold text-2xl tracking-tighter text-white lowercase leading-none group-hover:text-[#00E676] transition-colors">
              {BRAND_CONTENT.identity.brand}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/70 mt-1">
              {BRAND_CONTENT.identity.baseline}
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/75">
            {BRAND_CONTENT.identity.socialLinks.map((social, idx) => (
              <React.Fragment key={social.name}>
                {idx > 0 && <span aria-hidden="true" className="text-white/30">•</span>}
                {social.href ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${BRAND_CONTENT.identity.brand} sur ${social.name}`}
                    className="font-semibold hover:text-[#00E676] transition-colors"
                  >
                    {social.name}
                  </a>
                ) : (
                  <span>{social.name}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {BRAND_CONTENT.identity.brand} — Tous
            droits réservés.
          </p>
        </div>

        {/* Barre permanente Juridique & Gestion des Cookies (exigence CNIL) */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-[11px] text-white/55">
          <nav
            aria-label="Liens juridiques et conformité"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            {LEGAL_INFO.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#00E676] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openPreferences}
            aria-label="Gérer mes préférences de cookies"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#00E676]/50 hover:text-[#00E676] text-white/75 font-semibold transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#00E676]" />
            Gérer mes cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
