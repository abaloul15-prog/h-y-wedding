export type VideoSourceType = "mp4" | "youtube" | "bunny";

export interface VideoConfig {
  id: string;
  label: string;
  type: VideoSourceType;
  /** Self-hosted MP4 path under /public */
  src?: string;
  /** YouTube unlisted video ID */
  youtubeId?: string;
  /** Future Bunny CDN stream URL */
  bunnyUrl?: string;
  poster?: string;
}

export const videos: Record<"VIDEO_01" | "VIDEO_02", VideoConfig> = {
  VIDEO_01: {
    id: "VIDEO_01",
    label: "Our Story",
    type: "mp4",
    src: "/videos/VIDEO_01.mp4",
    poster: "/images/gallery/001.svg",
  },
  VIDEO_02: {
    id: "VIDEO_02",
    label: "The Final Act",
    type: "mp4",
    src: "/videos/VIDEO_02.mp4",
    poster: "/images/gallery/050.svg",
  },
};

export function getVideoSrc(config: VideoConfig): string | null {
  switch (config.type) {
    case "mp4":
      return config.src ?? null;
    case "youtube":
      return config.youtubeId
        ? `https://www.youtube.com/embed/${config.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${config.youtubeId}&modestbranding=1&rel=0`
        : null;
    case "bunny":
      return config.bunnyUrl ?? null;
    default:
      return null;
  }
}
