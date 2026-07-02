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

const EDITORIAL_COLLAGE_FRAMES = [
  {
    frame:
      "left-0 top-0 z-20 h-[360px] w-[72%] sm:h-[430px] md:h-[560px] md:w-[46%]",
    sizes: "(max-width: 768px) 72vw, 46vw",
  },
  {
    frame:
      "right-0 top-[120px] z-10 h-[260px] w-[54%] sm:top-[150px] sm:h-[320px] md:top-[70px] md:h-[380px] md:w-[36%]",
    sizes: "(max-width: 768px) 54vw, 36vw",
  },
  {
    frame:
      "bottom-[90px] left-[12%] z-30 h-[210px] w-[46%] sm:h-[260px] md:bottom-0 md:left-[32%] md:h-[300px] md:w-[28%]",
    sizes: "(max-width: 768px) 46vw, 28vw",
  },
  {
    frame:
      "bottom-0 right-[5%] z-20 h-[250px] w-[58%] sm:h-[320px] md:right-[8%] md:h-[420px] md:w-[34%]",
    sizes: "(max-width: 768px) 58vw, 34vw",
  },
];

function CollageBlock({ block, onOpen }: BlockProps) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-28">
      <div className="relative min-h-[760px] sm:min-h-[880px] md:min-h-[720px]">
        {block.photos.map((photo, i) => (
          <div
            key={photo.id}
            className={`absolute ${EDITORIAL_COLLAGE_FRAMES[i % EDITORIAL_COLLAGE_FRAMES.length].frame}`}
          >
          <RevealItem
            delay={i * 0.08}
            scale={0.94}
            className="relative h-full w-full"
          >
            <GalleryImage
              photo={photo}
              onOpen={onOpen}
              sizes={EDITORIAL_COLLAGE_FRAMES[i % EDITORIAL_COLLAGE_FRAMES.length].sizes}
            />
          </RevealItem>
          </div>
        ))}
      </div>
    </div>
  );
}

function MosaicBlock({ block, onOpen }: BlockProps) {
  const mosaicFrames = [
    "col-span-2 row-span-2 aspect-[4/5] md:aspect-auto md:min-h-[520px]",
    "aspect-[4/5]",
    "aspect-square",
    "col-span-1 row-span-2 aspect-[3/5] md:aspect-auto",
    "aspect-[5/4]",
    "aspect-square",
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-2 py-10 md:px-4 md:py-20">
      <div className="grid auto-rows-[160px] grid-flow-dense grid-cols-2 gap-1 sm:auto-rows-[190px] md:grid-cols-4 md:gap-2 lg:auto-rows-[220px]">
        {block.photos.map((photo, i) => (
          <RevealItem
            key={photo.id}
            delay={(i % 4) * 0.07}
            scale={0.95}
            className={`relative ${mosaicFrames[i % mosaicFrames.length]}`}
          >
            <GalleryImage
              photo={photo}
              onOpen={onOpen}
              sizes={i === 0 ? "50vw" : RESPONSIVE_SIZES.quarter}
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
