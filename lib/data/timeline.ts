import type { TimelineEvent } from "@/lib/types";
import { getPhotoByIndex } from "@/lib/data/photos";

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "arrival",
    date: "09:00",
    title: "The Morning Everything Changed",
    description:
      "Before the guests arrived and before the celebrations began, Hüseyin and Yousra shared the final quiet hours of two separate lives, standing on the edge of forever.",
    image: getPhotoByIndex(5),
  },
  {
    id: "preparation",
    date: "12:30",
    title: "Every Detail in Its Place",
    description:
      "The finishing touches. The anticipation. Every carefully chosen detail leading toward the moment everyone had been waiting for.",
    image: getPhotoByIndex(11),
  },
  {
    id: "ceremony",
    date: "16:00",
    title: "The Moment They Chose Forever",
    description:
      "Surrounded by family and friends, Hüseyin and Yousra exchanged vows that transformed two journeys into one shared future.",
    image: getPhotoByIndex(23),
  },
  {
    id: "golden-hour",
    date: "19:30",
    title: "The Portraits They'll Remember Forever",
    description:
      "As the evening light wrapped around them, moments became memories and photographs became timeless reminders of the beginning of forever.",
    image: getPhotoByIndex(41),
  },
  {
    id: "celebration",
    date: "21:00",
    title: "A Night Worth Waiting For",
    description:
      "The music grew louder, laughter filled every corner of the room, and everyone gathered to celebrate a love story years in the making.",
    image: getPhotoByIndex(53),
  },
];