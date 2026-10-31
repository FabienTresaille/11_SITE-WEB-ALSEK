"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/** Synchronise ScrollTrigger avec la position virtuelle de Lenis. */
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

/**
 * Smooth scroll global (inertie type Buzzman) piloté par le ticker GSAP
 * pour garantir une parfaite synchronisation des animations ScrollTrigger.
 * Les liens d'ancrage (#offres, #contact…) sont gérés nativement par Lenis.
 */
export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: { offset: -80 },
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
