"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useAssetsReady";

interface MouseParallaxOptions {
  /** Maximum translation in pixels at the edge of the tracked element. */
  strength?: number;
}

/**
 * Tracks pointer position within a container and exposes smoothed
 * motion values suitable for a subtle parallax translate. Disabled on
 * touch devices and when the user prefers reduced motion.
 */
export function useMouseParallax({ strength = 14 }: MouseParallaxOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 90, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      rawX.set(relX * strength);
      rawY.set(relY * strength);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, rawX, rawY, strength]);

  return { ref, x, y };
}
