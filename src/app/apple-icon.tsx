import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
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
          background: "#050A0F",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#00D4FF",
            fontFamily: "sans-serif",
            letterSpacing: -3,
          }}
        >
          VY
        </span>
      </div>
    ),
    { ...size }
  );
}
