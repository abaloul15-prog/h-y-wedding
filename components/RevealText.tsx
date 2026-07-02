"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ease } from "@/styles/motion";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "word" | "line";
}

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {},
};

/**
 * Masked text reveal. Each word rises from behind an overflow-hidden
 * mask, staggered. The outer tag (never clipped) is what Framer Motion
 * observes for `whileInView`; the clipped inner spans simply inherit
 * that state via variant propagation, so the reveal doesn't get stuck
 * waiting to "intersect" while it's invisible by design.
 */
export default function RevealText({
  text,
  as = "p",
  className = "",
  delay = 0,
  splitBy = "word",
}: RevealTextProps) {
  const reducedMotion = useReducedMotion();
  const segments = splitBy === "word" ? text.split(" ") : [text];
  const MotionTag = MOTION_TAG[as];

  if (reducedMotion) {
    const PlainTag = as;
    return <PlainTag className={className}>{text}</PlainTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={containerVariants}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className="inline-block overflow-hidden align-top"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: {
                  duration: 0.9,
                  delay: delay + index * 0.045,
                  ease: ease.entrance,
                },
              },
            }}
          >
            {segment}
            {splitBy === "word" && index < segments.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
