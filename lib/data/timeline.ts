import type { TimelineEvent } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "arrival",
    date: "09:00",
    title: "First light",
    description:
      "The morning began quietly — the last few hours of two people preparing to become one household.",
    image: getPhotoByIndex(5),
  },
  {
    id: "preparation",
    date: "12:30",
    title: "The preparation",
    description:
      "Details, fittings, final touches — the quiet choreography before a day of witnesses.",
    image: getPhotoByIndex(11),
  },
  {
    id: "ceremony",
    date: "16:00",
    title: "The ceremony",
    description:
      "Vows exchanged in front of those who mattered most. A single hour that will be revisited for a lifetime.",
    image: getPhotoByIndex(23),
  },
  {
    id: "golden-hour",
    date: "19:30",
    title: "Golden hour",
    description:
      "The light that photographers wait all year for — and the portraits that became the heart of this archive.",
    image: getPhotoByIndex(41),
  },
  {
    id: "celebration",
    date: "21:00",
    title: "The celebration",
    description:
      "Music, laughter, and a room full of people who had waited a long time for this exact night.",
    image: getPhotoByIndex(53),
  },
];
