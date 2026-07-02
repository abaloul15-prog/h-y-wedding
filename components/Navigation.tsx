"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { COUPLE } from "@/lib/data/couple";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { getLenisInstance, scrollToTarget } from "@/lib/lenis-instance";
import { ease } from "@/styles/motion";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#film", label: "Film" },
  { href: "#timeline", label: "Timeline" },
  { href: "#gallery", label: "Gallery" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hiddenRef = useRef(false);
  const scrolledRef = useRef(false);

  useLockBodyScroll(menuOpen);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const nextHidden = !menuOpen && latest > previous && latest > 160;
    const nextScrolled = latest > 40;

    if (hiddenRef.current !== nextHidden) {
      hiddenRef.current = nextHidden;
      setHidden(nextHidden);
    }

    if (scrolledRef.current !== nextScrolled) {
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    }
  });

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleNavigate = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const wasMenuOpen = menuOpen;
    setMenuOpen(false);

    if (wasMenuOpen) {
      getLenisInstance()?.start();
      requestAnimationFrame(() => scrollToTarget(href));
    } else {
      scrollToTarget(href);
    }
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: ease.cinematic }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
      >
        <nav
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-500 md:px-7 ${
            scrolled || menuOpen ? "glass-panel" : "border border-transparent"
          }`}
          aria-label="Primary"
        >
          <a
            href="#top"
            onClick={handleNavigate("#top")}
            className="font-display text-sm tracking-[0.25em] text-ivory transition-opacity hover:opacity-70"
            data-cursor="Home"
          >
            {COUPLE.monogram}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavigate(link.href)}
                  className="group relative font-body text-[11px] tracking-[0.25em] text-ivory/70 uppercase transition-colors hover:text-ivory"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <span className="hidden font-body text-[10px] tracking-[0.3em] text-champagne/80 uppercase md:inline">
            Private
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <motion.span
                animate={{
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 5 : 0,
                }}
                transition={{ duration: 0.3, ease: ease.cinematic }}
                className="h-px w-full origin-center bg-ivory"
              />
              <motion.span
                animate={{
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -5 : 0,
                }}
                transition={{ duration: 0.3, ease: ease.cinematic }}
                className="h-px w-full origin-center bg-ivory"
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/97 backdrop-blur-md md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <ul className="flex flex-col items-center gap-8 text-center">
              {LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.07,
                    ease: ease.cinematic,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={handleNavigate(link.href)}
                    className="font-display text-3xl font-light tracking-wide text-ivory transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-16 font-body text-[10px] tracking-[0.35em] text-champagne/70 uppercase"
            >
              Private &amp; Confidential
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
