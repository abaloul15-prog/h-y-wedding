import type { StoryChapter } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "the-beginning",
    order: 1,
    eyebrow: "Chapter One",
    title: "Where it began",
    paragraphs: [
      "Some stories start with a single conversation that never really ends.",
      "Theirs began quietly — unhurried, unannounced — and grew into something neither of them saw coming, yet both somehow always knew.",
    ],
    image: getPhotoByIndex(2),
  },
  {
    id: "the-promise",
    order: 2,
    eyebrow: "Chapter Two",
    title: "A promise, made privately",
    paragraphs: [
      "Long before the guests, the flowers, the music — there was a promise made in stillness.",
      "Two families, two histories, one decision: to build a life worth telling.",
    ],
    image: getPhotoByIndex(18),
  },
  {
    id: "the-day",
    order: 3,
    eyebrow: "Chapter Three",
    title: "The sixteenth of June",
    paragraphs: [
      "On this day, everything they had quietly built became visible — witnessed, celebrated, remembered.",
      "What follows is not a wedding album. It is the archive of a single, unrepeatable day.",
    ],
    image: getPhotoByIndex(34),
  },
];
