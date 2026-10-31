"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "neon";
  className?: string;
  ariaLabel: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-bold rounded-full px-5 py-3 text-xs sm:text-sm transition-colors duration-300 select-none cursor-pointer";

  const variants = {
    primary:
      "bg-[#1E3AFF] text-white hover:bg-[#1E3AFF]/90 shadow-[0_0_30px_rgba(30,58,255,0.45)] hover:shadow-[0_0_40px_rgba(0,230,118,0.4)]",
    outline:
      "border-2 border-white/25 bg-white/5 text-white hover:border-[#00E676] hover:text-[#00E676] backdrop-blur-sm",
    neon:
      "bg-[#00E676] text-[#0B0F29] hover:bg-[#00E676]/90 shadow-[0_0_30px_rgba(0,230,118,0.35)]",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent border-0 p-0"
    >
      {content}
    </button>
  );
}
