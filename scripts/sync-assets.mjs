import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsRoot = path.join(root, "assets");

const HERO_CINEMATIC_IDS = [
  "IMG_001",
  "IMG_019",
  "IMG_030",
  "IMG_048",
  "IMG_059",
  "IMG_077",
  "IMG_088",
  "IMG_106",
  "IMG_117",
  "IMG_135",
  "IMG_146",
  "IMG_164",
  "IMG_175",
  "IMG_193",
];

function walkImages(dir, acc = new Map()) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkImages(full, acc);
      continue;
    }
    if (!/\.(jpe?g)$/i.test(entry.name)) continue;
    const key = entry.name.toLowerCase();
    if (!acc.has(key)) acc.set(key, full);
  }
  return acc;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function main() {
  const imageMap = new Map();
  for (const folder of ["images", "Images"]) {
    const base = path.join(assetsRoot, folder);
    walkImages(base, imageMap);
  }

  const sorted = [...imageMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, fullPath], index) => {
      const id = `IMG_${String(index + 1).padStart(3, "0")}`;
      return { id, source: fullPath, filename: path.basename(fullPath) };
    });

  const galleryDir = path.join(root, "public/images/gallery");
  const collageDir = path.join(root, "public/images/collage");
  const heroDir = path.join(root, "public/videos/hero");
  const videosDir = path.join(root, "public/videos");

  ensureDir(galleryDir);
  ensureDir(collageDir);
  ensureDir(heroDir);
  ensureDir(videosDir);

  const manifest = {
    generatedAt: new Date().toISOString(),
    totalImages: sorted.length,
    heroCinematicIds: HERO_CINEMATIC_IDS,
    images: sorted.map(({ id, source, filename }) => {
      const publicPath = `/images/gallery/${id}.jpeg`;
      copyFile(source, path.join(root, "public", publicPath.replace(/^\//, "")));
      return { id, src: publicPath, source, filename };
    }),
    collageIds: [],
    galleryIds: sorted.map((item) => item.id),
  };

  const collageItems = sorted.slice(0, Math.min(40, sorted.length));
  manifest.collageIds = collageItems.map(({ id }) => id);
  collageItems.forEach(({ id, source }, index) => {
    const num = String(index + 1).padStart(2, "0");
    copyFile(source, path.join(collageDir, `${num}.jpeg`));
  });

  const film01 = path.join(assetsRoot, "videos/film01.mov");
  const film02 = path.join(assetsRoot, "videos/film02.mov");
  if (fs.existsSync(film01)) copyFile(film01, path.join(videosDir, "film01.mov"));
  if (fs.existsSync(film02)) copyFile(film02, path.join(videosDir, "film02.mov"));

  fs.writeFileSync(
    path.join(root, "lib/media-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`Synced ${sorted.length} unique images`);
  console.log(`Collage: ${collageItems.length} images`);
  console.log(`Videos: film01.mov, film02.mov`);
  console.log(`Hero cinematics pending for: ${HERO_CINEMATIC_IDS.join(", ")}`);
}

main();
