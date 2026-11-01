"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, MessageCircle, Phone, Send } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";
import { trackLeadEvent } from "@/components/analytics/TrackingScripts";

interface ContactFormProps {
  selectedOffer: string;
  onSelectOffer: (offerId: string) => void;
}

type Status = "idle" | "loading" | "success" | "error";

interface ApiResponse {
  ok: boolean;
  error?: string;
}

const OFFER_VALUES: readonly string[] = BRAND_CONTENT.footer.packOptions.map((o) => o.value);
const HASH_PREFIX = "#offre-";

const inputClass =
  "w-full rounded-xl border-2 border-[#0B0F29]/15 bg-white px-3.5 py-2.5 text-base sm:text-sm font-medium text-[#0B0F29] placeholder:text-[#0B0F29]/40 focus:border-[#1E3AFF] focus:outline-none transition-colors";
const labelClass =
  "block text-[11px] font-extrabold uppercase tracking-wider text-[#0B0F29] mb-1.5";

/**
 * Formulaire de contact connecté à `/api/contact` (SMTP OVH).
 * - L'offre est partagée avec la grille des formules (state remonté dans page.tsx)
 * - Supporte aussi un lien direct par ancre : `#offre-evolution`, `#offre-maitrise`…
 * - Champ honeypot `website` invisible pour piéger les robots.
 */
export default function ContactForm({ selectedOffer, onSelectOffer }: ContactFormProps) {
  const copy = BRAND_CONTENT.contactForm;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const flashControls = useAnimationControls();
  const previousOffer = useRef(selectedOffer);

  // Pré-sélection via ancre (#offre-xxx) au chargement et à chaque changement de hash
  useEffect(() => {
    const applyHash = () => {
      const { hash } = window.location;
      if (!hash.startsWith(HASH_PREFIX)) return;
      const value = decodeURIComponent(hash.slice(HASH_PREFIX.length));
      if (OFFER_VALUES.includes(value)) {
        onSelectOffer(value);
        document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [onSelectOffer]);

  // Flash néon à chaque changement d'offre (ex : clic depuis la grille des formules)
  useEffect(() => {
    if (previousOffer.current === selectedOffer) return;
    previousOffer.current = selectedOffer;
    void flashControls.start({
      boxShadow: [
        "0 0 0 0px rgba(0,230,118,0)",
        "0 0 0 5px rgba(0,230,118,0.85)",
        "0 0 0 0px rgba(0,230,118,0)",
      ],
      transition: { duration: 1.3, delay: 0.55, ease: "easeOut" },
    });
  }, [selectedOffer, flashControls]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, offer: selectedOffer, message, website }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as ApiResponse;
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error ?? copy.genericError);
        setStatus("error");
        return;
      }

      const offerLabel =
        BRAND_CONTENT.footer.packOptions.find((o) => o.value === selectedOffer)?.label ??
        selectedOffer;
      trackLeadEvent(offerLabel);

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setErrorMessage(copy.genericError);
      setStatus("error");
    }
  };

  return (
    <motion.div
      id="contact-form"
      animate={flashControls}
      className="relative lg:col-span-7 rounded-3xl bg-[#F4F5F8] text-[#0B0F29] p-5 sm:p-7 shadow-xl overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            role="status"
            aria-live="polite"
            className="h-full min-h-[340px] flex flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 rounded-full bg-[#00E676] flex items-center justify-center shadow-[0_0_30px_rgba(0,230,118,0.55)] mb-4"
            >
              <CheckCircle2 className="w-7 h-7 text-[#0B0F29]" />
            </motion.span>
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight">{copy.successTitle}</h3>
            <p className="mt-2 max-w-sm text-xs sm:text-sm text-[#0B0F29]/70">{copy.successText}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              aria-label={copy.successReset}
              className="mt-5 text-[11px] font-extrabold uppercase tracking-wider text-[#1E3AFF] hover:text-[#0B0F29] underline underline-offset-4 cursor-pointer"
            >
              {copy.successReset}
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight mb-1.5">{copy.title}</h3>
            <p className="text-xs sm:text-sm text-[#0B0F29]/70 mb-4">{copy.intro}</p>

            {/* Rappel d'appel direct en 1 tap au-dessus du formulaire sur mobile */}
            <a
              href={BRAND_CONTENT.identity.phoneHref}
              aria-label={`Appeler alsek au ${BRAND_CONTENT.identity.phone}`}
              className="lg:hidden mb-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0F29] hover:bg-[#1E3AFF] text-white font-extrabold uppercase tracking-wider py-2.5 px-3.5 text-[11px] transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
              <span>{copy.quickCallLabel}</span>
            </a>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Honeypot anti-spam : invisible pour les humains, hors tabulation */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="contact-website">Ne pas remplir ce champ</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-offer" className={labelClass}>
                  {copy.fields.offer.label}
                </label>
                <div className="relative">
                  <select
                    id="contact-offer"
                    name="offer"
                    value={selectedOffer}
                    onChange={(e) => onSelectOffer(e.target.value)}
                    className={`${inputClass} appearance-none pr-10 font-bold cursor-pointer`}
                  >
                    {BRAND_CONTENT.footer.packOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E3AFF]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label htmlFor="contact-name" className={labelClass}>
                    {copy.fields.name.label}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.fields.name.placeholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    {copy.fields.phone.label}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    maxLength={30}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={copy.fields.phone.placeholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    {copy.fields.email.label}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    maxLength={160}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.fields.email.placeholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {copy.fields.message.label}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  maxLength={3000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.fields.message.placeholder}
                  className={`${inputClass} resize-y min-h-[78px]`}
                />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    role="alert"
                    className="flex items-start gap-2 rounded-xl bg-[#FF3B5C]/10 border border-[#FF3B5C]/40 px-3.5 py-2.5 text-xs font-semibold text-[#c4183a]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label={copy.submit}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3AFF] hover:bg-[#0B0F29] disabled:opacity-70 disabled:cursor-wait text-white font-extrabold uppercase tracking-wider py-3.5 px-5 text-xs transition-colors shadow-md cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {copy.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {copy.submit}
                    </>
                  )}
                </button>

                <a
                  href={BRAND_CONTENT.identity.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Écrire directement sur WhatsApp"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00E676] hover:bg-[#0B0F29] text-[#0B0F29] hover:text-white font-extrabold uppercase tracking-wider py-3.5 px-4 text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <p className="text-[11px] text-center text-[#0B0F29]/65">{copy.privacy}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
