"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";
import { useConsent } from "@/context/ConsentContext";

export default function MobileActionBar() {
  const { isBannerVisible, isPreferencesOpen } = useConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const contactEl = document.getElementById("contact");
      const contactTop = contactEl
        ? contactEl.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;
      // Visible dès que l'utilisateur quitte le Hero, masquée une fois arrivé au formulaire
      setVisible(y > 360 && contactTop > window.innerHeight * 0.65);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldRender = visible && !isBannerVisible && !isPreferencesOpen;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="mobile-action-bar"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.25 }}
          aria-label="Actions rapides de contact"
          className="md:hidden fixed bottom-3 inset-x-3 z-40 rounded-2xl bg-[#0B0F29]/92 backdrop-blur-xl border border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.65)] p-2 flex items-center gap-1.5"
        >
          <a
            href={BRAND_CONTENT.identity.phoneHref}
            aria-label={`Appeler alsek au ${BRAND_CONTENT.identity.phone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.08] text-white text-[11px] font-extrabold uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5 text-[#00E676]" />
            Appeler
          </a>
          <a
            href={BRAND_CONTENT.identity.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter alsek sur WhatsApp"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#00E676] text-[#0B0F29] text-[11px] font-extrabold uppercase tracking-wider"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <a
            href="#contact-form"
            aria-label="Aller au formulaire de devis"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#1E3AFF] text-white text-[11px] font-extrabold uppercase tracking-wider"
          >
            <FileText className="w-3.5 h-3.5" />
            Devis
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
