import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const COLORS = {
  bg: "#F7F3ED",
  accent: "#C9B896",
  text: "#9FAFB8",
  alt: "#E8DCC8",
};

function svg(label, width, height, variant = 0) {
  const accents = [COLORS.accent, COLORS.alt, "#D4C4A8", "#9FAFB8"];
  const accent = accents[variant % accents.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${COLORS.bg}"/>
      <stop offset="50%" style="stop-color:${accent};stop-opacity:0.25"/>
      <stop offset="100%" style="stop-color:${COLORS.bg}"/>
    </linearGradient>
  </defs>
  <rect fill="url(#g)" width="${width}" height="${height}"/>
  <rect fill="${accent}" fill-opacity="0.08" x="${width * 0.1}" y="${height * 0.15}" width="${width * 0.3}" height="${height * 0.5}"/>
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="middle" fill="${COLORS.text}" font-family="Georgia, serif" font-size="${Math.min(width, height) * 0.04}" letter-spacing="0.15em">${label}</text>
</svg>`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// Collage placeholders (40)
const collageDir = path.join(root, "public/images/collage");
ensureDir(collageDir);
for (let i = 1; i <= 40; i++) {
  const num = String(i).padStart(2, "0");
  const aspects = [
    [1200, 1600],
    [1600, 1200],
    [1400, 1400],
  ];
  const [w, h] = aspects[i % aspects.length];
  fs.writeFileSync(
    path.join(collageDir, `${num}.svg`),
    svg(`C${num}`, w, h, i)
  );
}

// Gallery placeholders (200)
const galleryDir = path.join(root, "public/images/gallery");
ensureDir(galleryDir);
for (let i = 1; i <= 200; i++) {
  const num = String(i).padStart(3, "0");
  const aspects = [
    [1600, 2400],
    [2400, 1600],
    [1800, 1800],
    [1200, 1800],
    [2000, 1333],
  ];
  const [w, h] = aspects[i % aspects.length];
  fs.writeFileSync(
    path.join(galleryDir, `${num}.svg`),
    svg(num, w, h, i)
  );
}

console.log("Generated 40 collage + 200 gallery placeholder SVGs.");
