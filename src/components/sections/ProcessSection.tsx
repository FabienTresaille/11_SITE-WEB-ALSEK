"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Video, Send } from "lucide-react";
import { BRAND_CONTENT } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!progressLineRef.current || !sectionRef.current) return;

      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".process-step-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 52%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const stepIcons = [
    <Sparkles key="01" className="w-5 h-5 text-[#00E676]" />,
    <Video key="02" className="w-5 h-5 text-[#00E676]" />,
    <Send key="03" className="w-5 h-5 text-[#00E676]" />,
  ];

  return (
    <section
      id="methode"
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-[#0B0F29] border-t border-white/10 overflow-hidden"
    >
      {/* Halo ambiant */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[380px] h-[380px] bg-[#1E3AFF]/15 blur-[140px] rounded-full"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00E676] mb-2.5">
            {BRAND_CONTENT.process.surtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-[1.08]">
            {BRAND_CONTENT.process.title}
          </h2>
        </div>

        {/* Vertical Timeline with GSAP Glowing Progress Bar */}
        <div className="relative pl-9 sm:pl-14">
          {/* Background Track Line */}
          <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-gradient-to-b from-[#00E676] via-[#1E3AFF] to-[#00E676] origin-top shadow-[0_0_16px_#00E676]"
            />
          </div>

          <div className="space-y-6">
            {BRAND_CONTENT.process.steps.map((step, index) => (
              <div
                key={step.number}
                className="process-step-card group relative rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] border border-white/10 hover:border-[#00E676]/50 p-5 sm:p-6 md:p-7 transition-all duration-300 overflow-hidden"
              >
                {/* Numéro en filigrane subtil */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -right-2 -bottom-4 text-6xl sm:text-7xl font-extrabold tracking-tighter text-white/[0.03] group-hover:text-[#00E676]/[0.07] transition-colors"
                >
                  {step.number}
                </span>

                {/* Node Circle on the timeline */}
                <div className="absolute -left-[23px] sm:-left-9 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B0F29] border-2 border-[#00E676] flex items-center justify-center text-[11px] font-extrabold text-[#00E676] shadow-[0_0_16px_rgba(0,230,118,0.4)]">
                  {step.number}
                </div>

                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E3AFF]/20 border border-[#1E3AFF]/40 group-hover:border-[#00E676]/50 flex items-center justify-center transition-colors">
                      {stepIcons[index]}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00E676]">
                        ÉTAPE {step.number}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold uppercase text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <span className="self-start sm:self-center text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1E3AFF]/25 text-white border border-[#1E3AFF]/40">
                    {step.highlightTag}
                  </span>
                </div>

                <p className="relative text-xs sm:text-sm md:text-[15px] text-white/80 leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
