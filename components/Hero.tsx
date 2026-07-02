"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { COUPLE } from "@/lib/data/couple";
import { getPhotoByIndex } from "@/lib/data/photos";
import { resolveImage } from "@/lib/providers/image-provider";
import { scrollToTarget } from "@/lib/lenis-instance";
import RevealText from "./RevealText";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const heroImage = resolveImage(getPhotoByIndex(0));

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100dvh] w-full overflow-hidden bg-black"
      aria-label="Hero"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={heroImage.blurDataURL}
          className="object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="radial-vignette absolute inset-0" />
      </motion.div>

      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-body text-[11px] tracking-[0.5em] text-champagne uppercase md:text-xs"
        >
          A Private Estate
        </motion.p>

        <RevealText
          as="h1"
          text={COUPLE.partner1.toUpperCase()}
          delay={0.6}
          className="font-display text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.92] tracking-[0.04em]"
        />

        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-accent my-2 text-3xl italic text-gold-bright md:my-4 md:text-4xl"
        >
          &amp;
        </motion.span>

        <RevealText
          as="h1"
          text={COUPLE.partner2.toUpperCase()}
          delay={0.85}
          className="font-display text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.92] tracking-[0.04em]"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 font-body text-[11px] tracking-[0.45em] text-ivory/60 uppercase md:mt-14"
        >
          {COUPLE.weddingDate}
        </motion.p>
      </motion.div>

      <motion.a
        href="#story"
        style={{ opacity }}
        onClick={(event) => {
          event.preventDefault();
          scrollToTarget("#story");
        }}
        className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        data-cursor="Scroll"
      >
        <span className="font-body text-[10px] tracking-[0.4em] text-ivory/70 uppercase transition-colors group-hover:text-ivory">
          Enter Our Story
        </span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-champagne to-transparent"
        />
      </motion.a>
    </section>
  );
}
