import type { Transition, Variants } from "framer-motion";

/** Shared motion easing and duration tokens */
export const ease = {
  cinematic: [0.22, 1, 0.36, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  entrance: [0.16, 1, 0.3, 1] as const,
};

export const duration = {
  fast: 0.5,
  normal: 0.9,
  slow: 1.4,
  reveal: 1.6,
} as const;

export const stagger = {
  tight: 0.05,
  normal: 0.09,
  relaxed: 0.14,
} as const;

export const transitionCinematic: Transition = {
  duration: duration.slow,
  ease: ease.cinematic,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionCinematic,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionCinematic },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionCinematic,
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.slow, ease: ease.cinematic },
  },
};

export const staggerContainer = (staggerAmount = stagger.normal): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerAmount,
    },
  },
});

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" } as const;
