import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — Exterior Lighting & Cleaning in the Ohio Valley`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social share card, generated at build/request time (no asset needed).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0B1A2B 0%, #16273D 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #E9B85C, #C9892A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            ☀
          </div>
          <div
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            Rally Exterior Solutions
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "white",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Brighter Homes. Cleaner Properties. Zero Hassle.
          </div>
          <div style={{ color: "#9DB0C6", fontSize: 30 }}>
            Permanent lighting · Holiday lighting · Exterior cleaning
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E0A23B",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Serving the Ohio Valley & Wheeling, WV · Free Estimates
        </div>
      </div>
    ),
    { ...size }
  );
}
