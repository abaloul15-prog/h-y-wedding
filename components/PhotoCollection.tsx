"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  buildGalleryBlocks,
  getAllPhotos,
  type GalleryBlock,
} from "@/lib/data/photos";
import { RESPONSIVE_SIZES } from "@/lib/providers/image-provider";
import type { Photo } from "@/lib/types";
import { viewportOnce } from "@/styles/motion";
import GalleryImage from "./GalleryImage";
import PhotoLightbox from "./PhotoLightbox";
import RevealText from "./RevealText";

const photos = getAllPhotos();
const galleryBlocks = buildGalleryBlocks(photos);

interface BlockProps {
  block: GalleryBlock;
  onOpen: (photo: Photo) => void;
}

function FullscreenBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="relative h-[100dvh] w-full">
      <GalleryImage photo={block.photos[0]} onOpen={onOpen} sizes={RESPONSIVE_SIZES.full} />
    </div>
  );
}

function DiptychBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="grid min-h-[70dvh] grid-cols-1 md:grid-cols-2">
      {block.photos.map((photo) => (
        <div key={photo.id} className="relative aspect-[3/4] md:aspect-auto md:min-h-[70dvh]">
          <GalleryImage photo={photo} onOpen={onOpen} sizes={RESPONSIVE_SIZES.half} />
        </div>
      ))}
    </div>
  );
}

function TriptychBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2">
      {block.photos.map((photo, i) => (
        <div
          key={photo.id}
          className={`relative aspect-[4/5] md:aspect-[3/4] ${
            i === 1 ? "md:mt-12" : i === 2 ? "md:-mt-8" : ""
          }`}
        >
          <GalleryImage photo={photo} onOpen={onOpen} sizes={RESPONSIVE_SIZES.third} />
        </div>
      ))}
    </div>
  );
}

function EditorialBlock({ block, onOpen }: BlockProps) {
  const [large, small] = block.photos;
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
      <div className="relative aspect-[4/5] md:col-span-7">
        <GalleryImage photo={large} onOpen={onOpen} sizes={RESPONSIVE_SIZES.half} />
      </div>
      <div className="relative aspect-[3/4] md:col-span-4 md:col-start-9 md:mt-20">
        <GalleryImage photo={small} onOpen={onOpen} sizes="(max-width: 768px) 80vw, 35vw" />
      </div>
    </div>
  );
}

const COLLAGE_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
];

function CollageBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20">
      <div className="grid auto-rows-[140px] grid-cols-3 gap-2 md:auto-rows-[200px] md:gap-3">
        {block.photos.map((photo, i) => (
          <div key={photo.id} className={`relative ${COLLAGE_SPANS[i % COLLAGE_SPANS.length]}`}>
            <GalleryImage photo={photo} onOpen={onOpen} sizes={RESPONSIVE_SIZES.quarter} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MosaicBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="mx-auto max-w-[1600px] px-2 py-8 md:px-4 md:py-16">
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-2">
        {block.photos.map((photo, i) => (
          <div
            key={photo.id}
            className={`relative ${
              i === 0
                ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-[400px]"
                : "aspect-square"
            }`}
          >
            <GalleryImage
              photo={photo}
              onOpen={onOpen}
              sizes={i === 0 ? "50vw" : RESPONSIVE_SIZES.quarter}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryBlockRenderer({ block, onOpen }: BlockProps) {
  switch (block.layout) {
    case "fullscreen":
      return <FullscreenBlock block={block} onOpen={onOpen} />;
    case "diptych":
      return <DiptychBlock block={block} onOpen={onOpen} />;
    case "triptych":
      return <TriptychBlock block={block} onOpen={onOpen} />;
    case "editorial":
      return <EditorialBlock block={block} onOpen={onOpen} />;
    case "collage":
      return <CollageBlock block={block} onOpen={onOpen} />;
    case "mosaic":
      return <MosaicBlock block={block} onOpen={onOpen} />;
    default:
      return <FullscreenBlock block={block} onOpen={onOpen} />;
  }
}

export default function PhotoCollection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleOpen = (photo: Photo) => {
    const flatIndex = photos.findIndex((p) => p.id === photo.id);
    setActiveIndex(flatIndex === -1 ? null : flatIndex);
  };

  return (
    <section id="gallery" aria-label="Photo collection" className="bg-warm-white">
      <div className="px-6 py-20 text-center md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-gold uppercase"
        >
          The Archive
        </motion.p>
        <RevealText
          as="h2"
          text="Every frame, eternal"
          className="mx-auto max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05] text-charcoal"
        />
      </div>

      <div className="bg-black">
        {galleryBlocks.map((block) => (
          <GalleryBlockRenderer key={block.id} block={block} onOpen={handleOpen} />
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
