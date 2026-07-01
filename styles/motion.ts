/** Shared motion easing and duration tokens */
export const ease = {
  cinematic: [0.22, 1, 0.36, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.6,
  normal: 1.2,
  slow: 1.8,
  reveal: 1.4,
} as const;

export const stagger = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
} as const;
