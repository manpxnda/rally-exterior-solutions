# Brand assets (official files)

These are Rally's supplied logo files, used directly by the site (no code
recreation). Only transparent padding was trimmed and the files were downscaled
for the web — the artwork itself is untouched.

| File | What it is | Used where |
| --- | --- | --- |
| `icon.png` | Sun-over-water icon (coral + teal, transparent) | favicons (`/icon.png`, `/apple-icon.png`, `/favicon.ico`), `BrandMark`, LocalBusiness schema `logo` |
| `logo-color.png` | "RALLY Exterior Solutions" wordmark, coral/teal | Header (light backgrounds), `/lp/*` landing-page header |
| `logo-white.png` | "RALLY Exterior Solutions" wordmark, white | Footer (`<Logo tone="light" />`), Open Graph share image |

Brand rule (Jason, 2026-09-11): only logos that read **Rally Exterior
Solutions** are used on the site. Do not recolor the artwork. (The separate
"Exterior Lighting" lockup exports were removed — they contained remnants of
the "Exterior Solutions" text.)

Source files (originals): `~/Desktop/Rally/Logos/` and `~/Downloads/` on
Jason's Mac (`rally logo Teal_Coral.png`, `rally logo full white-2(1).png`, icon `8A35C6CB-….png`).

Rendering lives in `src/components/layout/Logo.tsx` (`Logo`, `BrandMark`).

## Brand palette (wired into Tailwind)
| Color | Hex | Token |
| --- | --- | --- |
| Navy | `#173D59` | `ink` |
| Coral | `#EA6F61` | `gold` |
| Teal | `#39ABA8` | `sky` |
| Sand / cream | `#FAF0D7` | `cream` |
| White | `#FFFFFF` | — |
