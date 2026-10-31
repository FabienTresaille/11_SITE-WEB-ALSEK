"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative py-16 md:py-20 bg-[#0B0F29] border-t border-white/10"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00E676] mb-2.5">
            {BRAND_CONTENT.faq.surtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
            {BRAND_CONTENT.faq.title}
          </h2>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {BRAND_CONTENT.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "bg-white/[0.06] border-[#1E3AFF]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-label={item.question}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-[15px] font-bold text-white">
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#00E676] text-[#0B0F29]"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-white/75 leading-relaxed border-t border-white/10 pt-3.5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
