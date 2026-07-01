"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { VideoConfig } from "@/lib/videos";
import { getVideoSrc } from "@/lib/videos";

interface FullscreenVideoProps {
  config: VideoConfig;
  variant?: "primary" | "finale";
}

export default function FullscreenVideo({
  config,
  variant = "primary",
}: FullscreenVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 0.3, 0.3, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || config.type !== "mp4") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setHasError(true));
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [config.type]);

  const isFinale = variant === "finale";

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
      aria-label={config.label}
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        {config.type === "mp4" && !hasError ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={config.poster}
          >
            <source src={config.src} type="video/mp4" />
          </video>
        ) : config.type === "youtube" && config.youtubeId ? (
          <iframe
            src={getVideoSrc(config) ?? undefined}
            className="h-full w-full object-cover"
            allow="autoplay; encrypted-media"
            title={config.label}
          />
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={config.poster ?? "/images/gallery/001.svg"}
              alt={config.label}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30">
              <p className="font-display text-sm tracking-[0.3em] text-ivory/60 uppercase">
                {config.id} — Replace with video
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className={`absolute inset-0 ${
          isFinale
            ? "bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/50"
            : "cinematic-gradient"
        }`}
      />

      <motion.div
        style={{ y: textY }}
        className={`absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 ${
          isFinale ? "items-end text-right" : "items-start text-left"
        }`}
      >
        {isFinale && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-display text-[10px] tracking-[0.4em] text-champagne uppercase"
          >
            The Final Act
          </motion.span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className={`font-display font-light tracking-wide text-ivory ${
            isFinale
              ? "text-[clamp(2rem,6vw,4.5rem)] leading-tight"
              : "text-[clamp(2.5rem,7vw,5.5rem)]"
          }`}
        >
          {config.label}
        </motion.h2>

        {!isFinale && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px w-16 origin-left bg-champagne/60"
          />
        )}
      </motion.div>

      {isPlaying && (
        <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
          <span className="text-[10px] tracking-[0.25em] text-ivory/50 uppercase">
            Playing
          </span>
        </div>
      )}
    </section>
  );
}
