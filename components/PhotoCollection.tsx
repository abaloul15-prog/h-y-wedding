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
import RevealItem from "./RevealItem";
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
      <RevealItem className="h-full w-full" y={0} scale={0.985}>
      <GalleryImage photo={block.photos[0]} onOpen={onOpen} sizes={RESPONSIVE_SIZES.full} />
      </RevealItem>
    </div>
  );
}

function DiptychBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="grid min-h-[60dvh] grid-cols-1 md:min-h-[70dvh] md:grid-cols-2">
      {block.photos.map((photo, i) => (
        <RevealItem
          key={photo.id}
          delay={i * 0.12}
          className="relative aspect-[3/4] md:aspect-auto md:min-h-[70dvh]"
        >
          <GalleryImage photo={photo} onOpen={onOpen} sizes={RESPONSIVE_SIZES.half} />
        </RevealItem>
      ))}
    </div>
  );
}

function TriptychBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="grid grid-cols-1 gap-1 px-1 md:grid-cols-3 md:gap-2 md:px-0">
      {block.photos.map((photo, i) => (
        <RevealItem
          key={photo.id}
          delay={i * 0.1}
          className={`relative aspect-[4/5] md:aspect-[3/4] ${
            i === 1 ? "md:mt-12" : i === 2 ? "md:-mt-8" : ""
          }`}
        >
          <GalleryImage photo={photo} onOpen={onOpen} sizes={RESPONSIVE_SIZES.third} />
        </RevealItem>
      ))}
    </div>
  );
}

function EditorialBlock({ block, onOpen }: BlockProps) {
  const [large, small] = block.photos;
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-28">
      <RevealItem x={-30} y={0} className="relative aspect-[4/5] md:col-span-7">
        <GalleryImage photo={large} onOpen={onOpen} sizes={RESPONSIVE_SIZES.half} />
      </RevealItem>
      <RevealItem
        x={30}
        y={0}
        delay={0.15}
        className="relative aspect-[3/4] md:col-span-4 md:col-start-9 md:mt-20"
      >
        <GalleryImage photo={small} onOpen={onOpen} sizes="(max-width: 768px) 80vw, 35vw" />
      </RevealItem>
    </div>
  );
}

/**
 * Editorial four-photo collage: one dominant hero image, a stacked pair
 * beside it, and a wide banner beneath. Every span below was verified
 * by hand-simulating CSS Grid's sparse auto-placement algorithm for
 * both the 2-column (mobile) and 6-column (md+) tracks, so the four
 * images always tile the container exactly, with zero empty cells and
 * zero overlap, at every breakpoint.
 */
const COLLAGE_SPANS = [
  "col-span-2 row-span-2 md:col-span-4 md:row-span-4",
  "row-span-1 md:col-span-2 md:row-span-2",
  "row-span-1 md:col-span-2 md:row-span-2",
  "col-span-2 row-span-1 md:col-span-6 md:row-span-2",
];

const COLLAGE_SIZES = [
  RESPONSIVE_SIZES.half,
  RESPONSIVE_SIZES.quarter,
  RESPONSIVE_SIZES.quarter,
  RESPONSIVE_SIZES.full,
];

function CollageBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <div className="grid grid-cols-2 auto-rows-[175px] gap-2 sm:auto-rows-[210px] sm:gap-3 md:grid-cols-6 md:auto-rows-[120px] lg:auto-rows-[132px]">
        {block.photos.map((photo, i) => (
          <RevealItem
            key={photo.id}
            delay={i * 0.09}
            scale={0.95}
            className={`relative overflow-hidden ${COLLAGE_SPANS[i % COLLAGE_SPANS.length]}`}
          >
            <GalleryImage
              photo={photo}
              onOpen={onOpen}
              sizes={COLLAGE_SIZES[i % COLLAGE_SIZES.length]}
            />
          </RevealItem>
        ))}
      </div>
    </div>
  );
}

/**
 * Editorial six-photo mosaic: a dominant square, a tall companion, a
 * small accent, a wide mid-band, and a full-width closing banner. Like
 * the collage above, every span was hand-verified against the sparse
 * grid auto-placement algorithm for both the 2-column and 4-column
 * tracks, guaranteeing a fully tiled, gap-free composition.
 */
const MOSAIC_SPANS = [
  "col-span-2 row-span-2",
  "row-span-1 md:row-span-3",
  "row-span-1 md:row-span-2",
  "row-span-2 md:col-span-2 md:row-span-1",
  "row-span-1",
  "row-span-1 md:col-span-4",
];

function MosaicBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="mx-auto max-w-[1600px] px-2 py-10 md:px-4 md:py-20">
      <div className="grid grid-cols-2 auto-rows-[150px] gap-1 sm:auto-rows-[180px] md:grid-cols-4 md:gap-2 lg:auto-rows-[170px]">
        {block.photos.map((photo, i) => (
          <RevealItem
            key={photo.id}
            delay={(i % 6) * 0.06}
            scale={0.95}
            className={`relative overflow-hidden ${MOSAIC_SPANS[i % MOSAIC_SPANS.length]}`}
          >
            <GalleryImage
              photo={photo}
              onOpen={onOpen}
              sizes={i === 0 || i === 5 ? RESPONSIVE_SIZES.half : RESPONSIVE_SIZES.quarter}
            />
          </RevealItem>
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
