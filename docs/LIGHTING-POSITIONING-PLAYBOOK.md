# Rally Exterior Solutions — Lighting Positioning Playbook

Standing directives from Jason's September 2026 briefs (concept → implementation → pricing →
customer journey), plus the decisions made along the way. This is the **why and the rules**;
`CLAUDE.md` holds architecture, `SESSION-2026-09-16.md` holds what shipped when.
Read this before changing the homepage, navigation, forms, pricing copy, or any lighting page.

---

## 1. The strategic position

- Company name stays **Rally Exterior Solutions**. Never "Rally Exterior Lighting."
- Rally is now **primarily an exterior lighting company**:
  1. **Permanent Lighting** — primary (premium, consultative)
  2. **Christmas Lighting** — primary (convenience-driven, easy to quote)
  3. **Landscape Lighting** — secondary ("Beyond the roofline" / "Complete the property")
- Permanent + Christmas carry ~90% of homepage emphasis. Landscape never gets an equal third block.
- The legacy exterior cleaning services (pressure/power washing, house washing, roof washing,
  gutter cleaning, concrete cleaning, concrete & paver sealing, commercial cleaning) are **real,
  available, and stay on the site** — pages, URLs, SEO, internal links, sitemap. They are simply
  not featured on the homepage. Brand architecture: *Primary business: Exterior Lighting.
  Also available: Other Exterior Services.*
- The visitor should think: **"These are THE lighting people around here."** Not "they do a bunch
  of exterior stuff." A returning washing customer should still quickly see "Yes, Rally still does this."

## 2. Brand experience

Philosophy: **"Premium is a feeling created by consistent details."**

Feel: premium, warm, confident, simple, capable, local, modern, memorable, approachable.
Not: corporate, sterile, cheap, overly luxurious, tech-startup, generic contractor template,
Christmas-store cheesy, gradient-heavy, glowing buttons, gimmicky animation.

Think: Disney-level experience + Apple-level clarity + premium home services + direct-response.

Visual: deep navy base, teal + coral as **accents only**, white / warm off-white, large clean type,
generous whitespace, real nighttime photography carries the drama, rounded corners where
appropriate, one big idea per section. Restraint matters — don't overload sections with icons,
badges, cards, copy and buttons at once.

## 3. Copy voice

We sell **what the home feels like after dark**, not LEDs. Transformation first, features second.

Approved Rally phrases (use them):
- "These lights never come down."
- "One system. Every season."
- "You enjoy Christmas. Rally handles the lights."
- "Your Christmas is handled."
- "Designed to disappear by day. Built to change the home after dark."
- "Show us your home. We'll take it from there."
- "See what Rally could do with your home."
- "Your home changes after dark." (hero — keep)
- "Beyond the roofline." (landscape)
- "We can often design and quote your home remotely." (Christmas microcopy — strategically important)
- Christmas: "Choose your display." Permanent: "Choose how far you want to take the home."

Banned phrases: "Illuminate your dreams", "Where innovation meets illumination", "Transform your
space with brilliance", "Lighting solutions", "Unparalleled craftsmanship", "Your premier
destination", "Best-in-class", "Cutting-edge". Plain, short, specific, confident, scannable.

Vocabulary shift: **design / project / package / display / coverage / investment /
recommendation** — away from *estimate / footage / per-foot price* for lighting.

Washing vocabulary: "Other Services", "Other Exterior Services", "Exterior cleaning & washing",
"Rally also offers professional exterior cleaning." Never "legacy", "old", "secondary businesses",
"services we used to focus on." Don't sound apologetic about still offering washing.

## 4. The two (three) buying journeys

| Journey | Emotion | Primary CTA | Destination | Form |
| --- | --- | --- | --- | --- |
| Permanent | architectural, premium, designed around the home | **Design My Home** / Schedule My Design Consultation | `/design-consultation` | address + "what should the home feel like" |
| Christmas | convenience, relief, clarity, ease | **Get My Christmas Quote** | `/christmas-quote` | address + preferred look + optional front-of-home photo (remote quoting) |
| Landscape | same design eye, beyond the roofline | Design My Landscape Lighting | `/contact?service=landscape-lighting` | address + areas to light |
| Cleaning (any) | intent-matched | Get a Free Estimate | `/contact?service=<slug>` | cleaning-only dropdown, preselected |
| Generic "Start My Project" | — | opens the **chooser** (3 lighting doors, then "Exterior cleaning & washing") | `/contact` = chooser page | grouped dropdown (Exterior Lighting / Other Exterior Services) |

Rules: a Christmas customer never has to book a consultation to learn the price. Never drop
anyone into a flat dropdown mixing Permanent Lighting with Roof Washing. Preserve intent from the
page they came from (`?service=` preselection). Thank-you screens are journey-specific
("Your Rally design request is in." / "Your Christmas quote request is in." / "Your pressure
washing estimate request is in."). Lead source + attribution + consent fields must survive.
Source of truth in code: `src/lib/journeys.ts`.

Permanent offer points: designed around the architecture, custom-fit track, nearly invisible by
day, warm architectural white every night, full color when wanted (Christmas, game day, parties),
app scenes + schedules, professional install, Rally support after, expandable later.
Christmas offer points: professional design, commercial-grade lights (Rally provides and owns
them), installation, timers, in-season maintenance, removal, labeling, organization, storage.
Christmas 5 steps: Show us your home → Pick/choose your look → Rally handles everything →
Enjoy Christmas → We return in January.

## 5. Pricing rule (permanent, sitewide)

**Never price lighting per linear foot publicly** — no $/ft, per-foot ranges, footage formulas,
calculators, or articles teaching footage math. Pricing should *qualify* budget, not commoditize.
Only approved public price points:
- "Permanent lighting projects generally start at $3,500." / "Most Rally permanent lighting
  projects begin around $3,500." + "Every home is different… final investment depends on the
  scope of the design."
- "Professional Christmas lighting packages generally start at $1,500. Your final design depends
  on the areas of the home you'd like to light."

No other package prices without approval. No elaborate package tables or branded package names
yet (sales system comes later). Hero is never a price ad — pricing appears on the two-path cards,
journey pages, guides, FAQs. Legacy cleaning per-sq-ft pricing is **not** covered by this rule.

## 6. Navigation & footer

- Header: Permanent Lighting · Christmas Lighting · Landscape Lighting · Gallery · Why Rally ·
  **Other Services ▼** (visually quieter; lists the real cleaning pages + All services) · phone ·
  Start My Project (chooser).
- Mobile menu: the five lighting-first links, then a compact "Other Services" group, then
  Design My Home / Get My Christmas Quote / Call. Never make a mobile user scroll past seven washing
  services to find Christmas.
- Footer: Exterior Lighting column · Other Exterior Services column · Company column.
- Homepage: never re-add a washing section; only the one quiet line above the footer
  ("Looking for pressure washing or exterior cleaning? Rally still offers those too.").
- Sticky mobile bar's primary action follows the page's service.

## 7. Proof, reviews, photos, logos — what's verified

- **Reviews (confirmed by Jason 2026-09-11):** 34 Google + 5 Facebook. Rating shown as 4.9
  (Birdeye's Google sync showed 5.0 — unconfirmed). Only **lighting** reviews are brand-level
  social proof; cleaning reviews appear only on their own pages and grouped below on `/reviews`.
  Reviews, FAQs, process steps and related cards must match the page's service.
- **Logos:** only wordmarks reading *Rally Exterior Solutions* (`public/brand/`). Never recreate,
  redraw, recolor or approximate the logo. The "Exterior Lighting" lockups were deleted (flawed).
- **Photos:** real Rally > Rally graphics > elegant placeholder. Never swap a real photo for
  stock because stock is prettier; never present a fabricated house as a Rally project. Jason
  confirmed the "6668" house photos and supplied the daytime track close-up + red/green/blue
  Christmas scene. Hero photo upgrade recommended (2400px+ blue-hour permanent install).
- **Never invent:** review count, customer count, years in business, warranty, financing,
  pricing, phone, service area wording, system specs, certifications, memberships, awards.
  Verified facts: phone (740) 208-8632, info@rallyexteriorsolutions.com, based in Tiltonsville OH,
  serving Wheeling WV + Ohio Valley, founded 2021.

## 8. SEO / safety rules

- Don't remove, rename or orphan washing pages. Don't change URL slugs without approval; if one
  ever must change: tell Jason first, document old → new, add a 301.
- Keep sitemap inclusion, "Other Services" nav, footer links, service-area links.
- Homepage authority = exterior lighting; dedicated legacy pages keep their washing keywords.
- Location pages describe Rally overall → lighting first, then "Rally also offers exterior
  cleaning in {city}". Service×city pages (e.g. "Pressure Washing Wheeling WV") stay about that
  service — intent matters. Legacy pages may carry one subtle "Rally also specializes in exterior
  lighting" cross-link; it must not interfere with the washing conversion.
- Preserve every tracking script, form destination, webhook, consent field, UTM capture. Flag
  rather than remove anything you can't verify (GoHighLevel automations live outside the code).

## 9. The tests to run before finishing any site change

- **5-second test:** Rally = exterior lighting; Permanent = premium system designed around my
  home; Christmas = Rally handles the whole thing; Landscape = third category; and I know what to
  click next (Design My Home / Get My Christmas Quote).
- **Disney test:** what did they just see, what did they click, what do they expect, does the next
  screen deliver? Fix the transition if not.
- **Hormozi test:** one primary offer per page.
- **Four customers:** (A) permanent ad → homepage → Design My Home; (B) Christmas search →
  Christmas page → quote; (C) returning washing customer on the homepage finds washing without the
  homepage becoming a washing site; (D) Google → pressure-washing page still sells pressure washing
  with an appropriate quote path. All four must work.
- Then the standing rule: a quick sales-forward + SEO-forward pass, implement safe wins.

## 10. How Jason wants this work done

- Don't ask preliminary questions; make intelligent decisions from the brief and **build V1**.
- Work on a branch; **never deploy to production unless told** ("merge" was an explicit
  instruction on 2026-09-11 and 2026-09-16; the pricing and journey passes were explicitly staging).
- Don't redesign what already works; restraint over cosmetic churn.
- Deliver with: what changed (files/pages/nav/forms/scripts/SEO), what was preserved, items
  requiring approval, asset usage, before/after summary, desktop + mobile screenshots, and a
  named audit table when a rule is involved (e.g. LIGHTING PRICING AUDIT, CUSTOMER JOURNEY AUDIT,
  FORM AUDIT, CTA ROUTING MAP, NAVIGATION MAP).
- Mark placeholders and unverifiable claims clearly instead of inventing them.

## 11. Current state (2026-09-23)

- LIVE on `main`: lighting-first homepage/nav/footer, journeys, reviews rule, official logos,
  `/inventory` app + cloud sync, rotated private-area login.
- STAGED, not merged: `pricing-packages` (pricing rule, hero CTA/photo/proof strip, chooser) and
  `journey-consistency` (scoped forms, contact chooser, context-aware routing). Both pushed to
  GitHub. Merge `journey-consistency` to ship both.
- Open: exact Google star rating; dedicated landscape photo; higher-res hero; About page still
  generic; 51 location intros still mention cleaning + lighting together; `/lp/*` ad copy vs new
  CTA labels; confirm GoHighLevel workflows branch on the `service` field.
