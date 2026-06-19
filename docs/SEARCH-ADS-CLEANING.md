# Google Search Ads — Cleaning / Pressure Washing Campaign Plan

Copy-paste plan for an in-season (summer) Search campaign on the **cleaning** side —
pressure washing, house washing, roof cleaning, concrete. (Lighting runs as a
separate campaign in Aug–Sept; see `SEARCH-ADS-PERMANENT-LIGHTING.md`.)

## Send ad traffic to your ready-made landing pages
Each ad group points to its own distraction-free `/lp/` page (higher conversion +
lower CPC via Quality Score). **Never send paid traffic to the homepage.**
- Pressure washing → `https://rallyexteriorsolutions.com/lp/pressure-washing`
- House washing → `https://rallyexteriorsolutions.com/lp/house-washing`
- Roof cleaning → `https://rallyexteriorsolutions.com/lp/roof-washing`
- Concrete/driveway → `https://rallyexteriorsolutions.com/lp/concrete-cleaning`

---

## STEP 1 — Conversion tracking (BEFORE you spend a dollar)
Without it you're flying blind. Site is pre-wired — you just connect the IDs.
1. Google Ads → **Goals → Conversions → New conversion action → Website**. Name it
   `Lead - Estimate Form`. (Add a second: `Phone Call` from the call asset.)
2. Copy your **Conversion ID** (`AW-XXXXXXXXX`) + each **conversion label**.
3. Send them to Claude → adds `NEXT_PUBLIC_GOOGLE_ADS_ID`,
   `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, `NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL` in Vercel
   + redeploys. The lead form auto-fires the conversion; call/text clicks fire too.
4. Submit a test lead to confirm it records before scaling.

## STEP 2 — Campaign settings
- **Type:** Search. **UNCHECK** "Display Network" + "Search partners" to start.
- **Locations:** your towns / ~25–30 mi around Tiltonsville–Wheeling. Set
  **"Presence: people in your targeted locations"** (NOT "interest").
- **Bidding:** new account → **Maximize Clicks with a max CPC cap (~$3–5)** for 1–2
  weeks to gather data, then switch to **Maximize Conversions**.
- **Budget:** start **~$15–25/day.**
- **Ad schedule:** lean toward when you actually answer the phone.

## STEP 3 — Ad groups (tight themes = higher Quality Score)
One campaign, four ad groups, each → its matching `/lp/` page:
1. **Pressure / Power Washing** (core)
2. **House Washing**
3. **Roof Cleaning**
4. **Concrete / Driveway**

## STEP 4 — Keywords (phrase "…" + exact […]; geo handled by location targeting)
**Ad Group 1 — Pressure/Power Washing**
```
"pressure washing"
"power washing"
"pressure washing company"
"power washing services"
"pressure washing near me"
"power washing near me"
[pressure washing]
```
**Ad Group 2 — House Washing**
```
"house washing"
"house power washing"
"soft washing"
"exterior house cleaning"
"house washing near me"
```
**Ad Group 3 — Roof Cleaning**
```
"roof cleaning"
"roof washing"
"soft wash roof cleaning"
"roof cleaning near me"
```
**Ad Group 4 — Concrete / Driveway**
```
"driveway cleaning"
"driveway power washing"
"concrete cleaning"
"pressure wash driveway"
```

## STEP 5 — Negative keywords (CRITICAL — add a shared list now)
The #1 money-waster here is people shopping for the **machine** (pressure *washer*),
DIY, or jobs. Add all of these:
```
pressure washer, power washer, washer, machine, ryobi, karcher, sun joe, greenworks,
simpson, dewalt, harbor freight, home depot, lowes, amazon, walmart, rental, rent,
used, parts, repair, nozzle, gpm, psi, electric, gas, surface cleaner, soap,
detergent, chemical, diy, how to, hiring, jobs, salary, career, franchise,
start a business, free, cheap
```

---

## Responsive Search Ad — copy (one per ad group; tweak the headline to the service)
**Headlines** (add ~12; mix per ad group):
```
Pressure Washing Ohio Valley
Soft Wash House & Roof
Power Washing Done Right
House, Roof & Concrete
Free, Same-Day Quotes
Wheeling & Ohio Valley
Fully Insured & Local
4.9-Star Rated Locally
No Damage, Deep Clean
Driveways to Rooflines
Soft Wash Safe for Siding
Get a Free Estimate
Locally Owned Pros
Rally Exterior Solutions
```
**Descriptions** (add all 4):
```
The right pressure for every surface — strong on concrete, gentle soft wash on siding & roofs. Free estimate.
Local, insured, 4.9-star rated. House washing, roof cleaning, concrete & more. Most quotes same-day.
Don't risk damage from high pressure. We use the safe method for each surface. Get your free quote.
Driveways, siding, roofs & patios cleaned right. Serving Wheeling & the Ohio Valley. Call today.
```
- **Final URL:** the matching `/lp/` page for that ad group.
- **Display path:** `/Pressure-Washing` · `/Ohio-Valley`

## Assets / extensions (add ALL — free CTR + Quality Score lift)
- **Sitelinks:** Free Estimate · House Washing · Roof Cleaning · Service Area
- **Callouts:** Fully Insured · Free Estimates · Same-Day Quotes · Locally Owned · No Damage · Soft Wash Safe
- **Structured snippet (Services):** House Washing, Roof Cleaning, Concrete Cleaning, Pressure Washing
- **Call asset:** (740) 208-8632 — turn on call reporting
- **Location asset:** link your Google Business Profile
- **Image assets:** your best before/after photos

## First 2 weeks — run-it checklist
- [ ] Conversions recording? (submit a test lead) — fix before scaling.
- [ ] Check the **Search Terms report** every few days → add junk as negatives
      (you'll see lots of "pressure washer" machine searches early — kill them).
- [ ] Optimize toward **form fills + calls**, not clicks.
- [ ] After ~15–30 conversions, switch to Maximize Conversions / target CPA.

## Phase 2 — Lighting (Aug–Sept)
Spin up a separate campaign for permanent + Christmas lighting when the season
ramps → `SEARCH-ADS-PERMANENT-LIGHTING.md`, landing page `/lp/permanent-lighting`.
