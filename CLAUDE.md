# CLAUDE.md — Rally Exterior Solutions

Context for AI coding sessions on this repo. (User-facing setup docs are in `README.md`; local-SEO playbook in `docs/LOCAL-SEO.md`.)
**This repo is public — never commit secrets. All credential *values* live in Vercel env vars.**

## What this is
Conversion-focused marketing site for **Rally Exterior Solutions** — premium exterior lighting + cleaning in the Ohio Valley / Wheeling, WV. Owner: **Jason Robb**. Optimize for **booked estimates** (CRO) and **local SEO**.

**2026-09 repositioning (merged to `main` 2026-09-11):** the homepage, nav, and footer are **exterior-lighting first** (Permanent + Christmas primary, Landscape secondary). Legacy cleaning services keep every page/URL/SEO and live under the understated **"Other Services"** nav dropdown + footer column. Company name stays *Rally Exterior Solutions*. Two lead journeys: `/design-consultation` (permanent; `LeadForm variant="permanent"`) and `/christmas-quote` (Christmas; `variant="christmas"`, optional front-of-home photo → emailed attachment). `/contact` routes to both and keeps the generic form. Homepage sections live in `src/components/home/`. Official logo files in `public/brand/` (only "Rally Exterior Solutions" wordmarks are used — Jason's rule). Social proof rule: only lighting reviews sitewide (`lightingTestimonials`); cleaning reviews appear only on their own service pages and grouped below on `/reviews`.

- **Live:** https://rallyexteriorsolutions.com (Vercel; apex `A → 76.76.21.21`, www → root, Let's Encrypt SSL)
- **Repo:** `manpxnda/rally-exterior-solutions` (`main` = production; `legacy-html-site` = old static site)
- **Vercel:** project `rally-exterior-solutions`, scope `manpxndas-projects`
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v3 · `sharp` for images

## Architecture — where things live
- `src/lib/site.ts` — **single source of truth** for business info (NAP, hours, stats, offer). Phone (740) 208-8632, email info@rallyexteriorsolutions.com. `site.description` is lighting-first (feeds schema/OG/manifest).
- `src/lib/nav.ts` — `mainNav` (lighting links + `muted` "Other Services" dropdown) and `footerNav` (`lighting` / `otherServices` / `company`).
- `src/data/*.ts` — content that drives the site:
  - `services.ts` — **9 services** (3 lighting incl. `landscape-lighting`, 6 cleaning) → auto-generates `/services/[slug]`, nav, schema, `/lp/[slug]`. The homepage no longer renders the service grid. (Removed "Exterior Soft Washing"; added **"Pressure & Power Washing"** as the umbrella page owning the head terms the public searches.)
  - `gallery.ts` — `beforeAfters` (10 verified pairs) + `showcase` (12 lighting). `/gallery` filters are lighting-first (All Lighting / Permanent / Christmas / Landscape / Exterior Cleaning); homepage `ChristmasGallery` picks 4 showcase ids.
  - `faqs.ts` — global `faqs` (legacy pages) + `lightingFaqs` (homepage + FAQPage schema). `testimonials.ts` (15 published reviews → also drives `/reviews`), `faqs.ts` (global fallback), **`serviceFaqs.ts`** (per-service FAQ sets rendered + FAQPage schema on service/city pages; keep prices consistent with `guides.ts`), `content.ts`.
  - `locations.ts` — **51** city landing pages (local SEO): the original 12 + every OH/WV town within ~30 mi of 43963 (Tiltonsville HQ), verified by geocoding. Keep `intro`/`context` UNIQUE per city. `getLocationByCity()` links "nearby" mentions to their own pages (internal linking on `/locations/[slug]`).
  - `guides.ts` — data-driven `/guides/[slug]` content (SEO + lead capture). **8 guides**: 7 pricing (house-washing-cost, permanent-lighting-cost, christmas-light-installation-cost, roof-cleaning-cost, pressure-washing-cost, gutter-cleaning-cost, concrete-cleaning-sealing-cost — the last is shared with concrete-cleaning via `guideAliases`) + educational `pressure-washing-vs-soft-washing` (owns the "difference between…/no-pressure roof cleaning" informational cluster — AEO play). `getGuideForService(slug)` powers the "How much does it cost?" callout on service pages. Copy a block to add one; ranges are honest regional estimates, not quotes.
  - `targetKeywords.ts` — service×town matrix + Keyword Planner terms tracked by the dashboard.
  - `serviceAreas.ts` — **curated service×city combos** → `/services/[slug]/[city]` pages for "[service] [city]" head terms (lighting weighted; "christmas lights wheeling wv" ≈500/mo). `dynamicParams=false` (only ~26 curated combos exist — no doorway pages); unique local content per page.
  - `mockup.ts` — options for the **lighting mockup tool** (`/mockup`): lighting types (C9 vs permanent), facings, 6"/12" spacing, color schemes (hex). Editable lists drive the tool + emailed request.
- `src/lib/schema.ts` — JSON-LD: localBusiness/service/faq/breadcrumb/**locationSchema** (areaServed per city)/**articleSchema** (guides). `nav.ts`, `analytics.ts`.
- `src/app/` — routes: `/`, `/services` + `/services/[slug]`, `/locations` + `/locations/[slug]`, `/guides` + `/guides/[slug]`, `/gallery`, `/reviews` (all testimonials + Review schema), `/about`, `/contact`, `/thank-you`, `/privacy`, `/dashboard` (private), **`/lp/[slug]`** (paid-traffic landing pages — distraction-free, `noindex`, single CTA), **`/mockup`** (live lighting-visualizer lead magnet), `/api/lead`, `/api/mockup`. Plus `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`.
- **Lighting mockup tool** (`/mockup`): client canvas (`components/mockup/LightingMockup.tsx`) — upload home photo → best-effort sky-heuristic roofline auto-detect + drag/tap to adjust → live-renders C9/permanent lights (glow, facing, spacing, color, night mode). Submits rendered preview + photo to `/api/mockup` → Resend email (base64 attachments) to `LEAD_EMAIL_TO`. Component is reusable — meant to embed into `/lp/*` later.
- **`HideOnDashboard`** hides global nav chrome on **`/dashboard` AND `/lp`** (`BARE_ROUTES`). `/lp/[slug]` renders its own minimal header/footer (use `<div>` not landmark tags — it's nested in root `<main>`). `TrackedCall` = style-able tracked phone link for custom CTAs.
- `src/components/` — `layout/`, `sections/` (homepage blocks), `ui/` (Button, Section, Icon, MediaFrame, **BeforeAfter** slider…), `analytics/`.
- `src/middleware.ts` — Basic Auth gate for `/dashboard` (DASHBOARD_*) and **`/inventory`** (INVENTORY_* → falls back to DASHBOARD_*).
- **`/inventory`** — Rally's private lighting-inventory app: the single-file HTML from `Rally Inventory/rally_lighting_inventory.html`, copied to `public/inventory/index.html` and served at `/inventory` via a `beforeFiles` rewrite in `next.config.mjs`. Data lives in the browser's `localStorage` (per device/browser — no shared backend yet). To update the app, overwrite `public/inventory/index.html`. Disallowed in robots.
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
- **Leads:** `LeadForm` variants `default` | `permanent` | `christmas` all `POST /api/lead` with the same payload shape (+ optional `address`, and `photo` data URL that is emailed as an attachment and NOT sent to the webhook; webhook gets `has_photo`). 3 paths — (1) `LeadForm` `POST /api/lead` → Resend email to **info@rallyexteriorsolutions.com** from `leads@` (domain verified; env `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`; Resend account = rallyohv@gmail.com); (2) **call** (`tel:` via `CallButton`/`CallLink`, `trackCallClick`); (3) **text** (`sms:` via `TextButton`/`TextLink` + `site.smsHref` pre-filled, `trackTextClick`). Mobile sticky bar = Call/Text/Free-Quote.
- **Analytics (live):** GA4 (`NEXT_PUBLIC_GA4_ID`), Clarity (`NEXT_PUBLIC_CLARITY_ID`), Vercel Analytics + Speed Insights. Lead form fires `generate_lead` + `call_click`. **Search Console verified + sitemap submitted (Success; ~22→now ~83 pages after the 39-town service-area expansion).**
- **Owner dashboard:** `/dashboard` — Basic Auth (`DASHBOARD_USER`/`DASHBOARD_PASSWORD`), `HideOnDashboard` hides marketing chrome, embeds Looker Studio when `NEXT_PUBLIC_LOOKER_EMBED_URL` set. **Live keyword rankings** via `src/lib/searchConsole.ts` (`RankingsPanel`) — Search Console Search Analytics through a service-account JWT (no deps), env `GSC_CLIENT_EMAIL`/`GSC_PRIVATE_KEY`/`GSC_SITE_URL`; server-side only (page is `force-dynamic`, behind auth). Setup: `docs/SEARCH-CONSOLE-API.md`.
- **AEO / AI search:** `robots.ts` explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…); `public/llms.txt` summarizes the business for answer engines.
- **Ads conversions:** `trackLeadSubmit` (form) + `trackCallClick`/`trackTextClick` (call/text) all fire Google Ads conversions when configured — lead label `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, call/text label `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL` (+ `NEXT_PUBLIC_GOOGLE_ADS_ID`). Mockup lead magnet surfaced in main nav + homepage `MockupPromo`.
- **Redirects (`next.config.mjs`):** old SiteGround paths → current pages; **host-based 301 for old domain `rallyohv.com` → rallyexteriorsolutions.com (preserves path)**. rallyohv.com is added to the Vercel project.

## Open items (mostly user-side)
- **rallyohv.com** (old GoDaddy domain, expires 2026-07-12): redirect code + Vercel domain DONE. PENDING user: swap GoDaddy forwarding for DNS (`A @ 76.76.21.21`, `CNAME www → cname.vercel-dns.com`) + renew. (GoDaddy forwarding only redirects root; subpaths 404.)
- **Google Business Profile** optimization (biggest local-ranking lever) — see `docs/LOCAL-SEO.md`. User-driven.
- **Looker Studio** report is blank — user needs to add charts (template) + resend embed URL.
- Request Indexing on key pages in Search Console; confirm review/project stats; real address/hours.
- **Ads:** LSA **not available** for Rally's category/area → using **Google Search Ads**. Conversion tracking **LIVE** (`NEXT_PUBLIC_GOOGLE_ADS_ID=AW-16570854340` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` in Vercel; lead form auto-fires). Campaign plans: `docs/SEARCH-ADS-CLEANING.md` (run now, summer) + `docs/SEARCH-ADS-PERMANENT-LIGHTING.md` (Aug–Sept). Ad destinations = `/lp/[slug]` pages. Optional later: call/text-from-website conversion (`NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL`), Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`).
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
