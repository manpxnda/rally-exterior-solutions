# Rally Exterior Solutions — Website

A complete 4-page website built mobile-first with full SEO, structured data, and working quote forms. No build process, no framework — just files you upload.

## What's in this folder

| File | Page | URL when deployed |
|------|------|-------------------|
| `index.html` | Homepage | `/` |
| `cleaning.html` | Exterior Cleaning | `/cleaning` |
| `lighting.html` | Permanent Lighting | `/lighting` |
| `christmas-lighting.html` | Christmas Lighting (de-emphasized) | `/christmas-lighting` |
| `styles.css` | Shared design system — **edit the design here once, all 4 pages update** | — |

**Important:** all 5 files must live in the same folder. Every page loads `styles.css` — if it's missing, the pages render unstyled. When you deploy, upload the whole folder together.

> Previewing locally? Open the folder and double-click any `.html` file — they all share `styles.css` in the same directory, so styling works. (A single HTML file opened in isolation won't be styled, because it needs `styles.css` next to it.)

## Quick start (live in ~10 minutes)

1. **Wire the quote form** (it appears on all 4 pages — same setup, done once per page):

   **Formspree (recommended):** Sign up free at [formspree.io](https://formspree.io) (50 submissions/month free). Create a form, copy your form ID (like `xrgvabcd`). In each HTML file, find `data-endpoint="REPLACE_WITH_YOUR_FORM_ID"` and replace `REPLACE_WITH_YOUR_FORM_ID` with your ID. There are 4 (one per page) — search-and-replace across all files.

   **Netlify Forms (free forever if hosting on Netlify):** add `netlify data-netlify="true" name="quote"` to each `<form>` tag, add a hidden `<input type="hidden" name="form-name" value="quote">`, and remove the JS form handler so it submits natively.

2. **Deploy** — upload all 5 files to the same directory:
   - **Netlify**: drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop)
   - **Vercel** / **Cloudflare Pages**: same drag-and-drop
   - **Your current host**: upload all files via cPanel/FTP to the web root

3. **Set up clean URLs** so `/cleaning` works (not `/cleaning.html`):
   - Netlify/Vercel/Cloudflare do this automatically (they serve `cleaning.html` at `/cleaning`)
   - Traditional hosts: either keep the `.html` links, or add URL rewrites. Easiest fix if your host doesn't rewrite: change the internal links to include `.html`.

4. **Point your domain** at the host (each has a 2-minute DNS guide).

## Configure before going live

Search-and-replace across all files:

- [ ] **Phone** — `+17402088632` and `740-208-8632` (verify it's right)
- [ ] **Email** — `hello@rallyohv.com` (or your real address)
- [ ] **Form endpoint** — `REPLACE_WITH_YOUR_FORM_ID` × 4
- [ ] **Project / review counts** — `2,000+` and `47+` reviews
- [ ] **Testimonials** — names are placeholders (`Mike R.`, `Sarah B.`); swap for real attributions
- [ ] **Pricing** — house wash `$300–500`, roof `$600–1,000`, lighting `$3,500–7,000`; adjust if needed
- [ ] **Scarcity number** — lighting page references "limited" July 4th installs; keep it honest to your real capacity

## Photos (biggest visual upgrade)

Every page uses styled placeholders right now. Replace, in priority order:

1. **Homepage hero** — the SVG dusk-house in `index.html` → real dusk photo of a lit home
2. **Showcase grid** (homepage) — 6 real before/after photos
3. **Cleaning page** detail rows — house wash, roof, concrete, deck before/afters
4. **Lighting page** — real dusk install + app screenshot
5. **Open Graph image** — 1200×630 `og-image.jpg` (+ `og-lighting.jpg`) in the web root, for link previews
6. **Favicon** — save the sunrise mark as `favicon.png` in the web root

Replace a placeholder `<div class="ph">…</div>` or `<div class="placeholder-split">…</div>` with `<img src="your-photo.jpg" alt="descriptive text" loading="lazy">`. Compress at [tinypng.com](https://tinypng.com) first. Keep alt text descriptive for SEO ("Wheeling home roof before and after soft wash").

## SEO — already built in

Per page: unique title + meta description, Open Graph + Twitter tags, canonical URL, one H1, clean heading hierarchy, semantic HTML, mobile viewport, skip-link, ARIA labels, click-to-call links. Plus JSON-LD structured data: `LocalBusiness` (homepage), `Service` + `BreadcrumbList` (each service page), and `FAQPage` (homepage + service FAQs — eligible for rich results in Google).

**Still to do (high impact, ~1 hour):**
- [ ] Create `sitemap.xml` listing all URLs, and `robots.txt` pointing to it
- [ ] Claim/verify your **Google Business Profile** — for local service businesses this drives more calls than the website itself
- [ ] Submit the sitemap in [Google Search Console](https://search.google.com/search-console)
- [ ] Build per-town landing pages (`/service-area/wheeling`, etc.) — the footer already links them, and they rank well for "house washing [town]" searches
- [ ] Add analytics (Plausible or Google Analytics)

## Performance & maintenance

Each page is 20–45KB, loads instantly, zero dependencies beyond Google Fonts. To change the design (colors, fonts, spacing, buttons), edit `styles.css` once — all 4 pages update. Brand tokens live at the top of `styles.css` under `:root` (cream, navy, coral, teal). This is the file to hand Claude Code when you want to add pages, wire a custom backend, or add a CMS.

## Mobile (90% of your visitors)

Built mobile-first and tested at iPhone widths. Hamburger menu under 680px, everything stacks to single column, forms collapse, and a sticky bottom bar keeps **Call** + **Get Quote** in view at all times so a lead is always one tap away.
