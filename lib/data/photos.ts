import { WEDDING_PHOTOS } from "@/lib/wedding-photos";
import type { Photo, PhotoCategory } from "@/lib/types";

const CATEGORY_CYCLE: PhotoCategory[] = [
  "ceremony",
  "portraits",
  "candid",
  "details",
  "reception",
  "family",
];

const FEATURED_INDICES = new Set([0, 7, 15, 24, 33, 42, 51, 58]);
const FAVORITE_INDICES = new Set([2, 9, 18, 27, 36, 45, 54]);

/**
 * The full, structured photo collection. Built once from the raw
 * ImageKit catalog so every consumer (editorial showcase, collection
 * grid, lightbox) shares identical ids, ordering, and metadata.
 */
export const PHOTOS: Photo[] = WEDDING_PHOTOS.map((photo, index) => ({
  id: photo.id,
  src: photo.src,
  alt: photo.alt,
  width: photo.width,
  height: photo.height,
  category: CATEGORY_CYCLE[index % CATEGORY_CYCLE.length],
  featured: FEATURED_INDICES.has(index),
  favorite: FAVORITE_INDICES.has(index),
}));

export function getAllPhotos(): Photo[] {
  return PHOTOS;
}

export function getPhotoByIndex(index: number): Photo {
  return PHOTOS[index % PHOTOS.length];
}

export function getFeaturedPhotos(): Photo[] {
  return PHOTOS.filter((photo) => photo.featured);
}

export type GalleryLayout =
  | "fullscreen"
  | "diptych"
  | "triptych"
  | "collage"
  | "editorial"
  | "mosaic";

export interface GalleryBlock {
  id: string;
  layout: GalleryLayout;
  photos: Photo[];
}

const LAYOUT_PATTERN: GalleryLayout[] = [
  "fullscreen",
  "editorial",
  "diptych",
  "mosaic",
  "triptych",
  "collage",
  "fullscreen",
  "editorial",
  "diptych",
  "mosaic",
];

const LAYOUT_SIZE: Record<GalleryLayout, number> = {
  fullscreen: 1,
  diptych: 2,
  triptych: 3,
  editorial: 2,
  collage: 4,
  mosaic: 6,
};

/** Splits the full photo collection into varied editorial layout blocks. */
export function buildGalleryBlocks(photos: Photo[] = PHOTOS): GalleryBlock[] {
  const blocks: GalleryBlock[] = [];
  let cursor = 0;
  let blockIndex = 0;

  while (cursor < photos.length) {
    const layout = LAYOUT_PATTERN[blockIndex % LAYOUT_PATTERN.length];
    let count = LAYOUT_SIZE[layout];

    if (cursor + count > photos.length) {
      count = photos.length - cursor;
    }

    blocks.push({
      id: `block-${String(blockIndex + 1).padStart(3, "0")}`,
      layout: count === 1 ? "fullscreen" : layout,
      photos: photos.slice(cursor, cursor + count),
    });

    cursor += count;
    blockIndex++;
  }

  return blocks;
}

export const COLLAGE_LAYOUT_CLASSES = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-3",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-3 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-3",
  "col-span-1 row-span-2",
] as const;
