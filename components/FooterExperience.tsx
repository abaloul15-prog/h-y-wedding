"use client";

import { motion } from "framer-motion";
import { COUPLE } from "@/lib/data/couple";
import { viewportOnce } from "@/styles/motion";

export default function FooterExperience() {
  return (
    <footer className="border-t border-line-dark bg-black px-6 py-14 text-ivory/50 md:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1 }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"
      >
        <span className="font-display text-lg tracking-[0.2em] text-ivory/80">
          {COUPLE.monogram}
        </span>

        <p className="font-body text-[11px] tracking-[0.3em] uppercase">
          Preserved privately &middot; {COUPLE.weddingDate}
        </p>

        <p className="font-body text-[11px] tracking-[0.2em] uppercase">
          Not for public distribution
        </p>
      </motion.div>
    </footer>
  );
}
