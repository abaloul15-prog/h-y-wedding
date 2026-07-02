"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, viewportOnce } from "@/styles/motion";

interface RevealFrameProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" for a subtle rise, "scale" for a soft zoom-in reveal. */
  variant?: "up" | "scale";
}

/**
 * Shared scroll-triggered reveal wrapper for gallery/photo containers.
 * Centralizes the fade/scale/translate timing so every image block
 * animates in consistently instead of each block hand-rolling motion props.
 */
export default function RevealFrame({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: RevealFrameProps) {
  const initial =
    variant === "scale" ? { opacity: 0, scale: 0.94 } : { opacity: 0, y: 36 };
  const animate = variant === "scale" ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay, ease: ease.cinematic }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
