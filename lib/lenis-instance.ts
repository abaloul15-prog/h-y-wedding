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
export function scrollToTarget(target: string | HTMLElement, offset = -84) {
  const lenis = getLenisInstance();
  const element =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

  if (!element) return;

  if (lenis) {
    lenis.start();
    lenis.scrollTo(element, {
      offset,
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}
