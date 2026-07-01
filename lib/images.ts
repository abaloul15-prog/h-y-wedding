import {
  COLLAGE_PHOTOS,
  GALLERY_PHOTOS,
  type WeddingPhoto,
} from "@/lib/wedding-photos";

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

function toImageAsset(photo: WeddingPhoto): ImageAsset {
  return {
    id: photo.id,
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  };
}

export function getCollageImages(): ImageAsset[] {
  return COLLAGE_PHOTOS.map(toImageAsset);
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
  images: ImageAsset[];
}

export function getAllGalleryImages(): ImageAsset[] {
  return GALLERY_PHOTOS.map(toImageAsset);
}

/** Builds editorial gallery blocks from wedding photos with varied layouts */
export function buildGalleryBlocks(): GalleryBlock[] {
  const images = getAllGalleryImages();
  const blocks: GalleryBlock[] = [];
  let cursor = 0;
  let blockIndex = 0;

  const patterns: GalleryLayout[] = [
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

  while (cursor < images.length) {
    const layout = patterns[blockIndex % patterns.length];
    let count = 1;

    switch (layout) {
      case "fullscreen":
        count = 1;
        break;
      case "diptych":
        count = 2;
        break;
      case "triptych":
        count = 3;
        break;
      case "collage":
        count = 4;
        break;
      case "editorial":
        count = 2;
        break;
      case "mosaic":
        count = 6;
        break;
    }

    if (cursor + count > images.length) {
      count = images.length - cursor;
    }

    blocks.push({
      id: `block-${String(blockIndex + 1).padStart(3, "0")}`,
      layout: count === 1 ? "fullscreen" : layout,
      images: images.slice(cursor, cursor + count),
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
