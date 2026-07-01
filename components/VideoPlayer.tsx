"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Video } from "@/lib/types";
import { resolveImage } from "@/lib/providers/image-provider";
import { resolvePlaybackSource, isPlaybackConfigured } from "@/lib/providers/video-provider";
import { ease } from "@/styles/motion";

interface VideoPlayerProps {
  video: Video;
  sizes?: string;
  priority?: boolean;
  autoPlayOnMount?: boolean;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="ml-1 h-5 w-5 md:h-6 md:w-6">
      <path d="M6 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
    </svg>
  );
}

export default function VideoPlayer({
  video,
  sizes = "100vw",
  priority = false,
  autoPlayOnMount = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlayOnMount);
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const poster = resolveImage(video.poster);
  const playback = resolvePlaybackSource(video);
  const configured = isPlaybackConfigured(video);

  return (
    <div className="group relative h-full w-full overflow-hidden bg-black">
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            type="button"
            key="poster"
            exit={{ opacity: 0, transition: { duration: 0.6, ease: ease.cinematic } }}
            onClick={() => configured && setIsPlaying(true)}
            className="absolute inset-0 z-10 flex h-full w-full flex-col justify-end text-left"
            aria-label={`Play ${video.title}`}
            data-cursor={configured ? "Play" : undefined}
          >
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              priority={priority}
              sizes={sizes}
              placeholder="blur"
              blurDataURL={poster.blurDataURL}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

            <div className="relative z-10 flex flex-1 items-center justify-center">
              <motion.span
                whileHover={configured ? { scale: 1.08 } : undefined}
                whileTap={configured ? { scale: 0.95 } : undefined}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-champagne/50 bg-black/30 text-ivory backdrop-blur-sm transition-colors group-hover:border-champagne group-hover:bg-black/50 md:h-20 md:w-20"
              >
                <PlayIcon />
              </motion.span>
            </div>

            <div className="relative z-10 px-6 pb-6 md:px-10 md:pb-10">
              <span className="mb-2 block font-body text-[11px] tracking-[0.35em] text-champagne uppercase">
                {video.category}
              </span>
              <h3 className="font-display text-2xl font-light text-ivory md:text-4xl">
                {video.title}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-xs text-ivory/60 md:text-sm">
                <span>{video.date}</span>
                <span aria-hidden>•</span>
                <span>{video.duration}</span>
                <span aria-hidden>•</span>
                <span>{video.location}</span>
              </div>
              {!configured && (
                <p className="mt-4 font-body text-xs italic text-ivory/50">
                  This film is being edited — check back soon.
                </p>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {isPlaying && playback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: ease.cinematic }}
          className="absolute inset-0"
        >
          {!isFrameLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-champagne"
              />
            </div>
          )}

          {playback.kind === "iframe" ? (
            <iframe
              src={playback.src}
              title={video.title}
              allow={playback.allow}
              allowFullScreen
              onLoad={() => setIsFrameLoaded(true)}
              className="h-full w-full"
            />
          ) : (
            <video
              src={playback.src}
              controls
              autoPlay
              playsInline
              onLoadedData={() => setIsFrameLoaded(true)}
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
