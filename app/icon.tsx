import { ImageResponse } from "next/og";

export const contentType = "image/png";

const SIZES = [16, 32, 48] as const;

export function generateImageMetadata() {
  return SIZES.map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType,
  }));
}

export default function Icon({ id }: { id: string }) {
  const px = Number(id) || 32;
  const showRing = px >= 28;
  const ringWidth = Math.max(1, Math.round(px * 0.032));
  const fontSize = Math.round(px * (showRing ? 0.3 : 0.42));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090909",
        }}
      >
        <div
          style={{
            width: showRing ? "80%" : "100%",
            height: showRing ? "80%" : "100%",
            borderRadius: "50%",
            border: showRing ? `${ringWidth}px solid #b4915c` : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize,
              fontWeight: 500,
              letterSpacing: showRing ? 0.5 : 0,
              color: "#f5f1ea",
            }}
          >
            H&Y
          </span>
        </div>
      </div>
    ),
    { width: px, height: px }
  );
}
