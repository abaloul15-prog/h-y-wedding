"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Photo } from "@/lib/types";
import { resolveImage } from "@/lib/providers/image-provider";

interface GalleryImageProps {
  photo: Photo;
  onOpen: (photo: Photo) => void;
  sizes: string;
  className?: string;
  priority?: boolean;
  layoutGroup?: string;
}

/** Shared gallery thumbnail. Its layoutId is mirrored by PhotoLightbox for a shared-element zoom. */
export default function GalleryImage({
  photo,
  onOpen,
  sizes,
  className = "",
  priority = false,
  layoutGroup = "gallery",
}: GalleryImageProps) {
  const resolved = resolveImage(photo);

  return (
    <motion.button
      type="button"
      layoutId={`${layoutGroup}-photo-${photo.id}`}
      onClick={() => onOpen(photo)}
      className={`group relative block h-full w-full overflow-hidden ${className}`}
      aria-label={`Open photograph: ${resolved.alt}`}
      data-cursor="View"
    >
      <Image
        src={resolved.src}
        alt={resolved.alt}
        fill
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={resolved.blurDataURL}
        className="transform-gpu object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
    </motion.button>
  );
}
