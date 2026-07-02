import type { Video } from "@/lib/types";

export const PLACEHOLDER_ID = "REPLACE_WITH_VIDEO_ID";

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
 * single seam to touch when migrating providers (Google Drive, Mux,
 * Cloudflare Stream, Vimeo, a self-hosted file, and so on), every
 * player component consumes `resolvePlaybackSource`, never the raw
 * provider id.
 *
 * Google Drive notes: Drive's `/preview` embed has no documented,
 * reliable autoplay or forced-quality parameter (the historical
 * `?autoplay=1`/`?start=1` tricks are unofficial and broken in modern
 * browsers). We deliberately do not append them here. Drive serves
 * its own adaptive quality and shows its native play control inside
 * the iframe once mounted, which is the highest-quality, non-hacky
 * behavior it publicly supports.
 */
export function resolvePlaybackSource(video: Video): PlaybackSource | null {
  if (!isPlaybackConfigured(video)) return null;

  switch (video.provider) {
    case "google-drive":
      return {
        kind: "iframe",
        src: `https://drive.google.com/file/d/${video.providerId}/preview`,
        allow: "fullscreen",
      };
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
