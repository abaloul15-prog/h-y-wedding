"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { COUPLE } from "@/lib/data/couple";

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
    setScrolled(latest > 40);
  });

  const handleNavigate = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
    >
      <nav
        className={`flex w-full max-w-4xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-500 md:px-7 ${
          scrolled ? "glass-panel" : "border border-transparent"
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

        <span className="font-body text-[10px] tracking-[0.3em] text-champagne/80 uppercase">
          Private
        </span>
      </nav>
    </motion.header>
  );
}
