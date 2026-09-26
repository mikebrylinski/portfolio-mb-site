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
          background: "#020617",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 32 32">
          <g
            fill="none"
            stroke="#3B8CFF"
            strokeWidth="2.35"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M11.4 8.2 6.4 16l5 7.8" />
            <path d="M14.6 23.8 19.2 8.2" />
            <path d="M20.6 8.2 25.6 16l-5 7.8" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
