# Brand assets (official files)

These are Rally's supplied logo files, used directly by the site (no code
recreation). Only transparent padding was trimmed and the files were downscaled
for the web — the artwork itself is untouched.

| File | What it is | Used where |
| --- | --- | --- |
| `icon.png` | Sun-over-water icon (coral + teal, transparent) | favicons (`/icon.png`, `/apple-icon.png`, `/favicon.ico`), `BrandMark`, LocalBusiness schema `logo` |
| `logo-color.png` | "RALLY Exterior Solutions" wordmark, coral/teal | Header (light backgrounds), `/lp/*` landing-page header |
| `logo-white.png` | "RALLY Exterior Solutions" wordmark, white | Footer (`<Logo tone="light" />`), Open Graph share image |
| `logo-lighting-color.png` | "RALLY Exterior Lighting" lockup, coral/teal + teal descriptor | **Not used yet** — export contains remnants of "Exterior Solutions" above the descriptor; needs a clean re-export |
| `logo-lighting-white.png` | "RALLY Exterior Lighting" lockup, all white | **Not used yet** — same export artifact; wire in via `<Logo variant="lighting" />` once fixed |

Brand rule: when the lockup includes the words **Exterior Lighting**, those
words stay **white** on dark backgrounds — only the supplied white file is used
there. Do not recolor the artwork.

Source files (originals): `~/Desktop/Rally/Logos/` and `~/Downloads/` on
Jason's Mac (`Rally_Logo_*_Transparent.png`, `Rally_Exterior_Lighting_*_Transparent.png`,
`rally logo Teal_Coral.png`, `rally logo full white-2(1).png`, icon `8A35C6CB-….png`).

Rendering lives in `src/components/layout/Logo.tsx` (`Logo`, `BrandMark`).

## Brand palette (wired into Tailwind)
| Color | Hex | Token |
| --- | --- | --- |
| Navy | `#173D59` | `ink` |
| Coral | `#EA6F61` | `gold` |
| Teal | `#39ABA8` | `sky` |
| Sand / cream | `#FAF0D7` | `cream` |
| White | `#FFFFFF` | — |
