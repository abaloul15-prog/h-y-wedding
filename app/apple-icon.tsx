import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            width: "74%",
            height: "74%",
            borderRadius: "50%",
            border: "3px solid #b4915c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 500,
              letterSpacing: 2,
              color: "#f5f1ea",
            }}
          >
            H&Y
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
