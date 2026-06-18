# CLAUDE.md — Rally Exterior Solutions

Context for AI coding sessions on this repo. (User-facing setup docs are in `README.md`; local-SEO playbook in `docs/LOCAL-SEO.md`.)
**This repo is public — never commit secrets. All credential *values* live in Vercel env vars.**

## What this is
Conversion-focused marketing site for **Rally Exterior Solutions** — premium exterior lighting + cleaning in the Ohio Valley / Wheeling, WV. Owner: **Jason Robb**. Optimize for **booked estimates** (CRO) and **local SEO**.

- **Live:** https://rallyexteriorsolutions.com (Vercel; apex `A → 76.76.21.21`, www → root, Let's Encrypt SSL)
- **Repo:** `manpxnda/rally-exterior-solutions` (`main` = production; `legacy-html-site` = old static site)
- **Vercel:** project `rally-exterior-solutions`, scope `manpxndas-projects`
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v3 · `sharp` for images

## Architecture — where things live
- `src/lib/site.ts` — **single source of truth** for business info (NAP, hours, stats, offer). Phone (740) 208-8632, email info@rallyexteriorsolutions.com.
- `src/data/*.ts` — content that drives the site:
  - `services.ts` — 7 services → auto-generates `/services/[slug]`, nav, schema. (Removed "Exterior Soft Washing".)
  - `gallery.ts` — `beforeAfters` (10 verified pairs) + `showcase` (12 lighting). `testimonials.ts`, `faqs.ts`, `content.ts`.
  - `locations.ts` — **51** city landing pages (local SEO): the original 12 + every OH/WV town within ~30 mi of 43963 (Tiltonsville HQ), verified by geocoding. Keep `intro`/`context` UNIQUE per city. `getLocationByCity()` links "nearby" mentions to their own pages (internal linking on `/locations/[slug]`).
  - `guides.ts` — data-driven `/guides/[slug]` content (SEO + lead capture). First: `house-washing-cost` (pricing guide w/ price table + FAQ). Copy a block to add one; pricing ranges are honest regional estimates, not quotes.
- `src/lib/schema.ts` — JSON-LD: localBusiness/service/faq/breadcrumb/**locationSchema** (areaServed per city)/**articleSchema** (guides). `nav.ts`, `analytics.ts`.
- `src/app/` — routes: `/`, `/services` + `/services/[slug]`, `/locations` + `/locations/[slug]`, `/guides` + `/guides/[slug]`, `/gallery`, `/about`, `/contact`, `/thank-you`, `/privacy`, `/dashboard` (private), **`/lp/[slug]`** (paid-traffic landing pages — distraction-free, `noindex`, single CTA), `/api/lead`. Plus `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`.
- **`HideOnDashboard`** hides global nav chrome on **`/dashboard` AND `/lp`** (`BARE_ROUTES`). `/lp/[slug]` renders its own minimal header/footer (use `<div>` not landmark tags — it's nested in root `<main>`). `TrackedCall` = style-able tracked phone link for custom CTAs.
- `src/components/` — `layout/`, `sections/` (homepage blocks), `ui/` (Button, Section, Icon, MediaFrame, **BeforeAfter** slider…), `analytics/`.
- `src/middleware.ts` — Basic Auth gate for `/dashboard`.
- Favicons: `public/favicon.ico` + `public/icon.png` + `public/apple-icon.png` + `public/icon.svg`, declared via `metadata.icons` in `layout.tsx` (NOT app/icon convention — that conflicted).
- Real photos: `public/images/gallery/` (before/after pairs), `/lighting/` (12), `/services/` (spliced before|after hero composites), `/team/rally-driveway.png`.

## How to edit content
Business details → `src/lib/site.ts`. Services/reviews/faqs/gallery/locations → `src/data/*.ts`. Pages/nav/schema/sitemap auto-generate. Brand tokens in `tailwind.config.ts`: `ink`=navy `#173D59`, `gold`=coral `#EA6F61`, `sky`=teal `#39ABA8`, `cream`=sand `#FAF0D7`. Display font Roboto Slab.

## Deploy / verify rhythm
- **Push to `main` → Vercel auto-deploys** (~30–45s). Custom domains follow git production deploys.
- After changing a `NEXT_PUBLIC_*` env var, **rebuild** via empty commit + push (those are inlined at build).
- Always `npm run build` + `npm run lint` before pushing.
- Verify live with a background poll: `for i in $(seq 1 40); do curl -s "$URL?cb=$RANDOM" | grep -q MARKER && break; sleep 6; done` (run_in_background). Raw Vercel deploy URLs are 401 (deployment protection); assigned domains bypass.

## Gotchas (learned the hard way)
- **iPhone photos**: `sips` strips EXIF orientation → sideways. Use **`sharp`** `.rotate()` to auto-orient + resize/compress (one-off scripts, deleted after). Before/after pairs must share orientation; sliders are **portrait 3:4** (`BeforeAfter`).
- **Always visually verify before/after order** — source filenames aren't 100% reliable (one concrete pair was mislabeled/swapped).
- **Service hero banner** = centered 4:3 (`aspect="photo"`). Cleaning services with real pairs use **spliced before|after composites** in `public/images/services/hero-*.jpg` (labeled divider). Paver-sealing + commercial keep stock (no real pairs).
- More source photos available in `~/Desktop/Rally Photos/`.

## Integrations (env var NAMES only — values in Vercel)
- **Leads:** 3 paths — (1) `LeadForm` `POST /api/lead` → Resend email to **info@rallyexteriorsolutions.com** from `leads@` (domain verified; env `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`; Resend account = rallyohv@gmail.com); (2) **call** (`tel:` via `CallButton`/`CallLink`, `trackCallClick`); (3) **text** (`sms:` via `TextButton`/`TextLink` + `site.smsHref` pre-filled, `trackTextClick`). Mobile sticky bar = Call/Text/Free-Quote.
- **Analytics (live):** GA4 (`NEXT_PUBLIC_GA4_ID`), Clarity (`NEXT_PUBLIC_CLARITY_ID`), Vercel Analytics + Speed Insights. Lead form fires `generate_lead` + `call_click`. **Search Console verified + sitemap submitted (Success; ~22→now ~83 pages after the 39-town service-area expansion).**
- **Owner dashboard:** `/dashboard` — Basic Auth (`DASHBOARD_USER`/`DASHBOARD_PASSWORD`), `HideOnDashboard` hides marketing chrome, embeds Looker Studio when `NEXT_PUBLIC_LOOKER_EMBED_URL` set.
- **Redirects (`next.config.mjs`):** old SiteGround paths → current pages; **host-based 301 for old domain `rallyohv.com` → rallyexteriorsolutions.com (preserves path)**. rallyohv.com is added to the Vercel project.

## Open items (mostly user-side)
- **rallyohv.com** (old GoDaddy domain, expires 2026-07-12): redirect code + Vercel domain DONE. PENDING user: swap GoDaddy forwarding for DNS (`A @ 76.76.21.21`, `CNAME www → cname.vercel-dns.com`) + renew. (GoDaddy forwarding only redirects root; subpaths 404.)
- **Google Business Profile** optimization (biggest local-ranking lever) — see `docs/LOCAL-SEO.md`. User-driven.
- **Looker Studio** report is blank — user needs to add charts (template) + resend embed URL.
- Request Indexing on key pages in Search Console; confirm review/project stats; real address/hours.
- **Ads (in progress):** user chose **LSA first** (cleaning) → playbook `docs/LOCAL-SERVICES-ADS.md`; **Search Ads for permanent lighting** → `docs/SEARCH-ADS-PERMANENT-LIGHTING.md` (LSA has no lighting category). Landing page `/lp/permanent-lighting` built. Conversion tracking is pre-wired — user sets `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` in Vercel + redeploy; lead form auto-fires the conversion. Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) when ads start.
- Future: more city pages + guides (copy a block in the data files).

## Working preference
After any editing session, run a quick **sales-forward + SEO-forward** pass and implement safe wins before wrapping up.

## Commands
```
npm run dev        # localhost:3000
npm run build      # before pushing
npm run lint
npm run typecheck
```
