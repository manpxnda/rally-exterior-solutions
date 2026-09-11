import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — Permanent, Christmas & Landscape Lighting in the Ohio Valley`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social share card. Uses the OFFICIAL white wordmark from
// /public/brand (not a code recreation).
export default async function OgImage() {
  // Read the official lockup from /public at generation time. Falls back to
  // the text wordmark if the file can't be read, so the route never 500s.
  let logoSrc = "";
  try {
    const buf = await readFile(
      path.join(process.cwd(), "public", "brand", "logo-white.png")
    );
    logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    logoSrc = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0F2A3F 0%, #173D59 60%, #1C415C 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt="" width={400} height={140} style={{ objectFit: "contain" }} />
        ) : (
          <div style={{ color: "white", fontSize: 36, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
            Rally Exterior Solutions
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              color: "white",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Your home changes after dark.
          </div>
          <div style={{ color: "#6CC2BE", fontSize: 30 }}>
            Permanent · Christmas · Landscape lighting
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#EA6F61",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Designed, installed & supported by Rally · Wheeling, WV & the Ohio Valley
        </div>
      </div>
    ),
    { ...size }
  );
}
