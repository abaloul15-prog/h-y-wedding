import type Lenis from "@studio-freight/lenis";

/**
 * A single Lenis instance drives the whole page. Exposing it as a tiny
 * singleton (instead of prop-drilling or context) lets any component,
 * such as a lightbox or mobile menu, pause/resume the smooth scroll
 * when it opens an overlay, without fighting Lenis's own rAF loop.
 */
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}

/**
 * Scrolls to a selector or element through Lenis so its internal
 * scroll-position tracking stays authoritative. Falling back to the
 * native API keeps this safe to call before Lenis has mounted.
 */
export function scrollToTarget(target: string | HTMLElement, offset = -88) {
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }

  const element =
    typeof target === "string" ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
