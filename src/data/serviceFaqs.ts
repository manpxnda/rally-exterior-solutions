/**
 * PER-SERVICE FAQs — service-specific questions for each /services/[slug] page.
 * ----------------------------------------------------------------------------
 * Rendered on the service + service×city pages and emitted as FAQPage schema,
 * targeting long-tail questions ("is soft washing safe for vinyl", "when should
 * I book christmas lights") for both classic search and AI answer engines.
 *
 * Price mentions MUST stay consistent with the ranges in guides.ts — update
 * both together. Services without an entry fall back to the global faqs.
 */
import { faqs as globalFaqs, type Faq } from "@/data/faqs";

export const serviceFaqs: Record<string, Faq[]> = {
  "permanent-lighting": [
    {
      q: "How much does permanent outdoor lighting cost?",
      a: "Permanent lighting is quoted per linear foot — typically $25–$45/ft in the Ohio Valley. Most average two-story homes land around $3,500–$5,000 installed. Every Rally quote starts with a free on-site measurement, so you get an exact price in writing before you decide.",
    },
    {
      q: "Is permanent lighting really invisible during the day?",
      a: "Yes. The track is color-matched to your trim and tucked under the eaves, so it disappears in daylight. At night you control everything from your phone — warm white accents, holiday scenes, or millions of colors.",
    },
    {
      q: "How long does the installation take?",
      a: "Most homes are measured, built, and installed in a single day. From design to finished outdoor lighting installation, our crew handles everything — no ladders or wiring for you, ever.",
    },
    {
      q: "Do permanent lights work in Ohio Valley winters?",
      a: "They're built for it. The LEDs are commercial-grade and weather-sealed against snow, ice, and summer storms alike — that's the whole point of never hanging seasonal lights again.",
    },
    {
      q: "Can I still do normal warm white lighting, or is it just colors?",
      a: "Both. Most of our customers run soft warm-white accent lighting 300 nights a year and switch to team colors or holiday scenes with one tap. Schedules and timers are built into the app.",
    },
  ],
  "holiday-lighting": [
    {
      q: "When should I book Christmas light installation?",
      a: "September and early October. Rally's install calendar fills first-come, first-served, and the best install dates (early November, lights on before Thanksgiving) go to the earliest bookings. By late October we're often into a waitlist.",
    },
    {
      q: "How much does professional Christmas light installation cost?",
      a: "Most Ohio Valley homes run $600–$1,100 for a roofline-plus display, with single-story rooflines starting around $400–$700. That includes design, commercial-grade lights, installation, in-season maintenance, and takedown.",
    },
    {
      q: "Do you provide the lights, or do I use my own?",
      a: "We provide premium commercial-grade bulbs — brighter, more durable, and more uniform than retail strings. You're not buying boxes of lights that fail in year two; the package covers everything.",
    },
    {
      q: "What happens if a section goes out in December?",
      a: "We fix it — in-season maintenance is included. If a bulb or run fails while your display is up, we come out and make it right, no extra charge.",
    },
    {
      q: "Do you take the lights down afterward?",
      a: "Yes — takedown and storage are part of the seasonal package. We remove everything in January and store it, so your garage stays clear and next year's install is even faster.",
    },
  ],
  "pressure-washing": [
    {
      q: "How much does pressure washing cost in Wheeling, WV?",
      a: "Typical Ohio Valley pricing: driveways and sidewalks $150–$300, patios and pool decks $150–$400, full house soft wash $250–$600. Exact price depends on square footage and buildup — Rally quotes are free and usually same-day.",
    },
    {
      q: "What's the difference between pressure washing and power washing?",
      a: "They're the same service — 'power washing' is just the more common name for it. What actually matters is using the right pressure for each surface: strong pressure on concrete, low-pressure soft washing on siding and roofs. Rally does both, correctly.",
    },
    {
      q: "Will high pressure damage my siding or roof?",
      a: "It can — which is why we never blast delicate surfaces. Concrete and stone get real pressure; vinyl, stucco, wood, and shingles get the industry-preferred soft wash method. Right tool, right surface, zero damage.",
    },
    {
      q: "How often should I pressure wash my property?",
      a: "Most Ohio Valley homes benefit from an annual exterior cleaning — our humid summers grow algae fast. Concrete typically needs it every 1–2 years, sooner if it's shaded or sees a lot of traffic.",
    },
    {
      q: "Do you bundle multiple surfaces for a better price?",
      a: "Yes — house plus driveway, gutters, patio, or fence bundles are almost always cheaper than booking each separately. Tell us everything you're considering and we'll itemize it so you can pick.",
    },
  ],
  "house-washing": [
    {
      q: "How much does house washing cost?",
      a: "Most Ohio Valley homes run $250–$600, with the average two-story home around $400–$650. Size, height, siding type, and buildup set the price — see our full pricing guide, or get a free exact quote same-day.",
    },
    {
      q: "Is soft washing safe for vinyl siding?",
      a: "Yes — it's the safest professional method there is. Soft washing uses low pressure with specialized solutions that kill mildew and algae at the root. No cracked siding, no water forced behind walls, and the clean lasts months longer than pressure alone.",
    },
    {
      q: "What are the green and black streaks on my siding?",
      a: "Living algae and mildew, not dirt. They feed on moisture and spread every season — and they hold dampness against your siding, which shortens its life. A soft wash kills them at the root instead of just rinsing the surface.",
    },
    {
      q: "How long does a house wash take?",
      a: "Most single-family homes take 2–4 hours. You don't need to be home — we just need water access and a heads-up about pets, open windows, and delicate plants.",
    },
    {
      q: "Will it hurt my plants or landscaping?",
      a: "No — we pre-wet and rinse your landscaping and use eco-conscious, plant-safe detergents. Protecting your property is part of the job, not an add-on.",
    },
  ],
  "roof-washing": [
    {
      q: "How much does roof cleaning cost?",
      a: "Typically $0.20–$0.55 per square foot of roof area — around $350–$600 for an average single-story home and $600–$900 for two-story or steep roofs. Heavy moss or lichen adds treatment time. Free assessments, exact quotes in writing.",
    },
    {
      q: "What are the black streaks on my roof?",
      a: "A living algae called Gloeocapsa magma that feeds on the limestone in your shingles. It's not just cosmetic — left alone it shortens roof life and can void some shingle warranties. Our soft wash treatment kills it at the source.",
    },
    {
      q: "Do you pressure wash roofs?",
      a: "Never — high pressure strips shingle granules and causes the exact damage you're trying to avoid. We use the manufacturer-approved no-pressure soft wash method: treatment does the work, not force.",
    },
    {
      q: "Does Rally do roofing repairs or replacement?",
      a: "No — and that's good news for your wallet. We're the roofing care side of the trade: we clean and protect the roof you have so it looks new and lasts years longer, instead of selling you a $15,000 replacement.",
    },
    {
      q: "How long do the results last?",
      a: "Most roofs stay streak-free for 2–4 years after a professional soft wash, depending on shade and tree cover. North-facing and heavily shaded roofs regrow algae fastest.",
    },
  ],
  "gutter-cleaning": [
    {
      q: "How much does gutter cleaning cost in Wheeling, WV?",
      a: "Most single-story homes run $100–$175 and two-story homes $150–$250, based on linear footage and how clogged they are. Gutter brightening — scrubbing off the black streaks — adds $75–$200. Bundling with a house wash is the best value.",
    },
    {
      q: "What's the difference between gutter cleaning and gutter brightening?",
      a: "Cleaning clears the inside — leaves, shingle grit, and clogs — so water flows. Brightening restores the outside, using a specialized solution to remove the black 'tiger stripes' of oxidation that no amount of rinsing takes off. We do both in one visit.",
    },
    {
      q: "How often should gutters be cleaned?",
      a: "Twice a year is ideal in the Ohio Valley — late fall after the leaves drop and spring after the seed pods. Homes with heavy tree cover may need a third visit.",
    },
    {
      q: "What happens if I skip gutter cleaning?",
      a: "Clogged gutters overflow against your fascia and soffit, rot the wood, invite pests and ice dams, and can even send water into your foundation. A $150 cleaning is the cheapest insurance your house can buy.",
    },
    {
      q: "Do I need to be home?",
      a: "No — as long as we can access the gutters safely, we'll clean, flush, brighten, haul away the debris, and send you photos of the finished result.",
    },
  ],
  "concrete-cleaning": [
    {
      q: "How much does concrete cleaning cost?",
      a: "Driveways and sidewalks typically run $150–$300 and patios or pool decks $150–$400, priced by square footage. Oil, rust, and heavy algae may add treatment. Bundle with sealing and save on both.",
    },
    {
      q: "Can you get oil stains out of a driveway?",
      a: "Usually, yes — we pre-treat oil, rust, and organic stains with the right chemistry before surface cleaning. Very old, deep-set stains may lighten rather than vanish completely, and we'll tell you honestly what to expect up front.",
    },
    {
      q: "Why does my concrete have zebra stripes from the last cleaning?",
      a: "That's what happens when someone cleans freehand with a wand. We use professional surface cleaners — spinning, shrouded heads that deliver an even, swirl-free finish across the whole slab.",
    },
    {
      q: "Should I seal my concrete after cleaning?",
      a: "If you want it to stay clean, yes. Sealing repels oil and water, blocks stains, and shields against freeze-thaw damage — and it's cheapest to do right after a professional clean, while the surface is perfect.",
    },
  ],
  "concrete-paver-sealing": [
    {
      q: "How much does concrete or paver sealing cost?",
      a: "Sealing typically runs $1–$2.50 per square foot depending on the surface and finish, and most driveway clean-and-seal packages land around $400–$900. Every project includes surface cleaning first — quotes are free and by square footage.",
    },
    {
      q: "Is sealing pavers actually worth it?",
      a: "For pavers especially, yes. Sealing locks the joint sand in place (fewer weeds and ants), repels oil and stains, and stops the fading and shifting that make a patio look old. It's the single best way to protect hardscape you've already paid for.",
    },
    {
      q: "Matte or wet look — what's the difference?",
      a: "Natural matte protects without changing the appearance; wet-look adds a rich, darker sheen like the surface just after rain. Both protect equally — it's purely the finish you prefer, and we'll show you samples.",
    },
    {
      q: "How often does sealing need to be redone?",
      a: "Every 3–5 years for most driveways and patios, depending on sun, traffic, and salt exposure. We'll tell you honestly when yours actually needs it — not before.",
    },
  ],
  "commercial-cleaning": [
    {
      q: "What commercial properties do you service?",
      a: "Storefronts, restaurants, offices, plazas, HOAs, churches, and industrial facilities across the Ohio Valley. Building washing, sidewalks and flatwork, gum and grease removal, dumpster pads, awnings — one insured vendor for the whole property.",
    },
    {
      q: "Can you work around our business hours?",
      a: "Yes — early mornings, nights, and weekends are normal for us. We schedule so your customers never see a hose, and recurring maintenance plans keep the property consistent year-round.",
    },
    {
      q: "Are you insured, and can you provide a COI?",
      a: "Fully insured, and yes — certificates of insurance are available on request for property managers, HOAs, and corporate vendors. We're used to vendor-compliance paperwork.",
    },
    {
      q: "Do you offer recurring service contracts?",
      a: "Yes — monthly, quarterly, and seasonal maintenance plans with volume pricing. Most commercial clients save meaningfully versus one-off cleanings, and the property never slides backward.",
    },
  ],
};

/** Service-specific FAQs, falling back to the global set. */
export function getServiceFaqs(slug: string): Faq[] {
  return serviceFaqs[slug] ?? globalFaqs;
}
