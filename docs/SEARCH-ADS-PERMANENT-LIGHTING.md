# Google Search Ads — Permanent Lighting Campaign Plan

Everything to launch a profitable Search campaign for **permanent exterior lighting**.
(LSA has no lighting category, so this runs as regular Search Ads.)

## Send ALL ad traffic here — the dedicated landing page
**https://rallyexteriorsolutions.com/lp/permanent-lighting**
- Distraction-free (no nav), one offer, one action → higher conversion + better Quality Score = **lower CPC**.
- It's `noindex` so it won't compete with your organic `/services/permanent-lighting` page.
- **Never point paid traffic at the homepage** — generic pages convert worse and cost more.

## Why this is a strong paid bet
- **High ticket** ($2k–$6k+ installs) — one won job pays for *hundreds* of clicks.
- **Year-round product** (not just Christmas), with a big "install before the holidays" push Aug–Nov.

---

## STEP 1 — Conversion tracking (do this BEFORE spending)
Without it you're flying blind. The site is already wired — you just connect the IDs.
1. In Google Ads → Goals → Conversions → **New conversion action** ("Website"). Name it `Lead - Estimate Form`. (Optionally add `Phone Call`.)
2. Copy your **Conversion ID** (`AW-XXXXXXXXX`) and the **conversion label**.
3. In **Vercel → Project → Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_GOOGLE_ADS_ID` = `AW-XXXXXXXXX`
   - `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` = `your_label`
4. Redeploy (push any commit / empty commit) so the values inline at build.
5. The lead form **auto-fires the conversion** on submit. Test by submitting the form once.
6. Add a **call asset** with call reporting (counts phone leads too).
> Don't switch to conversion-based bidding or scale budget until conversions are recording.

## STEP 2 — Campaign settings
- **Type:** Search. **UNCHECK** Display Network + Search Partners to start (keeps traffic clean).
- **Locations:** your service-area cities / ~25–30 mi around Wheeling. Set **"Presence: people in your targeted locations"** (NOT "interest") to avoid out-of-area clicks.
- **Bidding:** brand-new account → start **Maximize Clicks with a max CPC cap (~$4–6)** for 1–2 weeks to gather data, then switch to **Maximize Conversions**.
- **Budget:** start **~$20–30/day**. (A single $3k job from a month of that is a massive ROAS.)
- **Devices:** all (home-services traffic skews mobile — your landing page is mobile-first).

## STEP 3 — Ad group structure (tight themes = higher Quality Score)
- **Ad Group 1 — Permanent Lighting** (core)
- **Ad Group 2 — Permanent Christmas Lights** (what people actually type)
- **Ad Group 3 — Competitor** (optional: Jellyfish, Trimlight, Everlights, Gemstone)
Keep Christmas-ONLY (temporary) lighting in a **separate seasonal campaign** later → `/lp/holiday-lighting`.

## STEP 4 — Keywords (start tight: phrase "..." + exact [...])
**Ad Group 1 — Permanent Lighting**
```
"permanent lighting"
"permanent exterior lighting"
"permanent outdoor lighting"
"permanent house lights"
"permanent lighting near me"
[permanent lighting installation]
```
**Ad Group 2 — Permanent Christmas Lights**
```
"permanent christmas lights"
"permanent holiday lights"
"permanent christmas lights near me"
[permanent christmas lights installation]
```
**Ad Group 3 — Competitor (optional, lower bids, expect higher CPC)**
```
"jellyfish lighting"
"trimlight"
"everlights"
"gemstone lights"
```

## STEP 5 — Negative keywords (add a shared list NOW — saves money)
```
diy, kit, kits, bulb, bulbs, replacement, repair, how to, cheap, free, salary,
job, jobs, hiring, career, wholesale, amazon, walmart, lowes, home depot, costco,
solar, rope light, string light, led strip, battery, rental, used, parts, manual
```

---

## Responsive Search Ad — copy (paste in)
**Headlines** (add all; Google mixes them):
```
Permanent Outdoor Lighting
Year-Round Curb Appeal
App-Controlled LED Lights
Permanent Christmas Lights
Never Hang Lights Again
Free On-Site Estimate
Wheeling & Ohio Valley
Installed by Local Pros
Millions of Colors, One App
4.9★ Rated & Fully Insured
Holiday Colors Any Night
Stunning at Night, Hidden by Day
Lights for Every Holiday
Same-Day Quotes
Rally Exterior Solutions
```
**Descriptions** (add all 4):
```
Architectural-grade LEDs installed clean & tucked away. Any color, from your phone. Free estimate.
Never hang Christmas lights again. Permanent, weatherproof, app-controlled. Serving the Ohio Valley.
Local, insured, 4.9-star rated. Most quotes back same-day. Reserve your install date today.
Holiday colors, game-day pride, soft evening accents — 365 nights a year. Get your free quote.
```
- **Final URL:** `https://rallyexteriorsolutions.com/lp/permanent-lighting`
- **Display path:** `/Permanent-Lighting` · `/Ohio-Valley`
- Leave headlines mostly **unpinned** for best performance (optionally pin "Rally Exterior Solutions" to H1 for brand consistency).

## Assets / extensions (add ALL — free CTR + Quality Score lift)
- **Sitelinks:** Free Estimate · Our Work · Service Area · Holiday Lighting
- **Callouts:** Fully Insured · App-Controlled · Free Estimates · Locally Owned · Same-Day Quotes · Weatherproof LEDs
- **Structured snippet (Services):** Permanent Lighting, Christmas Lighting, Accent Lighting
- **Call asset:** (740) 208-8632 (turn on call reporting)
- **Location asset:** link your Google Business Profile
- **Image assets:** your best lit-home photos

---

## First 2 weeks — run-it checklist
- [ ] Conversions recording? (submit a test lead) — fix before scaling.
- [ ] Check the **Search Terms report** every few days → add junk as negatives.
- [ ] Optimize toward **form fills / calls**, not clicks.
- [ ] Don't panic at day-1 CPCs — let the algorithm learn 1–2 weeks.
- [ ] Once you have ~15–30 conversions, switch to Maximize Conversions / set a target CPA.

## Seasonality
- Permanent lighting sells all year; push hardest **Aug–Nov** ("installed before the holidays").
- Spin up a **separate seasonal campaign** for temporary Christmas lighting Sept–Dec → `/lp/holiday-lighting` (already built — same template).
