# Replace with your wedding films

Place your video files here:

- `VIDEO_01.mp4` — "Our Story" (first full-screen film)
- `VIDEO_02.mp4` — "The Final Act" (second full-screen film)

## Supported sources

Edit `lib/videos.ts` to switch between:

### Self-hosted MP4 (default)
```ts
type: "mp4",
src: "/videos/VIDEO_01.mp4",
```

### YouTube unlisted
```ts
type: "youtube",
youtubeId: "YOUR_VIDEO_ID",
```

### Bunny CDN (future)
```ts
type: "bunny",
bunnyUrl: "https://your-bunny-stream-url.m3u8",
```

Recommended specs: H.264, 1080p or 4K, muted autoplay-friendly, under 50MB per clip for web.
