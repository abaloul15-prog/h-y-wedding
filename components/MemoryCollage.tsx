"use client";

import { motion } from "framer-motion";
import { getCollageImages, COLLAGE_LAYOUT_CLASSES } from "@/lib/images";
import ParallaxImage from "./ParallaxImage";

const collageImages = getCollageImages();

export default function MemoryCollage() {
  return (
    <section
      className="relative bg-ivory py-24 md:py-40"
      aria-label="Memory collage"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-24"
        >
          <p className="font-display text-xs tracking-[0.35em] text-silver-blue uppercase">
            Fragments
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-light tracking-wide text-charcoal">
            Moments in Motion
          </h2>
        </motion.div>

        <div className="grid auto-rows-[120px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-6 md:gap-4 lg:gap-5">
          {collageImages.map((image, index) => {
            const layoutClass =
              COLLAGE_LAYOUT_CLASSES[index % COLLAGE_LAYOUT_CLASSES.length];
            const rotation = (index % 5) - 2;

            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 60, rotate: rotation * 0.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation * 0.3 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 1,
                  delay: (index % 8) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${layoutClass} relative overflow-hidden`}
                style={{ zIndex: index % 3 === 0 ? 2 : 1 }}
              >
                <ParallaxImage
                  image={image}
                  className="h-full w-full"
                  speed={0.08 + (index % 4) * 0.03}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
