export interface Couple {
  partner1: string;
  partner2: string;
  fullName: string;
  weddingDate: string;
  weddingDateISO: string;
  monogram: string;
  location: string;
}

export interface StoryChapter {
  id: string;
  order: number;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: PhotoRef;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: PhotoRef;
}

/** Lightweight image reference used inside other data records */
export interface PhotoRef {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Canonical photo record. Every media item the couple wants to show
 * should be representable with this shape, regardless of which CDN
 * ultimately serves the binary (see lib/providers/image-provider.ts).
 */
export interface Photo extends PhotoRef {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  date?: string;
  location?: string;
  tags?: string[];
  favorite?: boolean;
  featured?: boolean;
  category?: PhotoCategory;
}

export type PhotoCategory =
  | "ceremony"
  | "reception"
  | "portraits"
  | "details"
  | "candid"
  | "family";

export type VideoProviderType =
  | "google-drive"
  | "youtube"
  | "vimeo"
  | "mux"
  | "mp4";

/**
 * Canonical video record. The `provider` + `providerId`/`src` pair is
 * resolved through lib/providers/video-provider.ts, so swapping the
 * hosting service later only requires touching that one adapter.
 */
export interface Video {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  category: string;
  featured?: boolean;
  poster: PhotoRef;
  provider: VideoProviderType;
  providerId: string;
}
