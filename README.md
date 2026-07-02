# Hüseyin & Yousra · Private Wedding Experience

A cinematic digital memory experience built with Next.js 15, Framer Motion, Lenis, and ImageKit.

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

### Photos

Photo metadata lives in `lib/wedding-photos.ts` and is consumed through
`lib/data/photos.ts`. Add new ImageKit filenames there to update the archive.

### Videos

Edit `lib/data/videos.ts` with the final unlisted YouTube IDs. Provider-specific
playback is isolated in `lib/providers/video-provider.ts`.

## Architecture

```
app/           → Layout, page, auth route, icons, manifest, robots
components/    → PasswordGate, Hero, Story, Film, Gallery, Timeline, Lightboxes
hooks/         → useAuth, scroll locking, media queries
lib/data/      → couple, photos, story, timeline, videos
lib/providers/ → image and video provider adapters
```

## Privacy

- `robots.ts` disallows all crawlers
- `metadata.robots` set to noindex/nofollow
- Signed httpOnly session cookie

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis smooth scroll
