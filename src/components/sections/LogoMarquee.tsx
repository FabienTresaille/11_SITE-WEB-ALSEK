"use client";

import React from "react";
import { BRAND_CONTENT } from "@/data/content";

export default function LogoMarquee() {
  // Deux pistes identiques côte à côte pour une boucle translateX(-50%) parfaitement fluide sans saut
  const trackClients = [...BRAND_CONTENT.clients, ...BRAND_CONTENT.clients];

  return (
    <section
      aria-label="Entreprises accompagnées par alsek"
      className="relative py-6 bg-[#0B0F29] border-y border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 mb-3.5 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
          ILS NOUS CONFIENT LEUR IMAGE &amp; LEUR VIRALITÉ QUOTIDIENNE
        </span>
      </div>

      <div className="group relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] items-center py-1">
          {[0, 1].map((dupIndex) => (
            <div
              key={dupIndex}
              aria-hidden={dupIndex === 1 ? "true" : undefined}
              className="flex items-center gap-3.5 pr-3.5"
            >
              {trackClients.map((client, idx) => (
                <div
                  key={`${client.name}-${dupIndex}-${idx}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00E676]/50 hover:bg-white/[0.06] transition-all whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] shadow-[0_0_8px_#00E676]" />
                  <span className="text-xs md:text-[13px] font-extrabold uppercase tracking-wider text-white">
                    {client.name}
                  </span>
                  <span className="text-[11px] font-medium text-white/50 border-l border-white/15 pl-2.5">
                    {client.sector}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
