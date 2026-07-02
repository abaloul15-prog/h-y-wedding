"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TIMELINE_EVENTS } from "@/lib/data/timeline";
import { resolveImage, RESPONSIVE_SIZES } from "@/lib/providers/image-provider";
import { viewportOnce } from "@/styles/motion";
import RevealItem from "./RevealItem";
import RevealText from "./RevealText";
import Tilt from "./Tilt";

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative bg-black py-28 text-ivory md:py-40"
      aria-label="Wedding day timeline"
    >
      <div className="mx-auto mb-20 max-w-3xl px-6 text-center md:mb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mb-5 font-body text-[11px] tracking-[0.45em] text-champagne uppercase"
        >
          The Day
        </motion.p>
        <RevealText
          as="h2"
          text="One day, hour by hour"
          className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-light leading-[1.05]"
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-champagne/30 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-16 md:gap-24">
            {TIMELINE_EVENTS.map((event, index) => {
              const image = event.image ? resolveImage(event.image) : null;
              const reversed = index % 2 === 1;

              return (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[56px_1fr] sm:gap-6 md:grid-cols-2 md:gap-16"
                >
                  <span
                    aria-hidden
                    className="absolute left-[19px] top-1.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-black sm:left-[27px] md:left-1/2"
                  />

                  <div
                    className={`col-start-2 md:col-start-1 ${
                      reversed
                        ? "md:col-start-2 md:pl-16"
                        : "md:col-start-1 md:pr-16 md:text-right"
                    }`}
                  >
                    <span className="mb-2 block font-display text-sm tracking-[0.3em] text-champagne">
                      {event.date}
                    </span>
                    <h3 className="mb-3 font-display text-2xl font-light leading-tight md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ivory/60 md:text-base">
                      {event.description}
                    </p>
                  </div>

                  {image && (
                    <div
                      className={`col-span-2 col-start-1 mt-4 md:col-span-1 md:mt-0 ${
                        reversed
                          ? "md:col-start-1 md:row-start-1 md:pr-16"
                          : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <RevealItem>
                      <Tilt max={3} className="relative aspect-[4/3] overflow-hidden">
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
                      </RevealItem>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
