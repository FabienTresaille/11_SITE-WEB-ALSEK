"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { useConsent } from "@/context/ConsentContext";

export default function CookieBanner() {
  const {
    consent,
    isBannerVisible,
    isPreferencesOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closePreferences,
  } = useConsent();

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  // Synchronise les interrupteurs à chaque ouverture du panneau de personnalisation
  useEffect(() => {
    if (isPreferencesOpen) {
      setAnalyticsEnabled(consent?.analytics ?? false);
      setMarketingEnabled(consent?.marketing ?? false);
    }
  }, [isPreferencesOpen, consent]);

  return (
    <>
      {/* =====================================================================
          NIVEAU 1 : Bandeau flottant CNIL (3 boutons de visibilité symétrique)
         ===================================================================== */}
      <AnimatePresence>
        {isBannerVisible && (
          <motion.aside
            key="cnil-banner-level-1"
            role="region"
            aria-label="Gestion du consentement aux cookies"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-2.5 inset-x-2.5 sm:bottom-5 sm:inset-x-5 z-50 max-w-5xl mx-auto rounded-2xl bg-[#0B0F29]/95 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.65)] p-3 sm:p-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-4">
              <div className="flex items-start gap-3 max-w-2xl">
                <span className="hidden sm:flex w-9 h-9 rounded-xl bg-[#1E3AFF]/25 border border-[#1E3AFF]/40 items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                </span>
                <div>
                  <p className="hidden sm:block text-sm font-extrabold uppercase tracking-tight text-white">
                    Respect de votre vie privée &amp; cookies
                  </p>
                  {/* Version mobile ultra-concise (2 lignes max) */}
                  <p className="sm:hidden text-[11px] text-white/85 leading-snug">
                    <span className="font-extrabold text-white">Cookies :</span> mesure d&apos;audience (GA4) et Pixel Meta activés uniquement avec votre accord.{" "}
                    <Link
                      href="/politique-cookies"
                      className="text-[#00E676] underline underline-offset-2 font-semibold"
                    >
                      En savoir plus
                    </Link>
                  </p>
                  {/* Version tablette / desktop complète */}
                  <p className="hidden sm:block mt-1 text-xs text-white/75 leading-relaxed">
                    Nous utilisons uniquement des traceurs soumis à votre accord pour mesurer
                    l&apos;audience du site (Google Analytics) et évaluer nos campagnes réseaux
                    sociaux (Pixel Meta). Aucun traceur publicitaire ou analytique n&apos;est
                    activé sans votre choix.{" "}
                    <Link
                      href="/politique-cookies"
                      className="text-[#00E676] underline underline-offset-2 hover:text-white transition-colors"
                    >
                      En savoir plus
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* 3 boutons symétriques sur 1 seule ligne dès mobile (exigence CNIL) */}
              <div className="grid grid-cols-3 sm:flex sm:flex-nowrap items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={rejectAll}
                  aria-label="Tout refuser et continuer sans cookies optionnels"
                  className="px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <span className="sm:hidden">Refuser</span>
                  <span className="hidden sm:inline">Tout refuser</span>
                </button>
                <button
                  type="button"
                  onClick={openPreferences}
                  aria-label="Personnaliser mes préférences de cookies"
                  className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider border border-white/25 bg-transparent hover:border-[#00E676] hover:text-[#00E676] text-white transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="sm:hidden">Options</span>
                  <span className="hidden sm:inline">Personnaliser</span>
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  aria-label="Tout accepter"
                  className="px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider bg-[#1E3AFF] hover:bg-[#00E676] hover:text-[#0B0F29] text-white transition-colors shadow-[0_0_20px_rgba(30,58,255,0.45)] cursor-pointer"
                >
                  <span className="sm:hidden">Accepter</span>
                  <span className="hidden sm:inline">Tout accepter</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =====================================================================
          NIVEAU 2 : Modale de personnalisation granulaire (Analytics / Meta)
         ===================================================================== */}
      <AnimatePresence>
        {isPreferencesOpen && (
          <motion.div
            key="cnil-preferences-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0B0F29] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-5 sm:p-7 text-white max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00E676] mb-1">
                    PRÉFÉRENCES CNIL &amp; RGPD
                  </span>
                  <h2
                    id="cookie-modal-title"
                    className="text-lg sm:text-xl font-extrabold uppercase tracking-tight"
                  >
                    Paramétrer les cookies
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closePreferences}
                  aria-label="Fermer la fenêtre de préférences"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-white/70 leading-relaxed mb-5">
                Choisissez les traceurs que vous autorisez sur{" "}
                <span className="font-bold text-white">www.alsek.fr</span>. Votre choix est
                conservé pendant 6 mois et peut être modifié à tout moment depuis le pied de
                page.
              </p>

              <div className="space-y-3 mb-6">
                {/* 1. Strictement nécessaires */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                        Cookies strictement nécessaires
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/65 leading-relaxed">
                      Indispensables au fonctionnement du site et à la sauvegarde de votre
                      choix de consentement (<code>alsek_cookie_consent</code>).
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-[#00E676] border border-[#00E676]/30">
                    Toujours actif
                  </span>
                </div>

                {/* 2. Google Analytics 4 */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Mesure d&apos;audience (Google Analytics)
                    </span>
                    <p className="mt-1 text-[11px] text-white/65 leading-relaxed">
                      Nous aide à comprendre quelles réalisations et formules intéressent le
                      plus nos visiteurs de manière agrégée.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Activer ou désactiver la mesure d'audience Google Analytics"
                    onClick={() => setAnalyticsEnabled((prev) => !prev)}
                    className={`relative shrink-0 w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      analyticsEnabled ? "bg-[#00E676]" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-[#0B0F29] transition-transform ${
                        analyticsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* 3. Pixel Meta */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Publicité &amp; Réseaux Sociaux (Pixel Meta)
                    </span>
                    <p className="mt-1 text-[11px] text-white/65 leading-relaxed">
                      Permet de mesurer l&apos;efficacité de nos campagnes Instagram et
                      Facebook et de comptabiliser les demandes de devis.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketingEnabled}
                    aria-label="Activer ou désactiver le Pixel Meta"
                    onClick={() => setMarketingEnabled((prev) => !prev)}
                    className={`relative shrink-0 w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      marketingEnabled ? "bg-[#00E676]" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-[#0B0F29] transition-transform ${
                        marketingEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={rejectAll}
                  aria-label="Tout refuser"
                  className="px-3.5 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                >
                  Tout refuser
                </button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      savePreferences({
                        analytics: analyticsEnabled,
                        marketing: marketingEnabled,
                      })
                    }
                    aria-label="Enregistrer mes choix de cookies"
                    className="px-4 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider border border-[#00E676] text-[#00E676] hover:bg-[#00E676] hover:text-[#0B0F29] transition-colors cursor-pointer"
                  >
                    Enregistrer mes choix
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    aria-label="Tout accepter"
                    className="px-4 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider bg-[#1E3AFF] hover:bg-[#00E676] hover:text-[#0B0F29] text-white transition-colors cursor-pointer"
                  >
                    Tout accepter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
