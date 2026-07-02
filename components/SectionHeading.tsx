"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/styles/motion";
import RevealText from "./RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}

/**
 * Shared eyebrow + headline pattern used across every major section.
 * Centralizing it keeps spacing, motion timing, and tone consistent
 * without repeating the same markup in every component.
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "dark",
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const eyebrowColor = tone === "light" ? "text-champagne" : "text-gold";
  const titleColor = tone === "light" ? "text-ivory" : "text-charcoal";

  return (
    <div
      className={`mx-auto mb-14 max-w-3xl px-6 sm:mb-16 md:mb-20 lg:mb-24 ${
        isCentered ? "text-center" : "text-left"
      } ${className}`}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
        className={`mb-4 font-body text-[10px] tracking-[0.4em] uppercase sm:mb-5 sm:text-[11px] sm:tracking-[0.45em] ${eyebrowColor}`}
      >
        {eyebrow}
      </motion.p>
      <RevealText
        as="h2"
        text={title}
        className={`font-display text-[clamp(1.9rem,6vw,4rem)] font-light leading-[1.08] ${titleColor} ${titleClassName}`}
      />
    </div>
  );
}
