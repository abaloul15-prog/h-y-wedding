"use client";

import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import type { ImageAsset } from "@/lib/images";

interface ParallaxImageProps {
  image: ImageAsset;
  className?: string;
  priority?: boolean;
  speed?: number;
  sizes?: string;
}

export default function ParallaxImage({
  image,
  className = "",
  priority = false,
  speed = 0.15,
  sizes = "100vw",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
