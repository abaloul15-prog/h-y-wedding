"use client";

import { motion } from "framer-motion";
import { getFeaturedVideo } from "@/lib/data/videos";
import { viewportOnce } from "@/styles/motion";
import RevealText from "./RevealText";
import VideoPlayer from "./VideoPlayer";

export default function FeaturedFilm() {
  const video = getFeaturedVideo();

  return (
    <section
      id="film"
      className="relative bg-black py-28 text-ivory md:py-40"
      aria-label="Featured film"
    >
      <div className="mx-auto mb-16 max-w-3xl px-6 text-center md:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-champagne uppercase"
        >
          The Featured Film
        </motion.p>
        <RevealText
          as="h2"
          text="Watch the story unfold"
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-4 md:px-8"
      >
        <div
          aria-hidden
          className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2.5rem] bg-champagne/10 blur-3xl md:-inset-x-16 md:-inset-y-16"
        />

        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-champagne/10 md:rounded-3xl">
          <VideoPlayer video={video} sizes="(max-width: 1200px) 100vw, 1200px" priority />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center font-body text-sm leading-relaxed text-ivory/60 md:text-base">
          {video.description}
        </p>
      </motion.div>
    </section>
  );
}
