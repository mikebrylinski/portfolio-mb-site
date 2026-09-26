import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "MIKEBWEB.dev — Michael Brylinski, Senior Full-Stack Developer";

export function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#020617",
          padding: "72px 80px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          <span
            style={{
              color: "#3B8CFF",
              marginRight: 18,
              fontFamily: "monospace",
            }}
          >
            {"</>"}
          </span>
          <span>MIKEBWEB</span>
          <span style={{ color: "#3B8CFF" }}>.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#3B8CFF",
            }}
          >
            Michael Brylinski
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
            }}
          >
            Senior Full-Stack Developer
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9cb6d4" }}>
            React · Next.js · Node.js · TypeScript · AWS · AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c8dff7",
          }}
        >
          Remote · Full-Time · mikebweb.dev
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
