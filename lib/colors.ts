export const colors = {
  ivory: "#F7F3ED",
  ivoryWarm: "#FAF7F2",
  champagne: "#C9B896",
  champagneLight: "#D4C4A8",
  silverBlue: "#9FAFB8",
  silverBlueDeep: "#7A8B96",
  candlelight: "#E8DCC8",
  candlelightSoft: "#F5EDE0",
  charcoal: "#2A2826",
  charcoalSoft: "#3D3A37",
} as const;

export type ColorKey = keyof typeof colors;
