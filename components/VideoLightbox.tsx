"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Video } from "@/lib/types";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ease } from "@/styles/motion";
import VideoPlayer from "./VideoPlayer";

interface VideoLightboxProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  useLockBodyScroll(Boolean(video));

  useEffect(() => {
    if (!video) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 px-3 backdrop-blur-md sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          onClick={onClose}
        >
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-ivory/50 md:right-8 md:top-8"
            aria-label="Close video"
            data-cursor="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M5 5l14 14M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: ease.cinematic }}
            className={`relative overflow-hidden rounded-xl shadow-[0_40px_140px_-20px_rgba(0,0,0,0.9)] md:rounded-2xl ${
              video.aspect === "portrait"
                ? "aspect-[9/16] w-[min(100%,calc(88dvh*(9/16)))]"
                : "aspect-video w-[min(100%,calc(85dvh*(16/9)))] max-w-6xl"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <VideoPlayer video={video} autoPlayOnMount sizes="1200px" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
