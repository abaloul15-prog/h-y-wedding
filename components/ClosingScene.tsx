"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { COUPLE } from "@/lib/data/couple";
import { getPhotoByIndex } from "@/lib/data/photos";
import { resolveImage } from "@/lib/providers/image-provider";
import { viewportOnce } from "@/styles/motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
  }));
}

export default function ClosingScene() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const backdrop = resolveImage(getPhotoByIndex(59));

  useEffect(() => {
    setParticles(generateParticles(30));
  }, []);

  return (
    <section
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black text-ivory"
      aria-label="Closing"
    >
      <div className="absolute inset-0">
        <Image
          src={backdrop.src}
          alt={backdrop.alt}
          fill
          loading="lazy"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={backdrop.blurDataURL}
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="radial-vignette absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-champagne/40"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -34, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4.5vw,3rem)] tracking-[0.3em] text-ivory/90 uppercase"
        >
          Private
        </motion.p>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-accent my-3 inline-block text-2xl italic text-gold-bright md:my-4 md:text-3xl"
        >
          &amp;
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4.5vw,3rem)] tracking-[0.3em] text-ivory/90 uppercase"
        >
          Confidential
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-12 h-px w-20 bg-champagne/40"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-body text-sm tracking-[0.3em] text-champagne uppercase md:text-base"
        >
          {COUPLE.fullName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 font-body text-xs tracking-[0.35em] text-ivory/50 uppercase"
        >
          {COUPLE.weddingDate}
        </motion.p>
      </div>
    </section>
  );
}
