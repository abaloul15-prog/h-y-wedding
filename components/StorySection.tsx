"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { STORY_CHAPTERS } from "@/lib/data/story";
import { resolveImage, RESPONSIVE_SIZES } from "@/lib/providers/image-provider";
import { viewportOnce } from "@/styles/motion";
import RevealText from "./RevealText";
import Tilt from "./Tilt";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative bg-warm-white py-24 text-charcoal sm:py-28 md:py-40"
      aria-label="Their story"
    >
      <div className="mx-auto mb-16 max-w-3xl px-6 text-center sm:mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-gold uppercase"
        >
          Their Story
        </motion.p>
        <RevealText
          as="h2"
          text="A life, quietly written"
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05] text-charcoal"
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 sm:gap-24 md:gap-36">
        {STORY_CHAPTERS.map((chapter, index) => {
          const image = resolveImage(chapter.image);
          const reversed = index % 2 === 1;

          return (
            <div
              key={chapter.id}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className={reversed ? "md:order-2" : "md:order-1"}
              >
                <Tilt max={3} className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    sizes={RESPONSIVE_SIZES.half}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover"
                  />
                </Tilt>
              </motion.div>

              <div className={reversed ? "md:order-1" : "md:order-2"}>
                <span className="mb-4 flex items-baseline gap-3 font-body text-[11px] tracking-[0.4em] text-gold uppercase">
                  {chapter.eyebrow}
                  <span className="h-px flex-1 max-w-10 bg-gold/40" aria-hidden />
                </span>
                <h3 className="mb-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-tight text-charcoal">
                  {chapter.title}
                </h3>
                {chapter.paragraphs.map((paragraph, pIndex) => (
                  <motion.p
                    key={pIndex}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + pIndex * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-4 font-body text-base leading-relaxed text-charcoal/70 last:mb-0 md:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
