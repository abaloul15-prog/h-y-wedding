"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useAssetsReady";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scaleOnHover?: number;
}

/**
 * Subtle mouse-driven tilt and depth, in the spirit of premium product
 * pages. Disabled on touch devices (tilt on drag would feel broken)
 * and under prefers-reduced-motion.
 */
export default function Tilt({
  children,
  className = "",
  max = 6,
  scaleOnHover = 1,
}: TiltProps) {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [0, 1], [max, -max]);
  const rotateY = useTransform(springX, [0, 1], [-max, max]);

  if (reducedMotion || !isFinePointer) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
