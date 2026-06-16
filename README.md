# Rally Exterior Solutions — Website

A high-converting, SEO-optimized marketing site for **Rally Exterior Solutions**
— premium permanent lighting, holiday lighting, and exterior cleaning across the
Ohio Valley & Wheeling, WV region.

Built to **book estimates**, not win design awards: form-first hero, sticky
mobile call/quote bar, before/after proof, trust signals, fast local-SEO pages,
and lead tracking wired for Google & Meta ads.

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (recommended)
- **Forms/Leads:** pluggable — Webhook (Zapier/Jobber/HubSpot), Resend email, or Formspree

---

## Table of contents

1. [Quick start (local development)](#1-quick-start-local-development)
2. [Project structure](#2-project-structure)
3. [Editing content (the easy stuff)](#3-editing-content-the-easy-stuff)
4. [Environment variables](#4-environment-variables)
5. [Lead delivery setup (Jobber / Zapier / Resend / Formspree)](#5-lead-delivery-setup)
6. [Analytics & ad tracking](#6-analytics--ad-tracking)
7. [GitHub workflow (safe changes)](#7-github-workflow-safe-changes)
8. [Vercel deployment](#8-vercel-deployment)
9. [Domain migration: SiteGround → Vercel (keep GoDaddy)](#9-domain-migration-siteground--vercel-keep-godaddy)
10. [SEO checklist after launch](#10-seo-checklist-after-launch)
11. [Future editing & best practices](#11-future-editing--best-practices)

---

## 1. Quick start (local development)

**Prerequisites:** [Node.js 18.18+](https://nodejs.org) (Node 20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file (then fill in values as needed)
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000**. The site hot-reloads as you edit.

> 💡 You can run the whole site with **no env vars set**. Forms will succeed and
> log to the server console, and analytics tags simply won't load. Add values
> when you're ready to go live.

### Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server (http://localhost:3000) |
| `npm run build` | Production build — run this before deploying to catch errors |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Check for code/SEO/accessibility issues |
| `npm run typecheck` | TypeScript type checking only |

---

## 2. Project structure

```
src/
├── app/                      # Pages & routes (App Router)
│   ├── layout.tsx            # Global shell: header, footer, analytics, schema
│   ├── page.tsx              # Homepage (the funnel)
│   ├── services/
│   │   ├── page.tsx          # Services overview
│   │   └── [slug]/page.tsx   # One SEO landing page per service (auto-generated)
│   ├── about/                # About page
│   ├── gallery/              # Before/after + project gallery
│   ├── contact/              # Free-estimate page (primary conversion)
│   ├── thank-you/            # Post-submit confirmation (noindex)
│   ├── privacy/              # Privacy policy (starter)
│   ├── api/lead/route.ts     # Lead intake endpoint (webhook/email)
│   ├── sitemap.ts            # Auto sitemap.xml
│   ├── robots.ts             # Auto robots.txt
│   ├── manifest.ts           # PWA manifest
│   ├── icon.svg              # Favicon
│   └── opengraph-image.tsx   # Auto social-share image
│
├── components/
│   ├── layout/               # Header, Footer, PromoBar, MobileCTABar, PageHeader, Logo
│   ├── sections/             # Hero, ServicesGrid, ProofSection, Testimonials, FAQ, CTA, …
│   ├── ui/                   # Button, Section, Icon, MediaFrame, Stars, Container
│   ├── analytics/            # Analytics.tsx (GA4 / Google Ads / Meta Pixel)
│   ├── LeadForm.tsx          # The lead capture form
│   ├── BeforeAfter.tsx       # Draggable before/after slider
│   └── CallButton.tsx        # Tracked phone CTAs
│
├── data/                     # ✏️  EDIT THESE — all marketing content lives here
│   ├── services.ts           # Service catalog (drives pages, nav, schema)
│   ├── testimonials.ts       # Customer reviews
│   ├── faqs.ts               # FAQ (also powers FAQ rich results)
│   ├── gallery.ts            # Before/after + showcase items
│   └── content.ts            # Process steps, guarantee, "why us"
│
└── lib/
    ├── site.ts               # ✏️  Business info: phone, address, hours, stats, offer
    ├── nav.ts                # Navigation (auto-built from services)
    ├── schema.ts             # JSON-LD structured data (local SEO)
    └── analytics.ts          # Tracking helpers
```

---

## 3. Editing content (the easy stuff)

Almost everything you'll want to change lives in **two places**:

### A) Business info → `src/lib/site.ts`
Phone number, email, address, hours, review counts, the promo bar text, social
links. **Update the placeholder phone/address before launch.**

### B) Services, reviews, FAQs, gallery → `src/data/*.ts`
- **Add/edit a service:** open `src/data/services.ts`, copy an existing block,
  change the fields. A new page at `/services/your-slug`, a nav item, and schema
  are generated automatically.
- **Add a review:** add an entry to `src/data/testimonials.ts`.
- **Add an FAQ:** add an entry to `src/data/faqs.ts`.
- **Add before/after photos:** see `public/images/README.md`.

> No real photos yet? The site shows clean, on-brand placeholders automatically,
> so it always looks finished. Replace them anytime.

---

## 4. Environment variables

Copy `.env.example` → `.env.local` for local dev. In production, set the same
variables in **Vercel → Project → Settings → Environment Variables**.

| Variable | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for SEO/sitemap/schema (e.g. `https://rallyexteriorsolutions.com`) |
| `LEAD_WEBHOOK_URL` | One delivery method | POST each lead as JSON (Zapier/Make/Jobber/HubSpot) |
| `RESEND_API_KEY` + `LEAD_EMAIL_TO` | One delivery method | Email each lead |
| `LEAD_EMAIL_FROM` | With Resend | Verified sending address |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Alternative | Post the form straight to Formspree (no backend) |
| `LEAD_WEBHOOK_SECRET` | Optional | Shared secret sent as `X-Rally-Secret` header |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics 4 (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Optional | Google Ads (`AW-XXXXXXXXX`) |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Optional | Conversion label for a submitted estimate |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta (Facebook) Pixel ID |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console verification token |

> `NEXT_PUBLIC_*` variables are exposed to the browser (needed for analytics).
> Everything else (API keys, webhook URL) stays server-side. **Never commit real
> values** — `.env*` files are gitignored.

---

## 5. Lead delivery setup

The form posts to `/api/lead`, which delivers to **whatever you've configured**.
Pick one (or several):

### Option 1 — Zapier → Jobber / HubSpot (easiest, most flexible)
1. In Zapier, create a Zap with a **Webhooks by Zapier → Catch Hook** trigger.
2. Copy the webhook URL into `LEAD_WEBHOOK_URL` in Vercel.
3. Add an action: **Create Request/Client in Jobber** (or **Create Contact in
   HubSpot**), mapping fields `name`, `phone`, `email`, `service`, `zip`,
   `details`, plus the `attribution` object (UTMs, gclid, etc.).

### Option 2 — Resend (email notification of every lead)
1. Create an API key at [resend.com](https://resend.com) and verify your domain.
2. Set `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM` in Vercel.
3. You'll get a formatted email for each submission (reply-to = the customer).

### Option 3 — Formspree (no backend)
1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint.
2. Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`. The form posts there directly.

**Lead payload shape** (what your webhook receives):
```json
{
  "name": "Jane Smith",
  "phone": "(304) 555-0123",
  "email": "jane@email.com",
  "service": "roof-washing",
  "zip": "26003",
  "details": "Black streaks on north side of roof",
  "source": "hero_form",
  "submittedAt": "2026-06-16T15:00:00.000Z",
  "attribution": { "utm_source": "google", "gclid": "..." }
}
```

> Spam protection: a hidden honeypot field silently drops bots. Required-field
> validation runs on both the client and the server.

---

## 6. Analytics & ad tracking

Tags load **only** when their ID is present — no IDs, no scripts, no console noise.

- **GA4 / Google Ads** share one `gtag.js` loader (`components/analytics/Analytics.tsx`).
- **Meta Pixel** loads when `NEXT_PUBLIC_META_PIXEL_ID` is set.

**Events already wired** (`src/lib/analytics.ts`):
- `call_click` — every tracked phone tap (header, hero, mobile bar, etc.)
- `generate_lead` + Meta `Lead` + Google Ads conversion — on estimate submit
- UTM/`gclid`/`fbclid` are captured and sent along with each lead.

**Two ways to count an ad conversion:**
1. **Event-based (default):** set `NEXT_PUBLIC_GOOGLE_ADS_ID` +
   `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`; the form fires the conversion on submit.
2. **Destination-based:** point a Google Ads conversion at the `/thank-you` page
   (the form redirects there after submit). Use one method to avoid double-counting.

---

## 7. GitHub workflow (safe changes)

This repo is set up for the standard "preview before publish" flow that pairs
with Vercel. **`main` is always production.** Never edit `main` directly.

### One-time: create the GitHub repo
```bash
# from the project folder, if not already a git repo:
git init
git add .
git commit -m "Initial commit: Rally Exterior Solutions website"
git branch -M main

# create the repo on GitHub (using the GitHub CLI)…
gh repo create rally-exterior-solutions --private --source=. --push
# …or add an existing remote:
# git remote add origin https://github.com/<you>/rally-exterior-solutions.git
# git push -u origin main
```

### Every change after that
```bash
git checkout main && git pull          # start from latest production
git checkout -b update/holiday-pricing # 1. branch for your change
# ...make edits...
npm run build                          # 2. confirm it builds locally
git add . && git commit -m "Update holiday lighting pricing copy"
git push -u origin update/holiday-pricing
```
Then open a **Pull Request** on GitHub. Vercel automatically builds a **Preview
URL** for that PR — open it, click around, confirm it looks right. When you're
happy, **merge into `main`** and Vercel deploys to production.

> Golden rule: if the Preview looks good and `npm run build` passed, merging is safe.

---

## 8. Vercel deployment

1. Push the repo to GitHub (section 7).
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Framework preset auto-detects **Next.js**. Defaults are correct:
   - Build command: `next build`
   - Output: (managed by Next.js)
4. Add your **Environment Variables** (section 4) for the **Production** (and
   optionally **Preview**) environments.
5. Click **Deploy**. You'll get a `*.vercel.app` URL immediately.

After this, **every push to `main` deploys to production** and **every PR gets a
preview** — automatically. No manual deploys needed.

---

## 9. Domain migration: SiteGround → Vercel (keep GoDaddy)

Goal: serve the new site from Vercel while **GoDaddy stays your registrar** and
SiteGround is retired. Two clean options — Option A (recommended) keeps DNS at
GoDaddy; Option B moves DNS to Vercel.

### Before you start (avoid downtime)
- Deploy the new site to Vercel and confirm it works on the `.vercel.app` URL.
- In GoDaddy DNS, **lower the TTL** on your existing `A`/`CNAME` records to 600s
  a day ahead, so the switch propagates fast.
- Note any records you must preserve: **email/MX**, `TXT` (SPF/DKIM), and any
  subdomains. **Do not change MX records** — that's what keeps email working.

### Option A — Keep DNS at GoDaddy (recommended, lowest risk)
1. In **Vercel → Project → Settings → Domains**, add `rallyexteriorsolutions.com`
   **and** `www.rallyexteriorsolutions.com`. Vercel shows the exact records to set.
2. In **GoDaddy → Domain → DNS**, update:
   - **A record** `@` → the IP Vercel gives you (currently `76.76.21.21`), **or**
     follow Vercel's current instructions if it provides a different target.
   - **CNAME** `www` → `cname.vercel-dns.com`
   - Remove the old SiteGround `A`/`CNAME` web records (leave MX/email alone).
3. Back in Vercel, wait for the domain to verify (minutes to a couple hours).
   Vercel issues the SSL certificate automatically.
4. Set your **production domain** in Vercel (redirect `www` → apex or vice-versa).

### Option B — Use Vercel nameservers
1. Add the domain in Vercel; choose **"Use Vercel Nameservers."**
2. In GoDaddy → **Nameservers**, replace GoDaddy's with the two Vercel
   nameservers shown. **First re-create your MX/email and other records in
   Vercel DNS**, or email will break.
3. Wait for nameserver propagation (can take up to 24–48h).

### After the switch
- Test `https://rallyexteriorsolutions.com` and the `www` version (both should
  load with a valid padlock and redirect to your chosen primary).
- Confirm email still sends/receives.
- Cancel the SiteGround hosting plan **only after** the site and email are
  verified on the new setup for a day or two. Keep the GoDaddy registration.
- Submit the live `https://rallyexteriorsolutions.com/sitemap.xml` to Google
  Search Console.

> If anything looks wrong mid-migration, you can revert the DNS records in
> GoDaddy back to SiteGround's values — that's why we keep TTL low.

---

## 10. SEO checklist after launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain in Vercel.
- [ ] Verify the site in **Google Search Console** and submit `sitemap.xml`.
- [ ] Create/claim the **Google Business Profile** (matching name/phone/address
      in `src/lib/site.ts` — NAP consistency matters for local rank).
- [ ] Replace placeholder phone, address, hours, and review counts with real ones.
- [ ] Add real before/after photos (`public/images/README.md`).
- [ ] Confirm structured data with the
      [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Check mobile performance in [PageSpeed Insights](https://pagespeed.web.dev/).
- [ ] Replace the starter Privacy Policy with attorney-reviewed copy if running ads.

---

## 11. Future editing & best practices

- **Content edits are safe and easy** — they live in `src/lib/site.ts` and
  `src/data/*.ts`. You don't need to touch components.
- **Always work on a branch + PR** so Vercel gives you a Preview to review
  before it hits production (section 7).
- **Run `npm run build` before pushing** — it catches typos and broken links.
- **Keep NAP consistent** (Name, Address, Phone) across the site, Google Business
  Profile, and directories.
- **Add reviews and photos regularly** — fresh proof lifts both conversion and
  local ranking.
- When upgrading dependencies, run `npm run build` and click through a Preview
  deploy before merging.

---

Built for revenue, not vanity. Questions about the code live in inline comments
throughout `src/` — start with `src/lib/site.ts` and `src/data/services.ts`.
