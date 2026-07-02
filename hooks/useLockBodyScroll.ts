"use client";

import { useEffect } from "react";
import { getLenisInstance } from "@/lib/lenis-instance";

/** Locks body scroll while a condition is true (e.g. lightbox open), pausing Lenis in sync. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const lenis = getLenisInstance();
    const scrollY = window.scrollY;
    const { style } = document.body;
    const previousPosition = style.position;
    const previousTop = style.top;
    const previousWidth = style.width;

    lenis?.stop();
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.position = previousPosition;
      style.top = previousTop;
      style.width = previousWidth;
      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [locked]);
}
