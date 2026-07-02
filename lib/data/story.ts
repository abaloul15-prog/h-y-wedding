import type { StoryChapter } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "the-beginning",
    order: 1,
    eyebrow: "Act I",
    title: "Where Every Great Story Begins",
    paragraphs: [
      "Every unforgettable story has a beginning. Theirs didn't arrive with grand gestures or perfect timing—it arrived quietly, one conversation at a time, until two separate lives became impossible to imagine apart.",
      "What started as a simple connection grew into unwavering friendship, lasting trust, and a love that would shape everything that followed.",
    ],
    image: getPhotoByIndex(2),
  },
  {
    id: "the-promise",
    order: 2,
    eyebrow: "Act II",
    title: "The Promise Before Everyone Else",
    paragraphs: [
      "Long before the flowers were arranged, the music rehearsed, and the invitations delivered, there was a promise only they truly understood.",
      "It was the decision to choose one another through every season of life—a quiet promise that would one day bring two families together beneath the same celebration.",
    ],
    image: getPhotoByIndex(18),
  },
  {
    id: "the-day",
    order: 3,
    eyebrow: "Act III",
    title: "The Day Their Forever Began",
    paragraphs: [
      "On the sixteenth of June, everything they had built together became visible. Every smile, every embrace, every vow became part of a story witnessed by the people who mattered most.",
      "This is more than a wedding album. It is the official record of a day that will be remembered, revisited, and shared for generations to come.",
    ],
    image: getPhotoByIndex(34),
  },
];