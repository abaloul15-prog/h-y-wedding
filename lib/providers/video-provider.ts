import type { Video } from "@/lib/types";

export const PLACEHOLDER_ID = "REPLACE_WITH_YOUTUBE_ID";

export function isPlaybackConfigured(video: Video): boolean {
  return Boolean(video.providerId) && video.providerId !== PLACEHOLDER_ID;
}

export interface PlaybackSource {
  kind: "iframe" | "video";
  src: string;
  allow?: string;
}

/**
 * Resolves a Video record into an actual playback source. This is the
 * single seam to touch when migrating from YouTube Unlisted to Mux,
 * Cloudflare Stream, Vimeo, or a self-hosted file, every player
 * component consumes `resolvePlaybackSource`, never the raw provider id.
 */
export function resolvePlaybackSource(video: Video): PlaybackSource | null {
  if (!isPlaybackConfigured(video)) return null;

  switch (video.provider) {
    case "youtube":
      return {
        kind: "iframe",
        src: `https://www.youtube-nocookie.com/embed/${video.providerId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&controls=1`,
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen",
      };
    case "vimeo":
      return {
        kind: "iframe",
        src: `https://player.vimeo.com/video/${video.providerId}?autoplay=1&title=0&byline=0&portrait=0`,
        allow: "autoplay; fullscreen; picture-in-picture",
      };
    case "mux":
      return {
        kind: "video",
        src: `https://stream.mux.com/${video.providerId}.m3u8`,
      };
    case "mp4":
      return {
        kind: "video",
        src: video.providerId,
      };
    default:
      return null;
  }
}
