"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/styles/motion";

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Shared viewport-triggered reveal. Centralizing this here removes the
 * near-identical `initial/whileInView/transition` blocks that used to
 * be repeated across every gallery block and grid item.
 */
export default function RevealItem({
  children,
  className = "",
  delay = 0,
  y = 28,
  x = 0,
  scale = 0.97,
  duration = 0.9,
  once = true,
}: RevealItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration, delay, ease: ease.cinematic }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
