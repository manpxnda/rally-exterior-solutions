# Connect Search Console → Dashboard Keyword Rankings

One-time setup so the **Owner Dashboard** shows the exact keywords you rank for
(query, average position, clicks, impressions) pulled live from Google Search
Console. ~15 minutes. Free.

## What you'll create
A **Google service account** (a robot Google login) that has read-only access to
your Search Console data. Its credentials live in Vercel env vars; the dashboard
reads them server-side only (never exposed publicly).

## Steps

### 1. Create a Google Cloud project + enable the API
1. Go to https://console.cloud.google.com/ → create a project (e.g. "Rally Analytics").
2. APIs & Services → **Library** → search **"Google Search Console API"** → **Enable**.

### 2. Create the service account
1. APIs & Services → **Credentials** → **Create credentials** → **Service account**.
2. Name it (e.g. "rally-gsc-reader") → Create → Done (no roles needed).
3. Click the new service account → **Keys** → **Add key** → **Create new key** → **JSON**.
4. A `.json` file downloads. Open it — you'll need `client_email` and `private_key`.

### 3. Give it access in Search Console
1. Go to https://search.google.com/search-console → your property.
2. **Settings → Users and permissions → Add user.**
3. Paste the service account's `client_email` (looks like
   `...@your-project.iam.gserviceaccount.com`). Permission: **Restricted** is enough.

### 4. Add the env vars in Vercel
Project → Settings → Environment Variables (Production):

| Name | Value |
|------|-------|
| `GSC_CLIENT_EMAIL` | the `client_email` from the JSON |
| `GSC_PRIVATE_KEY` | the `private_key` from the JSON (paste the whole thing, including `-----BEGIN PRIVATE KEY-----` … and the `\n`s — both real newlines and `\n`-escaped work) |
| `GSC_SITE_URL` | `https://rallyexteriorsolutions.com/` (URL-prefix property) **or** `sc-domain:rallyexteriorsolutions.com` (domain property) — match exactly how it appears in Search Console |

### 5. Redeploy
Push any commit (or redeploy in Vercel) so the env vars load. Open **/dashboard** —
the **Keyword rankings** panel will list everything you rank for, refreshed each visit.

## Index status panel (optional — needs Full permission)
The dashboard also shows a **Google index status** panel (which pages are indexed).
That uses the URL Inspection API, which requires the service account to be a
**Full** user, not "Restricted." To enable it: Search Console → *Settings → Users
and permissions* → change `rally-gsc-reader@…` from **Restricted → Full**. (The
keyword-rankings panels work fine with Restricted; only this panel needs Full.)

## How to actually get pages indexed (Request Indexing)
Google indexes on its own schedule, but you can nudge it:
1. In Search Console, paste a URL (e.g. `https://rallyexteriorsolutions.com/services/permanent-lighting`)
   into the **search bar at the top** ("Inspect any URL").
2. Click **Request Indexing**. (Limit ~10–20 URLs/day.)
3. Do this for each service page + key pages. New domains can take days to weeks.
4. Keep the sitemap submitted (already done) — it's how Google discovers everything.

## Notes
- Read-only: the service account can only *read* Search Console, nothing else.
- Data lag: Search Console data is ~2 days behind; new sites take a few weeks to
  accumulate query data.
- If the panel says "couldn't load," double-check step 3 (the email must be added
  as a user on the *exact* property in `GSC_SITE_URL`).
