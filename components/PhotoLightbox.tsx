"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { Photo } from "@/lib/types";
import { resolveImage } from "@/lib/providers/image-provider";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ease } from "@/styles/motion";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;
  useLockBodyScroll(isOpen);

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  }, [index, onNavigate, photos.length]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, onNavigate, photos.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -80) goNext();
    else if (info.offset.x > 80) goPrev();
  };

  if (!photo) return null;
  const resolved = resolveImage(photo);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/96 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={resolved.alt}
          onClick={onClose}
        >
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-ivory/50 md:right-8 md:top-8"
            aria-label="Close photo"
            data-cursor="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-ivory/40 sm:left-3 sm:h-11 sm:w-11 md:left-6 md:h-12 md:w-12"
            aria-label="Previous photo"
            data-cursor="Prev"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-1 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-ivory/40 sm:right-3 sm:h-11 sm:w-11 md:right-6 md:h-12 md:w-12"
            aria-label="Next photo"
            data-cursor="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <motion.div
            layoutId={`gallery-photo-${photo.id}`}
            transition={{ duration: 0.5, ease: ease.cinematic }}
            className="relative mx-auto h-[68dvh] w-[86vw] max-w-5xl sm:h-[75dvh] sm:w-[88vw] md:h-[80dvh]"
            onClick={(event) => event.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={resolved.src}
              alt={resolved.alt}
              fill
              sizes="90vw"
              placeholder="blur"
              blurDataURL={resolved.blurDataURL}
              className="object-contain"
              priority
            />
          </motion.div>

          <div
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="font-body text-xs tracking-[0.3em] text-ivory/50 uppercase">
              {index !== null ? index + 1 : 0} / {photos.length}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
