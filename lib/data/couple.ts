import type { Couple } from "@/lib/types";

export const COUPLE: Couple = {
  partner1: "Hüseyin",
  partner2: "Yousra",
  fullName: "Hüseyin & Yousra",
  weddingDate: "16 June 2026",
  weddingDateISO: "2026-06-16",
  monogram: "H&Y",
  location: "Morocco",
};

export const SITE = {
  title: `${COUPLE.fullName} · Official Wedding Archive`,
  description:
    "Created to preserve one extraordinary love story, one unforgettable celebration, and the beginning of a lifetime together.",
} as const;

/**
 * Access code for the private gate. In production, prefer setting
 * WEDDING_ACCESS_CODE in the environment so the value never lives in
 * source control.
 */
export const ACCESS_CODE = process.env.WEDDING_ACCESS_CODE ?? "16062026";