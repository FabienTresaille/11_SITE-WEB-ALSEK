"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { useConsent } from "@/context/ConsentContext";

interface CookiePreferencesButtonProps {
  label?: string;
}

export default function CookiePreferencesButton({
  label = "Modifier mes préférences de cookies",
}: CookiePreferencesButtonProps) {
  const { openPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label={label}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E3AFF] hover:bg-[#00E676] hover:text-[#0B0F29] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-[0_0_24px_rgba(30,58,255,0.45)] cursor-pointer"
    >
      <SlidersHorizontal className="w-4 h-4" />
      {label}
    </button>
  );
}
