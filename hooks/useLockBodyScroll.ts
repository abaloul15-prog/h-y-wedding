"use client";

import { useEffect } from "react";
import { getLenisInstance } from "@/lib/lenis-instance";

/** Locks body scroll while a condition is true (e.g. lightbox open), pausing Lenis in sync. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const lenis = getLenisInstance();
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousHtmlOverflow = htmlStyle.overflow;

    lenis?.stop();
    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = previousBodyOverflow;
      htmlStyle.overflow = previousHtmlOverflow;
      lenis?.start();
    };
  }, [locked]);
}
