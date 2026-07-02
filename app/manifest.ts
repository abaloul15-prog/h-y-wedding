import type { MetadataRoute } from "next";
import { COUPLE } from "@/lib/data/couple";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COUPLE.fullName}, Private Wedding Archive`,
    short_name: COUPLE.monogram,
    description: "A private, invitation-only wedding archive.",
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#090909",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
