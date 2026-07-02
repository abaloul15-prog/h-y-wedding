"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import type { Photo } from "@/lib/types";
import { resolveImage } from "@/lib/providers/image-provider";
import { ease } from "@/styles/motion";

interface ParallaxImageProps {
  image: Photo;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  speed?: number;
  sizes?: string;
  revealDelay?: number;
}

export default function ParallaxImage({
  image,
  className = "",
  imgClassName = "",
  priority = false,
  speed = 0.15,
  sizes = "100vw",
  revealDelay = 0,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);
  const resolved = resolveImage(image);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={reducedMotion ? undefined : { clipPath: "inset(6% round 2px)" }}
        whileInView={reducedMotion ? undefined : { clipPath: "inset(0% round 0px)" }}
        viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
        transition={{ duration: 1.1, delay: revealDelay, ease: ease.cinematic }}
        className="absolute inset-0"
      >
        <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
          <Image
            src={resolved.src}
            alt={resolved.alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            placeholder="blur"
            blurDataURL={resolved.blurDataURL}
            className={`object-cover ${imgClassName}`}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
