"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { COUPLE } from "@/lib/constants";

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
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
}

export default function FooterExperience() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(24));
  }, []);

  return (
    <footer className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-charcoal">
      {/* Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-champagne/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="grain-overlay absolute inset-0 opacity-[0.06]" />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.5rem,4vw,2.5rem)] tracking-[0.25em] text-ivory/90 uppercase"
        >
          Private
        </motion.p>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="my-4 inline-block font-display text-xl tracking-[0.5em] text-champagne md:text-2xl"
        >
          &
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.5rem,4vw,2.5rem)] tracking-[0.25em] text-ivory/90 uppercase"
        >
          Confidential
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-12 h-px w-20 bg-champagne/40"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-display text-sm tracking-[0.3em] text-candlelight uppercase md:text-base"
        >
          {COUPLE.fullName.toUpperCase()}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-4 font-display text-xs tracking-[0.35em] text-silver-blue/80 uppercase"
        >
          16 June 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 text-[10px] tracking-[0.3em] text-ivory/30 uppercase"
        >
          Made with love, preserved forever
        </motion.p>
      </div>
    </footer>
  );
}
