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

/**
 * Structured video catalog. Replace `providerId` with the real
 * YouTube (unlisted) video ID once available — everything else
 * (player chrome, metadata, lightbox) is already wired up.
 *
 * To migrate away from YouTube later (Mux, Cloudflare Stream, Vimeo,
 * self-hosted), only lib/providers/video-provider.ts needs to change.
 */
export const VIDEOS: Video[] = [
  {
    id: "the-film",
    title: "Our Story",
    subtitle: "The Wedding Film",
    description:
      "The complete story of the sixteenth of June — from first light to the final dance, told as one continuous film.",
    date: "16 June 2026",
    duration: "8:42",
    location: "Morocco",
    category: "Feature Film",
    featured: true,
    poster: poster(0),
    provider: "youtube",
    providerId: "REPLACE_WITH_YOUTUBE_ID",
  },
  {
    id: "the-ceremony",
    title: "The Ceremony",
    subtitle: "Vows & Witnesses",
    description:
      "An intimate cut of the ceremony itself — the vows, the exchange, the quiet moments in between.",
    date: "16 June 2026",
    duration: "4:15",
    location: "Morocco",
    category: "Ceremony",
    poster: poster(23),
    provider: "youtube",
    providerId: "REPLACE_WITH_YOUTUBE_ID",
  },
  {
    id: "the-reception",
    title: "The Celebration",
    subtitle: "Reception & Dancing",
    description:
      "The final act — music, dancing, and the people who made the night unforgettable.",
    date: "16 June 2026",
    duration: "5:30",
    location: "Morocco",
    category: "Reception",
    poster: poster(53),
    provider: "youtube",
    providerId: "REPLACE_WITH_YOUTUBE_ID",
  },
];

export function getFeaturedVideo(): Video {
  return VIDEOS.find((video) => video.featured) ?? VIDEOS[0];
}

export function getVideoCollection(): Video[] {
  return VIDEOS;
}
