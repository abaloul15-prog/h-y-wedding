"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { viewportOnce } from "@/styles/motion";

const LINES = ["Some memories fade.", "Others become part of who we are."];

export default function PrivateMemories() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90dvh] items-center justify-center bg-warm-white px-6 py-32 text-charcoal md:py-48"
      aria-label="A private reflection"
    >
      <motion.div style={{ y }} className="mx-auto max-w-4xl text-center">
        {LINES.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: 1.3,
              delay: index * 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`font-display text-balance font-light tracking-wide ${
              index === 0
                ? "text-[clamp(1.75rem,4.5vw,3.25rem)] leading-snug text-charcoal"
                : "font-accent mt-6 text-[clamp(1.75rem,4.5vw,3.25rem)] italic leading-snug text-charcoal/70"
            }`}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 h-px w-12 bg-gold/60"
        />
      </motion.div>
    </section>
  );
}
