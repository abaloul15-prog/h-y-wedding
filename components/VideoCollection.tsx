"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getVideoCollection } from "@/lib/data/videos";
import { resolveImage, RESPONSIVE_SIZES } from "@/lib/providers/image-provider";
import { viewportOnce } from "@/styles/motion";
import type { Video } from "@/lib/types";
import RevealText from "./RevealText";
import VideoLightbox from "./VideoLightbox";

export default function VideoCollection() {
  const videos = getVideoCollection();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section
      id="videos"
      className="relative bg-black py-28 text-ivory md:py-40"
      aria-label="Video collection"
    >
      <div className="mx-auto mb-16 max-w-3xl px-6 text-center md:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-champagne uppercase"
        >
          The Collection
        </motion.p>
        <RevealText
          as="h2"
          text="Every film, in one place"
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05]"
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:gap-7 md:px-8 lg:grid-cols-3 lg:gap-8">
        {videos.map((video, index) => {
          const poster = resolveImage(video.poster);

          return (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              whileHover={{ y: -6 }}
              transition={{
                opacity: { duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              onClick={() => setActiveVideo(video)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl text-left shadow-[0_20px_50px_-25px_rgba(0,0,0,0)] ring-1 ring-champagne/10 transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] first:sm:col-span-2 first:lg:col-span-1"
              data-cursor="View"
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                loading="lazy"
                sizes={RESPONSIVE_SIZES.third}
                placeholder="blur"
                blurDataURL={poster.blurDataURL}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-opacity duration-500 group-hover:from-black/95" />

              {video.featured && (
                <span className="absolute right-4 top-4 rounded-full border border-champagne/40 bg-black/40 px-3 py-1 font-body text-[9px] tracking-[0.25em] text-champagne uppercase backdrop-blur-sm">
                  Featured
                </span>
              )}

              <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 text-ivory opacity-0 transition-all duration-300 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" className="ml-0.5 h-3.5 w-3.5">
                  <path d="M6 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
                </svg>
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="mb-1 block font-body text-[10px] tracking-[0.3em] text-champagne uppercase">
                  {video.category}
                </span>
                <h3 className="font-display text-xl font-light text-ivory md:text-2xl">
                  {video.title}
                </h3>
                <span className="mt-2 block font-body text-xs text-ivory/50">
                  {video.duration}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
