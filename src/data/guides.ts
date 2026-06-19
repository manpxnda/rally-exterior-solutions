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
  {
    slug: "permanent-lighting-cost",
    title: "How Much Does Permanent Outdoor Lighting Cost? (2026 Guide)",
    category: "Pricing Guide",
    intro:
      "Permanent outdoor lighting is usually priced per linear foot — typically $25–$45 installed — which puts most whole-home installs in the Ohio Valley between about $2,500 and $6,000, with the average single-family home around $3,500–$4,500. The exact price comes down to how much roofline you light, your home's height, and the product tier. Here's how it really breaks down.",
    updated: "2026-06-18",
    readMinutes: 5,
    metaTitle: "Permanent Outdoor Lighting Cost | Wheeling WV & Ohio Valley Prices",
    metaDescription:
      "Permanent lighting runs about $25–$45 per linear foot — most homes $2,500–$6,000 installed. See what drives the price and get a free exact quote from Rally.",
    keywords: [
      "permanent lighting cost",
      "how much does permanent lighting cost",
      "permanent outdoor lighting price",
      "permanent christmas lights cost",
      "jellyfish lighting cost",
      "permanent lighting wheeling wv cost",
    ],
    priceTable: {
      caption: "Typical permanent lighting prices (installed)",
      rows: [
        { label: "Per linear foot", range: "$25 – $45", note: "the standard way it's quoted" },
        { label: "Smaller / single-story home", range: "$2,500 – $3,500", note: "~80–120 ft of track" },
        { label: "Average two-story home", range: "$3,500 – $5,000", note: "most common" },
        { label: "Large or complex home", range: "$5,000 – $8,000+", note: "long rooflines, peaks, multiple stories" },
      ],
      disclaimer:
        "Ranges are typical Ohio Valley estimates for illustration only — not a quote. Every Rally estimate is free and includes a firm, written per-foot price.",
    },
    sections: [
      {
        heading: "What drives the price",
        body: ["Permanent lighting is a one-time install that lasts for years, so pricing reflects the materials and labor that go into doing it right:"],
        bullets: [
          "Linear footage — the #1 factor; more roofline = more track and LEDs.",
          "Home height & complexity — two- and three-story homes and steep peaks take more time and equipment.",
          "Product tier — commercial-grade, color-matched track and quality LEDs cost more but last far longer.",
          "Controller & app features — millions of colors and scene programming vs. simpler warm-white setups.",
          "Trim color matching — channel color-matched to your fascia so it disappears by day.",
        ],
      },
      {
        heading: "Why it's worth it vs. hanging lights every year",
        body: [
          "Professional Christmas light installation runs roughly $500–$1,500 every season. Over 4–6 years that's the cost of a permanent system — except permanent lighting also gives you year-round accent lighting, holiday colors for every holiday, and game-day pride, all from your phone, with no ladders ever again.",
          "It's also a curb-appeal and resale feature, not just a seasonal expense.",
        ],
      },
      {
        heading: "How to compare quotes",
        body: ["Permanent lighting quality varies a lot. Before you buy, ask:"],
        bullets: [
          "Is the track color-matched and mounted to disappear in daylight?",
          "Are the LEDs commercial-grade and individually addressable (for scenes)?",
          "What's the warranty on the lights, the install, and the controller?",
          "Is the company insured and installing it themselves (not subbing it out)?",
        ],
      },
      {
        heading: "Get your exact per-foot price — free",
        body: [
          "Rally measures your home and gives a free, written quote with a clear per-linear-foot price — no pressure. Most quotes come back same-day. Reserve early; install dates fill fast heading into fall.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does permanent lighting cost for an average home?",
        a: "Most homes in the Ohio Valley run $2,500–$6,000 installed, with a typical two-story home around $3,500–$5,000. It's usually quoted per linear foot ($25–$45). Rally gives a free, written per-foot quote.",
      },
      {
        q: "Is permanent lighting cheaper than yearly Christmas lights?",
        a: "Over time, yes. Professional holiday installs cost ~$500–$1,500 a year, so a permanent system typically pays for itself in 4–6 years — and you also get year-round and every-holiday lighting with no ladders.",
      },
      {
        q: "Does the price include the app controller?",
        a: "Yes — Rally installs include the controller and app so you can set any color or scene from your phone. We'll walk you through it.",
      },
      {
        q: "Do you offer free estimates?",
        a: "Always. Every estimate is free, no-pressure, and provided in writing, usually same-day.",
      },
    ],
    relatedService: "permanent-lighting",
  },
  {
    slug: "christmas-light-installation-cost",
    title: "How Much Does Christmas Light Installation Cost? (2026 Guide)",
    category: "Pricing Guide",
    intro:
      "Professional Christmas light installation in the Ohio Valley typically runs $500–$1,500 for a residential home, with most single-family homes landing around $600–$1,000. Pricing depends on how much roofline and landscaping you light, your home's height, and whether bulbs are included. Here's what goes into it — and why booking early matters.",
    updated: "2026-06-18",
    readMinutes: 4,
    metaTitle: "Christmas Light Installation Cost | Wheeling WV & Ohio Valley",
    metaDescription:
      "Professional Christmas light installation runs $500–$1,500 for most homes. See what affects the price, what's included, and get a free quote from Rally.",
    keywords: [
      "christmas light installation cost",
      "how much does christmas light installation cost",
      "holiday light installation price",
      "cost to hang christmas lights",
      "christmas light installers wheeling wv",
    ],
    priceTable: {
      caption: "Typical Christmas light installation prices",
      rows: [
        { label: "Roofline only (single story)", range: "$400 – $700", note: "basic perimeter" },
        { label: "Average home (roof + some trees/bushes)", range: "$600 – $1,100", note: "most common" },
        { label: "Large / two-story display", range: "$1,000 – $2,000+", note: "tall rooflines, heavy design" },
        { label: "Add: takedown & storage", range: "often included", note: "ask what's bundled" },
      ],
      disclaimer:
        "Ranges are typical Ohio Valley estimates for illustration only — not a quote. Rally's seasonal packages include design, install, in-season maintenance, takedown & storage.",
    },
    sections: [
      {
        heading: "What's usually included",
        body: ["A professional install is more than hanging lights. A good package covers the whole season:"],
        bullets: [
          "Custom design for your home and roofline",
          "Premium commercial-grade bulbs (often provided/rented)",
          "Professional, insured installation — no ladders for you",
          "In-season maintenance if a bulb or section goes out",
          "Takedown and storage after the holidays",
        ],
      },
      {
        heading: "What drives the price",
        bullets: [
          "Linear footage of roofline + any trees, columns, and walkways",
          "Home height and roof pitch (two-story and steep roofs cost more)",
          "Whether you own the bulbs or they're provided",
          "Design complexity — simple warm-white vs. multicolor + wraps",
        ],
      },
      {
        heading: "Book early — it's the cheapest way to save",
        body: [
          "Prime install dates (late October–November) fill fast, and rushing a last-minute job costs more. Reserving early locks in your date and price. Want it solved permanently? See our permanent lighting guide — it pays for itself in a few seasons.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to have Christmas lights professionally installed?",
        a: "Most Ohio Valley homes run $500–$1,500, with a typical home around $600–$1,000. Price depends on roofline length, home height, and whether bulbs are included. Rally gives a free, written quote.",
      },
      {
        q: "Does the price include takedown?",
        a: "With Rally, yes — our seasonal packages include install, in-season maintenance, takedown, and storage, so you never touch a ladder.",
      },
      {
        q: "Should I get permanent lighting instead?",
        a: "If you decorate every year, permanent lighting often pays for itself in 4–6 seasons and works year-round. Many customers start with a quote for both.",
      },
    ],
    relatedService: "holiday-lighting",
  },
  {
    slug: "roof-cleaning-cost",
    title: "How Much Does Roof Cleaning Cost? (2026 Guide)",
    category: "Pricing Guide",
    intro:
      "Roof cleaning (soft washing) in the Ohio Valley typically costs $0.20–$0.55 per square foot, which puts most homes between about $350 and $700, with larger or steep roofs running $800–$1,200+. The price depends on roof size, pitch, height, and how heavy the black streaks and moss are. Here's how it works — and why it's far cheaper than a new roof.",
    updated: "2026-06-18",
    readMinutes: 4,
    metaTitle: "Roof Cleaning Cost | Black Streak Removal — Wheeling WV & Ohio Valley",
    metaDescription:
      "Roof cleaning runs about $0.20–$0.55/sq ft — most homes $350–$700. See what affects the price of soft-wash black-streak removal and get a free Rally quote.",
    keywords: [
      "roof cleaning cost",
      "how much does roof cleaning cost",
      "roof washing price",
      "black streak removal cost",
      "soft wash roof cost wheeling wv",
    ],
    priceTable: {
      caption: "Typical roof cleaning prices (soft wash)",
      rows: [
        { label: "Per square foot", range: "$0.20 – $0.55", note: "of roof area" },
        { label: "Average single-story home", range: "$350 – $600", note: "moderate streaking" },
        { label: "Two-story / steep roof", range: "$600 – $900", note: "more access + safety" },
        { label: "Large or heavy moss/lichen", range: "$900 – $1,200+", note: "extra treatment" },
      ],
      disclaimer:
        "Ranges are typical Ohio Valley estimates for illustration only — not a quote. Every Rally roof estimate is free and quoted after a quick assessment.",
    },
    sections: [
      {
        heading: "What drives the price",
        bullets: [
          "Roof size (square footage) — the main factor",
          "Pitch & height — steep, tall, two-story roofs need more access and safety gear",
          "Severity — heavy black algae, moss, and lichen take more product and dwell time",
          "Roof type — asphalt, metal, or flat each get the right approach",
        ],
      },
      {
        heading: "Soft wash only — never pressure-washed",
        body: [
          "Roofs should never be pressure-washed — high pressure strips shingle granules and can void your warranty. Rally uses a manufacturer-approved soft wash that kills the algae (Gloeocapsa magma) at the root with no pressure, so the streaks don't just disappear — they stay gone longer.",
        ],
      },
      {
        heading: "Why it's worth it",
        body: [
          "Those black streaks are living algae feeding on your shingles. Left alone, they shorten your roof's life. A $350–$700 cleaning can add years to a roof that costs $10,000+ to replace — one of the best-value things you can do for your home.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to clean a roof?",
        a: "Most Ohio Valley homes run $350–$700, or about $0.20–$0.55 per square foot. Steep, tall, or heavily-stained roofs cost more. Rally gives a free quote after a quick assessment.",
      },
      {
        q: "Will roof cleaning damage my shingles?",
        a: "Not the way we do it. Rally uses a no-pressure soft wash that's manufacturer-approved — it removes algae and moss safely without stripping granules or voiding warranties.",
      },
      {
        q: "How long do the results last?",
        a: "Because soft washing kills algae at the root (not just rinses it), results typically last years longer than pressure washing — often 3–5+ years depending on shade and exposure.",
      },
    ],
    relatedService: "roof-washing",
  },
  {
    slug: "pressure-washing-cost",
    title: "How Much Does Pressure Washing Cost? (2026 Guide)",
    category: "Pricing Guide",
    intro:
      "Pressure washing in the Ohio Valley typically runs $0.15–$0.45 per square foot, which puts most jobs between about $150 and $600 depending on what's being cleaned. A driveway might be $150–$300, a full house wash $250–$600, and a whole-property package more. Here's how pricing works by surface — and why the cheapest quote often isn't the best value.",
    updated: "2026-06-19",
    readMinutes: 5,
    metaTitle: "Pressure Washing Cost | Power Washing Prices — Wheeling WV & Ohio Valley",
    metaDescription:
      "Pressure washing costs about $0.15–$0.45/sq ft — most jobs $150–$600. See power washing prices by surface (driveway, house, roof) and get a free Rally quote.",
    keywords: [
      "pressure washing cost",
      "how much does pressure washing cost",
      "power washing cost",
      "pressure washing prices",
      "cost to pressure wash a driveway",
      "pressure washing wheeling wv cost",
    ],
    priceTable: {
      caption: "Typical pressure / power washing prices",
      rows: [
        { label: "Driveway / sidewalk", range: "$150 – $300", note: "by square footage" },
        { label: "House wash (soft wash siding)", range: "$250 – $600", note: "by size & stories" },
        { label: "Patio / pool deck", range: "$150 – $400", note: "concrete or pavers" },
        { label: "Roof (soft wash)", range: "$350 – $700", note: "never high pressure" },
        { label: "Whole-property package", range: "bundle & save", note: "house + concrete + more" },
      ],
      disclaimer:
        "Ranges are typical Ohio Valley estimates for illustration only — not a quote. Every Rally estimate is free, exact, and in writing.",
    },
    sections: [
      {
        heading: "What drives the price",
        body: ["Pressure washing is priced by the surface and how much there is of it. The main factors:"],
        bullets: [
          "Square footage — the biggest factor on every job",
          "Surface type — concrete, siding, brick, roof, and wood each need a different approach",
          "Level of buildup — heavy oil, rust, algae, or mildew takes more time and product",
          "Access & height — two-story walls, steep roofs, and tight spots add labor",
          "Add-ons & bundles — combining house + driveway + more usually lowers the per-item price",
        ],
      },
      {
        heading: "Pressure washing vs. soft washing — what you're actually paying for",
        body: [
          "Here's what separates a good company from a cheap one: not everything should be blasted with high pressure. Concrete and flatwork can take strong pressure, but siding, roofs, and wood need low-pressure “soft washing” with cleaning solutions — high pressure there cracks siding, strips paint, and damages shingles.",
          "A rock-bottom “pressure washing” quote that blasts everything can turn a cheap clean into an expensive repair. Rally uses the right pressure for each surface, so you get a deep clean with zero damage.",
        ],
      },
      {
        heading: "How to compare quotes",
        bullets: [
          "Will they soft-wash delicate surfaces, or blast everything with high pressure?",
          "Are they insured? Damage from an uninsured cleaner is on you.",
          "Is the quote itemized by surface and in writing?",
          "Do they bundle (house + concrete) to save you money?",
        ],
      },
      {
        heading: "Get your exact price — free",
        body: [
          "Online ranges are a starting point; your property is unique. Rally gives free, no-pressure quotes — usually same-day — itemized by surface so you know exactly what you're paying for.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to pressure wash a house?",
        a: "Most house washes in the Ohio Valley run $250–$600 depending on size and number of stories. Note that siding should be soft-washed (low pressure), not blasted — which is included in that price when done right. Rally gives a free, exact quote.",
      },
      {
        q: "How much to pressure wash a driveway?",
        a: "Most driveways and sidewalks run $150–$300 depending on square footage and how stained they are. Bundling with a house wash usually lowers the total.",
      },
      {
        q: "Is power washing the same as pressure washing?",
        a: "People use the terms interchangeably. Technically power washing uses heated water; pressure washing doesn't. What matters more is using the right pressure for each surface — strong for concrete, gentle soft washing for siding and roofs.",
      },
      {
        q: "Why are some quotes so much cheaper?",
        a: "Often because they blast every surface with high pressure (fast, but can damage siding and roofs) or aren't insured. The right method costs about the same to do safely and lasts longer. Always compare what's actually included.",
      },
    ],
    relatedService: "pressure-washing",
  },
  {
    slug: "pressure-washing-vs-soft-washing",
    title: "Pressure Washing vs. Soft Washing: Which Does Your Home Need?",
    category: "Buyer's Guide",
    intro:
      "Pressure washing uses high-pressure water to blast dirt off hard surfaces like concrete. Soft washing uses low pressure plus cleaning solutions to safely clean delicate surfaces like siding and roofs. Using the wrong one is how homes get damaged — here's the difference, and exactly which surfaces need which.",
    updated: "2026-06-19",
    readMinutes: 5,
    metaTitle: "Pressure Washing vs. Soft Washing: What's the Difference? | Rally",
    metaDescription:
      "Pressure washing vs. soft washing explained: which method is safe for siding, roofs, and concrete — and why the wrong one causes damage. Plain-English guide from Rally.",
    keywords: [
      "pressure washing vs soft washing",
      "difference between pressure washing and soft washing",
      "soft wash vs pressure wash",
      "what is soft washing",
      "no pressure roof cleaning",
      "is soft washing better than pressure washing",
    ],
    sections: [
      {
        heading: "What is pressure washing?",
        body: [
          "Pressure washing (also called power washing) uses a high-pressure stream of water to blast away dirt, grime, mud, and stains. That force is perfect for hard, durable surfaces — but on anything delicate, the same force that cleans concrete will crack siding, strip paint, and tear up shingles.",
        ],
      },
      {
        heading: "What is soft washing?",
        body: [
          "Soft washing uses low pressure (about the force of a garden hose) combined with specialized, eco-conscious cleaning solutions. Instead of blasting dirt off, the solution kills mold, mildew, and algae at the root, then a gentle rinse washes it away. Because it cleans biologically rather than by force, the results also last much longer.",
        ],
      },
      {
        heading: "Which surfaces need which method",
        body: ["The right method depends entirely on the surface. Here's the rule of thumb the pros use:"],
        bullets: [
          "Concrete, driveways, sidewalks, patios → pressure washing (it's durable enough)",
          "Vinyl & wood siding, stucco, brick → SOFT washing (high pressure cracks and forces water behind it)",
          "Roofs (asphalt, metal, flat) → SOFT washing only (high pressure strips shingle granules and voids warranties)",
          "Decks & fences → usually soft washing or low pressure",
          "Gutters (exterior) → soft washing",
        ],
      },
      {
        heading: "Why the wrong method is so costly",
        body: [
          "This is the #1 thing that separates a good company from a cheap one. A bargain crew that blasts everything with high pressure can etch concrete, gouge wood, crack vinyl, force water into your walls, and strip the protective granules off your shingles — turning a cheap wash into thousands in repairs.",
          "Roofs are the biggest danger: they should never be pressure-washed. \"No-pressure\" roof cleaning (soft washing) is the only safe way.",
        ],
      },
      {
        heading: "How Rally decides",
        body: [
          "We use the right method for every surface — strong pressure where it's safe (concrete and flatwork), and gentle soft washing where it protects (siding, roofs, wood). That's the whole point: a deep clean with zero damage, done by one insured local team. If you're not sure what your home needs, we'll tell you straight during a free estimate.",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the difference between pressure washing and soft washing?",
        a: "Pressure washing uses high-pressure water to clean hard surfaces like concrete. Soft washing uses low pressure plus cleaning solutions to safely clean delicate surfaces like siding and roofs. Hard surfaces can take pressure; delicate ones need soft washing or they'll be damaged.",
      },
      {
        q: "Is soft washing better than pressure washing?",
        a: "Neither is 'better' — they're for different surfaces. Soft washing is better (and safer) for siding, roofs, and wood; pressure washing is better for concrete and flatwork. The right pro uses both, matched to the surface.",
      },
      {
        q: "Can you pressure wash a roof?",
        a: "No — roofs should never be pressure-washed. High pressure strips the protective granules off shingles and can void your warranty. The safe method is soft washing ('no-pressure' roof cleaning), which kills the algae at the root without damage.",
      },
      {
        q: "Is power washing the same as pressure washing?",
        a: "People use the terms interchangeably. Technically power washing uses heated water and pressure washing doesn't, but both rely on high pressure — so both need the same caution on delicate surfaces.",
      },
    ],
    relatedService: "pressure-washing",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

/** The pricing guide tied to a given service slug, if one exists. */
export function getGuideForService(serviceSlug: string): Guide | undefined {
  return guides.find((g) => g.relatedService === serviceSlug);
}
