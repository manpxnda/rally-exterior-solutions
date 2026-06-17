/**
 * GUIDES — high-intent informational content (SEO + lead capture).
 * ----------------------------------------------------------------------------
 * Each entry generates a page at /guides/[slug] targeting research-stage
 * searches ("how much does house washing cost", "is soft washing safe", etc.)
 * that funnel into a free-estimate CTA. Add a guide by copying a block.
 *
 * Pricing ranges are TYPICAL regional estimates for illustration — every Rally
 * quote is free, exact, and in writing. Keep ranges honest; update if Jason's
 * real pricing differs.
 */
import type { Faq } from "@/data/faqs";

export type GuideSection = {
  heading: string;
  /** paragraphs */
  body?: string[];
  /** optional bullet list under the paragraphs */
  bullets?: string[];
};

export type PriceRow = {
  label: string;
  range: string;
  note?: string;
};

export type Guide = {
  slug: string;
  /** H1 */
  title: string;
  /** eyebrow / category label */
  category: string;
  /** lead paragraph (also used in meta + index card) */
  intro: string;
  /** ISO date — shown as "Updated" + used in Article schema */
  updated: string;
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  priceTable?: {
    caption: string;
    rows: PriceRow[];
    disclaimer: string;
  };
  sections: GuideSection[];
  faqs: Faq[];
  /** service slug used for the closing CTA deep-link */
  relatedService?: string;
};

export const guides: Guide[] = [
  {
    slug: "house-washing-cost",
    title: "How Much Does House Washing Cost? (2026 Ohio Valley Pricing Guide)",
    category: "Pricing Guide",
    intro:
      "Most house washing in the Ohio Valley runs between $250 and $600, with the average single-family home landing around $300–$450. The exact price depends on your home's size, height, siding type, and how much mildew or algae has built up. Here's how pricing really works — and how to make sure you're comparing apples to apples.",
    updated: "2026-06-17",
    readMinutes: 5,
    metaTitle: "How Much Does House Washing Cost? | Wheeling WV & Ohio Valley Prices",
    metaDescription:
      "House washing costs $250–$600 for most Ohio Valley homes. See what drives the price, soft wash vs. pressure washing, and get a free exact quote from Rally.",
    keywords: [
      "house washing cost",
      "how much does house washing cost",
      "pressure washing prices Wheeling WV",
      "soft wash cost Ohio Valley",
      "house washing prices near me",
      "cost to power wash a house",
    ],
    priceTable: {
      caption: "Typical house washing prices in the Ohio Valley",
      rows: [
        { label: "Single-story home", range: "$250 – $400", note: "ranch / one-level, ~1,000–1,800 sq ft" },
        { label: "Two-story home", range: "$400 – $650", note: "most common — ~1,800–2,800 sq ft" },
        { label: "Large or 3-story home", range: "$600 – $1,000+", note: "tall, complex, or heavy buildup" },
        { label: "Add: gutter brightening", range: "+$75 – $200", note: "removes the black 'tiger stripes'" },
        { label: "Add: driveway / concrete", range: "+$100 – $300", note: "bundle and save vs. booking separately" },
      ],
      disclaimer:
        "Ranges are typical Ohio Valley estimates for illustration only — not a quote. Every Rally estimate is free, exact, and in writing with no obligation.",
    },
    sections: [
      {
        heading: "What actually determines the price",
        body: [
          "Two houses on the same street can have very different quotes. Reputable cleaners price on the real work involved, not a flat guess. The biggest factors:",
        ],
        bullets: [
          "Size & square footage — more siding means more solution, water, and time.",
          "Number of stories — taller homes need more equipment and care, which adds labor.",
          "Siding type — vinyl, brick, stucco, wood, and Hardie board each take a different approach.",
          "Level of buildup — heavy green/black algae and mildew take more dwell time and product.",
          "Access & landscaping — steep lots, tight access, and delicate plants slow the job down.",
          "Add-ons — gutters, concrete, decks, and fences are often bundled at a discount.",
        ],
      },
      {
        heading: "Soft washing vs. pressure washing — why the method matters",
        body: [
          "If a company quotes you a rock-bottom price to 'pressure wash' your siding, be careful. High pressure can crack siding, strip paint, and force water behind your walls — turning a cheap wash into an expensive repair.",
          "The industry-preferred method for siding is soft washing: low pressure plus specialized, eco-conscious solutions that kill mold and algae at the root. It costs about the same to do right, but the results last months longer and protect your home instead of risking it. Rally soft-washes every home.",
        ],
      },
      {
        heading: "Is house washing worth it?",
        body: [
          "For most homeowners, yes — it's one of the highest-return things you can do for your home's appearance. A professional wash removes years of grime in a few hours and instantly lifts curb appeal, which matters whether you're selling, hosting, or just tired of looking at green streaks.",
          "Left alone, algae and mildew don't just look bad — they hold moisture against your siding and can shorten its life. An annual or every-other-year wash protects your single biggest investment for a fraction of the cost of replacing siding.",
        ],
      },
      {
        heading: "How to compare quotes (and avoid getting burned)",
        body: [
          "The cheapest quote is rarely the best value. Before you book, make sure you're comparing the same thing:",
        ],
        bullets: [
          "Are they soft washing or blasting with high pressure? (Soft wash protects your siding.)",
          "Are they insured? Ask for proof — damage from an uninsured cleaner is on you.",
          "Is the quote itemized and in writing, with no vague 'starting at' pricing?",
          "Do they guarantee the results if you're not happy?",
        ],
      },
      {
        heading: "Get your exact price — free",
        body: [
          "Online ranges are a starting point; your home is unique. Rally gives free, no-pressure estimates — usually same-day — with a firm price in writing. Send a couple of photos or have us swing by, and you'll know exactly what it costs before you commit.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to wash a house in Wheeling, WV?",
        a: "Most homes in the Ohio Valley run $250–$600, with the average two-story home around $400–$650. Final price depends on size, height, siding type, and buildup. Rally gives a free, exact quote — usually same-day.",
      },
      {
        q: "Is house washing cheaper than pressure washing?",
        a: "They cost about the same when done correctly. 'House washing' done right uses the low-pressure soft wash method, which is safer for your siding and lasts longer than blasting with high pressure. Beware of unusually cheap 'pressure washing' quotes that can damage siding.",
      },
      {
        q: "How often should I have my house washed?",
        a: "Most Ohio Valley homes benefit from a wash every 1–2 years. Shaded, north-facing, or tree-heavy homes that grow algae faster may want annual cleaning to protect the siding and keep curb appeal high.",
      },
      {
        q: "Does the price include gutters and concrete?",
        a: "Siding washing is usually quoted on its own, but gutter brightening, driveways, decks, and fences can be bundled — often at a discount versus booking them separately. Just tell us what you'd like and we'll itemize it.",
      },
      {
        q: "Do you offer free estimates?",
        a: "Yes — every Rally estimate is 100% free, no-pressure, and provided in writing. Most quotes come back the same day.",
      },
    ],
    relatedService: "house-washing",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
