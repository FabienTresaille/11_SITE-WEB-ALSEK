"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ThumbsUp } from "lucide-react";

export type BadgeType =
  | "heart"
  | "thumb"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "linkedin";

interface FloatingBadgeProps {
  type: BadgeType;
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  href?: string;
  label?: string;
}

export default function FloatingBadge({
  type,
  className = "",
  delay = 0,
  size = "md",
  href,
  label,
}: FloatingBadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10 md:w-11 md:h-11",
    lg: "w-11 h-11 md:w-12 md:h-12",
  };

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-4 h-4 md:w-5 md:h-5",
    lg: "w-5 h-5",
  }[size];

  const renderBadgeContent = () => {
    switch (type) {
      case "heart":
        return (
          <div
            className={`${sizeClasses[size]} rounded-full bg-[#FF3B5C] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(255,59,92,0.45)] border border-white/25`}
          >
            <Heart className={`${iconSize} fill-white text-white`} />
          </div>
        );
      case "thumb":
        return (
          <div
            className={`${sizeClasses[size]} rounded-full bg-[#00A3FF] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,163,255,0.45)] border border-white/25`}
          >
            <ThumbsUp className={`${iconSize} fill-white text-white`} />
          </div>
        );
      case "facebook":
        return (
          <div
            className={`${sizeClasses[size]} rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(24,119,242,0.4)] border border-white/20`}
          >
            <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </div>
        );
      case "instagram":
        return (
          <div
            className={`${sizeClasses[size]} rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(221,42,123,0.4)] border border-white/20`}
          >
            <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        );
      case "tiktok":
        return (
          <div
            className={`${sizeClasses[size]} rounded-xl bg-[#0B0F29] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,230,118,0.28)] border border-white/25`}
          >
            <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </div>
        );
      case "linkedin":
        return (
          <div
            className={`${sizeClasses[size]} rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(10,102,194,0.4)] border border-white/20`}
          >
            <svg className={`${iconSize} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </div>
        );
    }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label ?? type}
        initial={{ y: 0, rotate: -3 }}
        animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
        whileHover={{ scale: 1.12 }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className={`inline-block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E676] rounded-xl ${className}`}
      >
        {renderBadgeContent()}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ y: 0, rotate: -3 }}
      animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`pointer-events-none select-none ${className}`}
    >
      {renderBadgeContent()}
    </motion.div>
  );
}
