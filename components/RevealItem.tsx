"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useAssetsReady";

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
 * Shared viewport-triggered reveal. Implemented with one native
 * IntersectionObserver per instance that toggles a class directly on
 * the DOM node (no React state), paired with a CSS transition defined
 * in globals.css (`.reveal-item`). This replaced an earlier Framer
 * Motion `whileInView` implementation: profiling the Archive section
 * (60+ always-mounted photographs, `once: false` so reveals replay)
 * showed Framer's per-element MotionValue/VisualElement machinery was
 * a measurable source of dropped frames whenever a fast reverse-scroll
 * re-triggered many reveals at once. CSS transitions run on the
 * compositor thread instead, so replaying dozens of items no longer
 * costs a single React render or touches the scroll thread at all.
 */
export default function RevealItem({
  children,
  className = "",
  delay = 0,
  y = 28,
  x = 0,
  scale = 0.97,
  duration = 0.9,
  once = false,
}: RevealItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-in-view", entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const style = {
    "--reveal-x": `${x}px`,
    "--reveal-y": `${y}px`,
    "--reveal-scale": scale,
    "--reveal-duration": `${duration}s`,
    "--reveal-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div ref={ref} style={style} className={`reveal-item ${className}`}>
      {children}
    </div>
  );
}
