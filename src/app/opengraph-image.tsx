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
          background: "linear-gradient(135deg, #112F45 0%, #173D59 60%, #1C415C 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* sun-over-water mark */}
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 999,
              background: "#FAF0D7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: "#EA6F61",
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
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
              maxWidth: 920,
            }}
          >
            Brighter Homes. Cleaner Properties. Zero Hassle.
          </div>
          <div style={{ color: "#6CC2BE", fontSize: 30 }}>
            Permanent lighting · Holiday lighting · Exterior cleaning
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#EA6F61",
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
