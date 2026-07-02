# Hüseyin & Yousra · Private Wedding Experience

A cinematic digital memory experience built with Next.js 15, Framer Motion, Lenis, and GSAP.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Password:** `16062026`

## Deploy to Vercel

```bash
npx vercel
```

Or connect the repository in the [Vercel dashboard](https://vercel.com). The project is configured for zero-config deployment.

## Replace media

### Photos (200 gallery + 40 collage)

Drop your images into:

- `public/images/gallery/001.jpg` … `200.jpg`
- `public/images/collage/01.jpg` … `40.jpg`

Then update file extensions in `lib/images.ts` from `.svg` to `.jpg`.

Regenerate SVG placeholders anytime:

```bash
npm run generate:placeholders
```

### Videos

Add `VIDEO_01.mp4` and `VIDEO_02.mp4` to `public/videos/`, or edit `lib/videos.ts` for YouTube/Bunny CDN. See `public/videos/README.md`.

## Architecture

```
app/           → Layout, page, globals, robots (noindex)
components/    → PasswordGate, HeroFilm, FullscreenVideo, MemoryCollage,
                 EditorialGallery, QuoteSection, FooterExperience
hooks/         → useAuth, useScrollProgress, useParallax, useInView
lib/           → constants, colors, images, videos
public/images/ → 240 placeholder SVGs (replace with real photos)
public/videos/ → VIDEO_01.mp4, VIDEO_02.mp4
```

## Privacy

- `robots.ts` disallows all crawlers
- `metadata.robots` set to noindex/nofollow
- Password gate via session storage

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis smooth scroll
- GSAP ScrollTrigger
