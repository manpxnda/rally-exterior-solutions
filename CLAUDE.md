# CLAUDE.md — Rally Exterior Solutions

Context for AI coding sessions on this repo. (User-facing setup docs are in `README.md`.)
**This repo is public — never commit secrets here. All credential *values* live in Vercel env vars.**

## What this is
Conversion-focused marketing site for **Rally Exterior Solutions** — premium exterior lighting + cleaning in the Ohio Valley / Wheeling, WV. Owner: **Jason Robb**. Optimize for **booked estimates** (CRO) and **local SEO**, not aesthetics for their own sake.

- **Live:** https://rallyexteriorsolutions.com (Vercel; apex `A → 76.76.21.21`, www → root)
- **Repo:** `manpxnda/rally-exterior-solutions` (`main` = production; `legacy-html-site` = the old static site)
- **Vercel:** project `rally-exterior-solutions`, scope `manpxndas-projects`
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v3

## Architecture — where things live
- `src/lib/site.ts` — **single source of truth** for business info (NAP, hours, stats, offer, social).
- `src/data/*.ts` — content that drives the site: `services.ts` (catalog — auto-generates service pages, nav, schema), `testimonials.ts`, `faqs.ts`, `gallery.ts` (before/after + lighting showcase), `content.ts` (process/why/guarantee).
- `src/lib/schema.ts` — JSON-LD (LocalBusiness/Service/FAQ/Breadcrumb). `src/lib/nav.ts`, `src/lib/analytics.ts`.
- `src/app/` — routes. `services/[slug]` is generated from `data/services.ts`. `/dashboard` = private owner hub.
- `src/components/` — `layout/`, `sections/` (homepage blocks), `ui/` (Button, Section, Icon, MediaFrame…), `analytics/`.
- `src/middleware.ts` — Basic Auth gate for `/dashboard`.

## How to edit content
- Business details → `src/lib/site.ts`. Services/reviews/FAQs/gallery → `src/data/*.ts`. **No component edits needed** for normal content changes.
- Brand tokens in `tailwind.config.ts`: `ink`=navy `#173D59`, `gold`=coral `#EA6F61`, `sky`=teal `#39ABA8`, `cream`=sand `#FAF0D7`. Display font = Roboto Slab.

## Deploy workflow
- **Push to `main` → Vercel auto-deploys.** Custom domain follows the latest git production deploy. PRs get preview URLs.
- After changing a `NEXT_PUBLIC_*` env var, you must **rebuild** — do an empty commit + push (those vars are inlined at build time).
- Always run `npm run build` and `npm run lint` before pushing. Build = 23 routes incl. SSG service pages + middleware.
- Raw Vercel deployment URLs return 401 (deployment protection); the assigned domains bypass it.

## Gotchas learned the hard way
- **iPhone photos**: EXIF orientation gets stripped by `sips`, leaving images sideways. Use **`sharp`** (already a dep) with `.rotate()` to auto-orient, then resize/compress. See the one-off pattern used to fill `public/images/`. Before/after pairs must share orientation; sliders render **portrait 3:4** (`BeforeAfter` component).
- **Service hero banner** is a centered **4:3** frame (`aspect="photo"`) — a 16:7 banner over-cropped portrait stock into slivers.
- **Source photo library:** `~/Desktop/Rally Photos/` (3 folders, ~70 photos). Only a curated subset is wired in; more available on request.

## Integrations (env var NAMES only — values in Vercel)
- **Leads:** `POST /api/lead` → Resend email to **info@rallyexteriorsolutions.com** from `leads@` (domain verified). Env: `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`. Also supports `LEAD_WEBHOOK_URL` / Formspree.
- **Analytics (live):** GA4 (`NEXT_PUBLIC_GA4_ID`), Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`), Vercel Analytics + Speed Insights (`@vercel/analytics`, `@vercel/speed-insights` — enable the tabs in the Vercel dashboard). Lead form fires `generate_lead` + `call_click`. Loader: `components/analytics/Analytics.tsx` (gated per env var).
- **Owner dashboard:** `/dashboard` — private hub (tool links + embedded Looker Studio report). Basic Auth via `src/middleware.ts` using `DASHBOARD_USER` / `DASHBOARD_PASSWORD`. Marketing chrome hidden via `HideOnDashboard`. Looker report embeds when `NEXT_PUBLIC_LOOKER_EMBED_URL` is set.
- **Redirects:** old SiteGround URLs (`/contact-us`, `/house-washing`, `/lighting`, `/christmas-lighting`, `/cleaning`, `*.html`, `/services/soft-washing`) → current pages via `next.config.mjs` `redirects()` (308).

## Current state (June 2026)
- 7 services (removed redundant "Exterior Soft Washing"). Real before/after photos + lighting gallery + real reviews (with "Verified Google review" badges).
- `reviewCount`/`projectsCompleted` in `site.ts` are **estimates** — confirm against Google Business Profile.

## Open items
- Looker Studio report content still being built (user side); embed URL wired once final.
- Google Search Console: verify (via GA4 or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` HTML tag) + submit `sitemap.xml`.
- Enable Vercel Analytics + Speed Insights tabs in the dashboard.
- Real address/hours; confirm stats. Google Ads (`NEXT_PUBLIC_GOOGLE_ADS_ID`/`_LEAD_LABEL`) + Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) for when ads start.

## Working preference
After any editing session, run a quick **sales-forward + SEO-forward** pass and implement safe, high-value wins before wrapping up.

## Commands
```
npm run dev        # local dev (localhost:3000)
npm run build      # production build — run before pushing
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
