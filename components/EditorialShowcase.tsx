"use client";

import { motion } from "framer-motion";
import { getFeaturedPhotos } from "@/lib/data/photos";
import { RESPONSIVE_SIZES } from "@/lib/providers/image-provider";
import { viewportOnce } from "@/styles/motion";
import ParallaxImage from "./ParallaxImage";
import RevealText from "./RevealText";

const featured = getFeaturedPhotos();

const LAYOUT = [
  { span: "md:col-span-7 md:row-span-2", aspect: "aspect-[4/5]", sizes: RESPONSIVE_SIZES.half },
  { span: "md:col-span-5", aspect: "aspect-[5/4]", sizes: RESPONSIVE_SIZES.half },
  { span: "md:col-span-5", aspect: "aspect-square", sizes: RESPONSIVE_SIZES.half },
  { span: "md:col-span-6", aspect: "aspect-[3/4]", sizes: RESPONSIVE_SIZES.half },
  { span: "md:col-span-6 md:row-span-2", aspect: "aspect-[4/5]", sizes: RESPONSIVE_SIZES.half },
  { span: "md:col-span-6", aspect: "aspect-[16/10]", sizes: RESPONSIVE_SIZES.half },
];

export default function EditorialShowcase() {
  return (
    <section
      className="relative bg-ivory py-28 text-charcoal md:py-40"
      aria-label="Editorial photo showcase"
    >
      <div className="mx-auto mb-16 max-w-3xl px-6 text-center md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-gold uppercase"
        >
          A Closer Look
        </motion.p>
        <RevealText
          as="h2"
          text="Fragments worth keeping"
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05] text-charcoal"
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-12 md:gap-8 md:px-8">
        {featured.slice(0, LAYOUT.length).map((photo, index) => {
          const layout = LAYOUT[index % LAYOUT.length];
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 1,
                delay: (index % 3) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative overflow-hidden ${layout.aspect} ${layout.span}`}
            >
              <ParallaxImage image={photo} className="h-full w-full" sizes={layout.sizes} speed={0.1} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
