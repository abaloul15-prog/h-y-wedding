"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface QuoteSectionProps {
  lines: string[];
}

export default function QuoteSection({ lines }: QuoteSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center justify-center bg-ivory px-6 py-32 md:py-48"
      aria-label="Memory quote"
    >
      <motion.div
        style={{ opacity, y }}
        className="mx-auto max-w-4xl text-center"
      >
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 1.4,
              delay: index * 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`font-display text-balance font-light tracking-wide text-charcoal ${
              index === 0
                ? "text-[clamp(1.75rem,4.5vw,3.25rem)] leading-snug"
                : "mt-6 text-[clamp(1.5rem,4vw,2.75rem)] leading-snug text-charcoal-soft/80 italic"
            }`}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 h-px w-12 bg-champagne/50"
        />
      </motion.div>
    </section>
  );
}
