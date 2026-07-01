"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { buildGalleryBlocks, type GalleryBlock } from "@/lib/images";
import ParallaxImage from "./ParallaxImage";

const galleryBlocks = buildGalleryBlocks();

function FullscreenBlock({ block }: { block: GalleryBlock }) {
  const image = block.images[0];
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <ParallaxImage
        image={image}
        className="h-full w-full"
        sizes="100vw"
        speed={0.12}
      />
    </div>
  );
}

function DiptychBlock({ block }: { block: GalleryBlock }) {
  return (
    <div className="grid min-h-[70dvh] grid-cols-1 md:grid-cols-2">
      {block.images.map((image, i) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] md:aspect-auto md:min-h-[70dvh]"
        >
          <ParallaxImage
            image={image}
            className="h-full w-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            speed={0.1}
          />
        </motion.div>
      ))}
    </div>
  );
}

function TriptychBlock({ block }: { block: GalleryBlock }) {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2">
      {block.images.map((image, i) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`relative overflow-hidden ${
            i === 1 ? "md:mt-12" : i === 2 ? "md:-mt-8" : ""
          }`}
        >
          <div className="relative aspect-[4/5] md:aspect-[3/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function EditorialBlock({ block }: { block: GalleryBlock }) {
  const [large, small] = block.images;
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-12 md:gap-12 md:py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] overflow-hidden md:col-span-7"
      >
        <ParallaxImage
          image={large}
          className="h-full w-full"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[3/4] overflow-hidden md:col-span-4 md:col-start-9 md:mt-20"
      >
        <ParallaxImage
          image={small}
          className="h-full w-full"
          sizes="(max-width: 768px) 80vw, 35vw"
          speed={0.08}
        />
      </motion.div>
    </div>
  );
}

function CollageBlock({ block }: { block: GalleryBlock }) {
  const layouts = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
  ];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-20">
      <div className="grid auto-rows-[140px] grid-cols-3 gap-2 md:auto-rows-[200px] md:gap-3">
        {block.images.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative overflow-hidden ${layouts[i % layouts.length]}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 33vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MosaicBlock({ block }: { block: GalleryBlock }) {
  return (
    <div className="mx-auto max-w-[1600px] px-2 py-8 md:px-4 md:py-16">
      <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-2">
        {block.images.map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.8,
              delay: (i % 4) * 0.06,
            }}
            className={`relative overflow-hidden ${
              i === 0
                ? "col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-[400px]"
                : "aspect-square"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GalleryBlockRenderer({ block }: { block: GalleryBlock }) {
  switch (block.layout) {
    case "fullscreen":
      return <FullscreenBlock block={block} />;
    case "diptych":
      return <DiptychBlock block={block} />;
    case "triptych":
      return <TriptychBlock block={block} />;
    case "editorial":
      return <EditorialBlock block={block} />;
    case "collage":
      return <CollageBlock block={block} />;
    case "mosaic":
      return <MosaicBlock block={block} />;
    default:
      return <FullscreenBlock block={block} />;
  }
}

export default function EditorialGallery() {
  return (
    <section aria-label="Photo gallery">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-ivory px-6 py-20 text-center md:py-32"
      >
        <p className="font-display text-xs tracking-[0.35em] text-silver-blue uppercase">
          The Archive
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-charcoal">
          Every Frame, Eternal
        </h2>
      </motion.div>

      <div className="bg-ivory-warm">
        {galleryBlocks.map((block) => (
          <GalleryBlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
