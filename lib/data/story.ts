import type { StoryChapter } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "the-beginning",
    order: 1,
    eyebrow: "Act I",
    title: "Where Every Great Story Begins",
    paragraphs: [
      "Their story didn't begin with grand gestures or perfect timing. It began with quiet conversations, until two lives became impossible to imagine apart.",
      "A simple connection grew into deep friendship, lasting trust, and a love that shaped everything to come.",
    ],
    image: getPhotoByIndex(2),
  },
  {
    id: "the-promise",
    order: 2,
    eyebrow: "Act II",
    title: "The Promise Before Everyone Else",
    paragraphs: [
      "Long before the flowers, the music, and the invitations, there was a promise only they truly understood.",
      "It was the decision to choose each other through every season, a quiet promise that would one day bring two families together in celebration.",
    ],
    image: getPhotoByIndex(18),
  },
  {
    id: "the-day",
    order: 3,
    eyebrow: "Act III",
    title: "The Day Their Forever Began",
    paragraphs: [
      "On the sixteenth of June, everything they had built became visible. Every smile, embrace, and vow became part of a story witnessed by the people who mattered most.",
      "This is more than a wedding album. It is the official record of a day that will be remembered, revisited, and shared for generations.",
    ],
    image: getPhotoByIndex(34),
  },
];