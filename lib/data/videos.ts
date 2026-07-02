import type { Video } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

function poster(index: number) {
  const photo = getPhotoByIndex(index);

  return {
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  };
}

export const VIDEOS: Video[] = [
  {
    id: "the-film",
    title: "The Beginning of Forever",
    subtitle: "The Official Wedding Film",
    description:
      "From the first quiet moments of the morning to the final dance of the evening, this film captures the complete story of a day that marked the beginning of forever.",
    date: "16 June 2026",
    duration: "8:42",
    location: "Morocco",
    category: "Feature Film",
    featured: true,
    poster: poster(0),
    provider: "google-drive",
    providerId: "1LMBL0iLVLsirhFFXT0j3bvQW1prKwOwS",
  },
  {
    id: "the-ceremony",
    title: "The Moment We Said Yes",
    subtitle: "The Ceremony",
    description:
      "Every vow, every glance, every promise. A timeless record of the moment two families witnessed the beginning of a new chapter.",
    date: "16 June 2026",
    duration: "4:15",
    location: "Morocco",
    category: "Ceremony",
    poster: poster(23),
    provider: "google-drive",
    providerId: "1U8ln6U4WqKuNXDTYxoRe_5nPuD8G25Fw",
  },
  {
    id: "the-reception",
    title: "One Night. One Family. One Beginning.",
    subtitle: "The Celebration",
    description:
      "An evening filled with joy, music, laughter, and unforgettable memories shared with the people who made this celebration complete.",
    date: "16 June 2026",
    duration: "5:30",
    location: "Morocco",
    category: "Reception",
    poster: poster(53),
    provider: "google-drive",
    providerId: "1lnuzD2qsm8to5cq-VPHYD76nqKyj2Jz4",
  },
];

export function getFeaturedVideo(): Video {
  return VIDEOS.find((video) => video.featured) ?? VIDEOS[0];
}

export function getVideoCollection(): Video[] {
  return VIDEOS;
}