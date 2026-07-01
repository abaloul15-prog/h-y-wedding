"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { COUPLE } from "@/lib/constants";

export default function HeroFilm() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Cinematic background */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src="/images/gallery/001.svg"
          alt="Hüseyin and Yousra wedding"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
      </motion.div>

      <div className="grain-overlay absolute inset-0 z-[1]" />

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory-warm"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-display text-xs tracking-[0.4em] text-champagne-light uppercase md:text-sm"
        >
          A Private Memory
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-light tracking-[0.08em] uppercase"
        >
          {COUPLE.name1.toUpperCase()}
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="my-4 font-display text-2xl tracking-[0.5em] text-champagne md:my-6 md:text-3xl"
        >
          &
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-light tracking-[0.08em] uppercase"
        >
          {COUPLE.name2.toUpperCase()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-10 font-display text-sm tracking-[0.35em] text-candlelight uppercase md:mt-14 md:text-base"
        >
          16 June 2026
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-display text-[10px] tracking-[0.35em] text-ivory/70 uppercase">
          Enter Our Story
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-champagne/80 to-transparent"
        />
      </motion.div>

      <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
