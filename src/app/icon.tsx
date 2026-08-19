import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: "#00D4FF",
            fontFamily: "sans-serif",
            letterSpacing: -1,
          }}
        >
          VY
        </span>
      </div>
    ),
    { ...size }
  );
}
