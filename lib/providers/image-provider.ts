import type { PhotoRef } from "@/lib/types";

/**
 * Generates a tiny gradient shimmer SVG, base64-encoded, to use as a
 * next/image `blurDataURL`. This keeps CLS at zero and gives every
 * photo a soft loading transition without needing a real BlurHash
 * value from the CDN.
 */
function shimmer(width: number, height: number): string {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1714" />
      <stop offset="50%" stop-color="#2a241d" />
      <stop offset="100%" stop-color="#1a1714" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)" />
</svg>`.trim();
}

function toBase64(input: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(input).toString("base64");
  }
  return window.btoa(input);
}

export function getBlurDataURL(width = 32, height = 32): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}

export interface ResolvedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  aspectRatio: number;
}

/**
 * Central place to resolve a photo reference into next/image-ready
 * props. Swapping the image CDN later (ImageKit -> Cloudinary, etc.)
 * should only require changes in this file plus lib/wedding-photos.ts.
 */
export function resolveImage(photo: PhotoRef): ResolvedImage {
  return {
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
    blurDataURL: getBlurDataURL(),
    aspectRatio: photo.width / photo.height,
  };
}

export const RESPONSIVE_SIZES = {
  full: "100vw",
  half: "(max-width: 768px) 100vw, 50vw",
  third: "(max-width: 768px) 100vw, 33vw",
  quarter: "(max-width: 768px) 50vw, 25vw",
  thumbnail: "(max-width: 768px) 33vw, 200px",
} as const;
