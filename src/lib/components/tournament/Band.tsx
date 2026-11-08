import React from "react";
import { motion } from "framer-motion";

type BandProps = {
  children: React.ReactNode;
  tone?: "azure" | "dark" | "pink";
  slant?: boolean;
  className?: string;
  reveal?: boolean;
  glow?: boolean;
  id?: string;
};

const TONES = {
  azure: "bg-[#166081] text-white",
  dark: "bg-[#0b3547] text-white",
  pink: "bg-[#d6245f] text-white",
} as const;

export function Band({
  children,
  tone = "azure",
  slant = true,
  className = "",
  reveal = true,
  glow = true,
  id,
}: BandProps) {
  return (
    <motion.section
      id={id}
      initial={reveal ? { opacity: 0, y: 60 } : false}
      whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative z-10 w-full scroll-mt-24 overflow-hidden ${TONES[tone]} ${className}`}
      style={
        slant
          ? { clipPath: "polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)" }
          : undefined
      }
    >
      {/* slowly drifting glows */}
      {glow && <><motion.div
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00afef]/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ff5c93]/20 blur-3xl"
      /></>}

      <div
        className={`relative mx-auto w-full max-w-5xl px-4 ${
          slant ? "py-[calc(4vw+3rem)]" : "py-12"
        }`}
      >
        {children}
      </div>
    </motion.section>
  );
}