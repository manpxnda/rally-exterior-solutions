/**
 * SERVICE CATALOG — the backbone of the site.
 * ----------------------------------------------------------------------------
 * Each service auto-generates:
 *   • a card on the homepage + /services
 *   • a dedicated SEO landing page at /services/[slug]
 *   • a navigation dropdown item
 *   • Service schema.org markup
 *
 * To add a service: copy a block, change the fields, done.
 * `image` is OPTIONAL — when omitted, a branded placeholder renders so the
 * layout never looks broken. Drop a real photo in /public/images/services/
 * and set `image: "/images/services/your-file.jpg"`.
 */

export type ServiceCategory = "lighting" | "cleaning";
export type ServiceIcon =
  | "lighting"
  | "snowflake"
  | "house"
  | "roof"
  | "droplet"
  | "concrete"
  | "shield"
  | "building";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  icon: ServiceIcon;
  /** ~6 word benefit hook for cards */
  tagline: string;
  /** card body — one tight sentence */
  summary: string;
  /** H1 on the service page */
  heroHeadline: string;
  /** subhead on the service page */
  heroSub: string;
  /** the pain we remove */
  problem: string;
  /** the outcome they buy */
  outcome: string;
  /** 2–3 sentence body */
  description: string;
  benefits: string[];
  /** "Great for…" qualifiers */
  bestFor: string[];
  priceNote: string;
  image?: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "permanent-lighting",
    name: "Permanent Exterior Lighting",
    shortName: "Permanent Lighting",
    category: "lighting",
    icon: "lighting",
    tagline: "Year-round curb appeal, one tap on your phone",
    summary:
      "Custom-fit, color-changing LED lighting that disappears in daylight and transforms your home at night — controlled from an app.",
    heroHeadline: "Permanent Exterior Lighting That Makes Your Home the Best on the Block",
    heroSub:
      "Architectural-grade, app-controlled LEDs installed clean and tucked away. Holiday colors, game-day pride, soft evening accents — never climb a ladder again.",
    problem:
      "Hanging lights every December is dangerous, time-consuming, and the magic only lasts a few weeks.",
    outcome:
      "A home that looks intentional and impressive 365 nights a year — set any color or scene from your phone in seconds.",
    description:
      "Our permanent lighting tracks are color-matched to your trim and mounted discreetly under the eaves, so they vanish during the day. At night, choose warm white accent lighting, holiday themes, or millions of colors and patterns. Professionally installed, weatherproof, and built to last.",
    benefits: [
      "Invisible by day, stunning by night",
      "Millions of colors + preset holiday scenes",
      "Full control from a simple phone app",
      "No more ladders, tangled cords, or storage",
      "Commercial-grade, weather-sealed LEDs",
      "Boosts curb appeal & resale impression",
    ],
    bestFor: [
      "Homeowners who decorate every holiday",
      "New builds & recently remodeled exteriors",
      "Anyone who wants effortless, year-round curb appeal",
    ],
    priceNote: "Most residential installs are quoted per linear foot. Free on-site measurement.",
    metaTitle: "Permanent Outdoor Lighting Installation | Ohio Valley & Wheeling WV",
    metaDescription:
      "Premium app-controlled permanent exterior lighting installed in the Ohio Valley & Wheeling, WV. Year-round curb appeal, holiday colors, no ladders. Free estimate.",
    keywords: [
      "permanent outdoor lighting Wheeling WV",
      "permanent Christmas lights Ohio Valley",
      "permanent exterior lighting installation",
      "architectural LED lighting",
    ],
    featured: true,
  },
  {
    slug: "holiday-lighting",
    name: "Christmas & Holiday Lighting",
    shortName: "Holiday Lighting",
    category: "lighting",
    icon: "snowflake",
    tagline: "Professional Christmas lights, zero hassle",
    summary:
      "We design, install, maintain, take down, and store your holiday lighting — you just enjoy the show.",
    heroHeadline: "Stress-Free Christmas Lighting, Professionally Installed",
    heroSub:
      "Custom-designed holiday displays with premium commercial bulbs. We hang it, maintain it all season, and take it down — you never touch a ladder.",
    problem:
      "DIY Christmas lights mean freezing weekends, blown fuses, broken bulbs, and a tangled mess to store.",
    outcome:
      "A magazine-worthy holiday display that turns on flawlessly every night — installed and removed for you.",
    description:
      "Rally handles your entire holiday lighting season end-to-end: custom design, premium commercial-grade bulbs, professional installation, in-season maintenance, takedown, and storage. Rooflines, trees, wreaths, walkways — we make your property the one the neighborhood drives by to see.",
    benefits: [
      "Custom design for your home & taste",
      "Premium commercial-grade bulbs (we provide)",
      "In-season maintenance included",
      "Professional takedown & storage",
      "Fully insured — no risk to you or your roof",
      "Reserve early; prime dates book fast",
    ],
    bestFor: [
      "Busy families who want the magic without the labor",
      "Homeowners with steep or tall rooflines",
      "Anyone tired of storing tangled lights",
    ],
    priceNote:
      "Seasonal packages include install, maintenance, takedown & storage. Book early for best dates.",
    metaTitle: "Christmas Light Installation | Wheeling WV & Ohio Valley Holiday Lighting",
    metaDescription:
      "Professional Christmas & holiday light installation in Wheeling, WV and the Ohio Valley. Design, install, maintenance, takedown & storage. Book early — free estimate.",
    keywords: [
      "Christmas light installation Wheeling WV",
      "holiday lighting Ohio Valley",
      "professional Christmas lights near me",
      "holiday light installers",
    ],
    featured: true,
  },
  {
    slug: "house-washing",
    name: "House Washing",
    shortName: "House Washing",
    category: "cleaning",
    icon: "house",
    tagline: "Strip away years of grime — safely",
    summary:
      "Gentle soft washing that removes dirt, mildew, cobwebs, and oxidation from siding without high-pressure damage.",
    heroHeadline: "House Washing That Makes Your Home Look New Again",
    heroSub:
      "A low-pressure soft wash safely removes mildew, algae, dirt, and cobwebs from your siding — restoring the color you forgot you had.",
    problem:
      "Green and black streaks, faded siding, and cobwebbed eaves make even a nice home look tired and neglected.",
    outcome:
      "Bright, clean siding and crisp curb appeal — without the risk of cracked siding or forced-in water from pressure washing.",
    description:
      "We use the industry-preferred soft wash method: specialized, eco-conscious solutions that kill mildew and algae at the root, followed by a gentle rinse. Safe for vinyl, brick, stucco, wood, Hardie board, and painted surfaces — and the results last far longer than pressure washing alone.",
    benefits: [
      "Kills mold, mildew & algae at the root",
      "Low-pressure — safe for every siding type",
      "Removes cobwebs, dirt, dust & oxidation",
      "Results last months longer than pressure washing",
      "Eco-conscious, plant-safe detergents",
      "Instant, dramatic curb appeal boost",
    ],
    bestFor: [
      "Homes with green/black streaks or mildew",
      "Pre-sale or pre-photography clean-ups",
      "Annual exterior maintenance",
    ],
    priceNote: "Priced by home size & condition. Most single-family homes quoted on the spot.",
    metaTitle: "House Washing & Soft Wash Siding Cleaning | Wheeling WV & Ohio Valley",
    metaDescription:
      "Professional soft-wash house washing in the Ohio Valley & Wheeling, WV. Safely remove mildew, algae & dirt from siding. Long-lasting results. Free estimate.",
    keywords: [
      "house washing Wheeling WV",
      "soft wash house cleaning Ohio Valley",
      "siding cleaning near me",
      "exterior house cleaning",
    ],
    featured: true,
  },
  {
    slug: "roof-washing",
    name: "Roof Washing",
    shortName: "Roof Washing",
    category: "cleaning",
    icon: "roof",
    tagline: "Erase black streaks, protect your roof",
    summary:
      "Soft-wash roof cleaning that removes black algae streaks and moss — extending shingle life without damage.",
    heroHeadline: "Roof Washing That Removes Black Streaks for Good",
    heroSub:
      "Those black streaks are living algae eating your shingles. Our no-pressure soft wash kills it at the source and restores your roof's appearance.",
    problem:
      "Black streaks, moss, and lichen aren't just ugly — they shorten the life of your roof and can void some warranties.",
    outcome:
      "A clean, uniform roof that adds years of life and instantly lifts the look of your entire home.",
    description:
      "Roof algae (Gloeocapsa magma) feeds on shingle limestone and spreads year after year. We apply a manufacturer-approved soft wash treatment that eliminates algae, moss, and lichen at the root — no high pressure, no broken shingles, no walking damage. The result is a clean roof and a longer service life.",
    benefits: [
      "Eliminates black streaks, moss & lichen",
      "No-pressure — protects shingle granules",
      "Extends the usable life of your roof",
      "Manufacturer-approved soft wash method",
      "Safe for asphalt, metal & flat roofs",
      "Fully insured, trained technicians",
    ],
    bestFor: [
      "Roofs with black streaking or moss",
      "Homeowners avoiding premature roof replacement",
      "Shaded or north-facing roofs",
    ],
    priceNote: "Quoted by roof size, pitch & condition after a free assessment.",
    metaTitle: "Roof Washing & Black Streak Removal | Wheeling WV & Ohio Valley",
    metaDescription:
      "Soft-wash roof cleaning in the Ohio Valley & Wheeling, WV. Safely remove black algae streaks, moss & lichen and extend roof life. No pressure. Free estimate.",
    keywords: [
      "roof cleaning Wheeling WV",
      "black streak removal Ohio Valley",
      "soft wash roof washing",
      "roof moss removal near me",
    ],
  },
  {
    slug: "soft-washing",
    name: "Exterior Soft Washing",
    shortName: "Soft Washing",
    category: "cleaning",
    icon: "droplet",
    tagline: "Gentle cleaning for delicate surfaces",
    summary:
      "The safe, pressure-free method for fences, decks, soffits, gutters, awnings, and other surfaces pressure can ruin.",
    heroHeadline: "Soft Washing for the Surfaces Pressure Washing Can Ruin",
    heroSub:
      "Fences, decks, soffits, gutters, screens, and painted surfaces need a gentler touch. Our soft wash cleans deeply without the damage.",
    problem:
      "High-pressure washing can splinter wood, force water behind siding, strip paint, and dent gutters.",
    outcome:
      "A deep, even clean on every delicate surface of your property — with zero risk of pressure damage.",
    description:
      "Soft washing combines low pressure with specialized cleaning solutions to lift grime, mildew, and organic buildup from surfaces that high pressure would destroy. It's the right call for wood fences and decks, vinyl soffits, exterior screens, gutter faces, awnings, and painted trim — anywhere you want clean without collateral damage.",
    benefits: [
      "Safe for wood, vinyl, screens & paint",
      "Cleans deeper than pressure-only methods",
      "Prevents splintering & forced-in water",
      "Brightens fences, decks & gutters",
      "Even, streak-free finish",
      "Tailored solution per surface type",
    ],
    bestFor: [
      "Wood fences & decks losing their color",
      "Dirty soffits, gutters & awnings",
      "Delicate or painted exterior surfaces",
    ],
    priceNote: "Bundled with house washing for the best value. Free walkthrough quote.",
    metaTitle: "Exterior Soft Washing Services | Wheeling WV & Ohio Valley",
    metaDescription:
      "Professional exterior soft washing in the Ohio Valley & Wheeling, WV for fences, decks, gutters, soffits & more. Deep clean without pressure damage. Free estimate.",
    keywords: [
      "soft washing Wheeling WV",
      "exterior soft wash Ohio Valley",
      "fence and deck cleaning",
      "gutter and soffit cleaning",
    ],
  },
  {
    slug: "concrete-cleaning",
    name: "Concrete Cleaning",
    shortName: "Concrete Cleaning",
    category: "cleaning",
    icon: "concrete",
    tagline: "Driveways & patios that look brand new",
    summary:
      "Surface cleaning that lifts oil, rust, algae, and years of grime from driveways, sidewalks, and patios.",
    heroHeadline: "Concrete Cleaning That Makes Driveways & Patios Look New",
    heroSub:
      "Even, streak-free results on concrete, pavers, and brick — lifting oil stains, rust, algae, and ground-in dirt.",
    problem:
      "Stained, streaky, algae-covered concrete drags down the look of an otherwise well-kept property.",
    outcome:
      "Bright, uniform driveways, walkways, and patios that make the whole property feel cared for.",
    description:
      "We use surface cleaners and the right pressure for the surface to deliver an even, swirl-free clean — no zebra striping. From oil-stained driveways to algae-slick patios and paver walkways, we restore the original look and make your hardscape safer to walk on.",
    benefits: [
      "Even, swirl-free results (no zebra stripes)",
      "Lifts oil, rust, algae & ground-in dirt",
      "Safer, slip-resistant surfaces",
      "Driveways, sidewalks, patios & pool decks",
      "Pairs perfectly with sealing",
      "Boosts curb appeal fast & affordably",
    ],
    bestFor: [
      "Stained or streaky driveways",
      "Slippery, algae-covered patios & pool decks",
      "Pre-sealing surface prep",
    ],
    priceNote: "Priced by square footage. Bundle with sealing to save.",
    metaTitle: "Concrete & Driveway Cleaning | Wheeling WV & Ohio Valley",
    metaDescription:
      "Professional concrete, driveway & patio cleaning in the Ohio Valley & Wheeling, WV. Remove oil, rust & algae with even, streak-free results. Free estimate.",
    keywords: [
      "concrete cleaning Wheeling WV",
      "driveway cleaning Ohio Valley",
      "patio pressure washing",
      "paver cleaning near me",
    ],
  },
  {
    slug: "concrete-paver-sealing",
    name: "Concrete & Paver Sealing",
    shortName: "Concrete Sealing",
    category: "cleaning",
    icon: "shield",
    tagline: "Lock in the clean, protect your investment",
    summary:
      "Professional sealing that protects pavers and concrete from stains, weeds, and weather — and locks in a rich finish.",
    heroHeadline: "Concrete & Paver Sealing That Protects Your Investment",
    heroSub:
      "Seal out stains, lock in joint sand, stop weeds, and give pavers a rich, finished look that lasts for years.",
    problem:
      "Unsealed pavers shift, sprout weeds, and soak up oil and stains — and concrete spalls and fades over time.",
    outcome:
      "Hardscape that stays cleaner, resists stains and weather, and keeps that just-installed look for years.",
    description:
      "After a thorough clean, we apply a premium sealer matched to your surface and the finish you want — from natural matte to a wet-look sheen. Sealing stabilizes paver joint sand, blocks weed growth, repels oil and water, and shields concrete from freeze-thaw damage. It's the single best way to protect and extend the life of your hardscape.",
    benefits: [
      "Repels oil, water & stains",
      "Locks in joint sand; reduces weeds & ants",
      "Protects against freeze-thaw & fading",
      "Choose natural matte or wet-look sheen",
      "Extends the life of pavers & concrete",
      "Cleaned & sealed in one project",
    ],
    bestFor: [
      "New or recently cleaned paver patios & walkways",
      "Driveways exposed to oil & road salt",
      "Homeowners wanting low-maintenance hardscape",
    ],
    priceNote: "Includes surface cleaning + premium sealer. Quoted by square footage.",
    metaTitle: "Concrete & Paver Sealing Services | Wheeling WV & Ohio Valley",
    metaDescription:
      "Professional concrete & paver sealing in the Ohio Valley & Wheeling, WV. Protect against stains, weeds & weather with a rich, lasting finish. Free estimate.",
    keywords: [
      "paver sealing Wheeling WV",
      "concrete sealing Ohio Valley",
      "driveway sealing near me",
      "patio paver sealer",
    ],
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Exterior Cleaning",
    shortName: "Commercial Cleaning",
    category: "cleaning",
    icon: "building",
    tagline: "Spotless storefronts & properties, on schedule",
    summary:
      "Reliable exterior cleaning for storefronts, plazas, HOAs, and facilities — building washing, flatwork, and more.",
    heroHeadline: "Commercial Exterior Cleaning That Protects Your Brand",
    heroSub:
      "Clean storefronts, sidewalks, dumpster pads, and facades — on a schedule that fits your business and budget.",
    problem:
      "Dirty entrances, gum-stained sidewalks, and grimy facades quietly cost you customers and tenant goodwill.",
    outcome:
      "A property that looks open, cared-for, and worth doing business with — maintained on a dependable schedule.",
    description:
      "From single storefronts to multi-building plazas, HOAs, restaurants, and property managers, Rally delivers dependable commercial exterior cleaning: building soft washing, sidewalk and flatwork cleaning, gum and grease removal, dumpster pads, awnings, and more. Fully insured, scheduled around your hours, with consistent, accountable results.",
    benefits: [
      "Building washing, flatwork & gum removal",
      "Scheduled around your business hours",
      "One vendor for the whole property",
      "Fully insured; COIs available on request",
      "Consistent, accountable crews",
      "Recurring maintenance plans available",
    ],
    bestFor: [
      "Retail, restaurants & storefronts",
      "Property managers, HOAs & plazas",
      "Offices, medical & industrial facilities",
    ],
    priceNote:
      "Custom quotes for one-time or recurring service. Volume & contract pricing available.",
    metaTitle: "Commercial Exterior & Building Cleaning | Wheeling WV & Ohio Valley",
    metaDescription:
      "Commercial exterior cleaning in the Ohio Valley & Wheeling, WV — storefronts, sidewalks, building washing & more. Insured, scheduled, reliable. Free quote.",
    keywords: [
      "commercial pressure washing Wheeling WV",
      "commercial exterior cleaning Ohio Valley",
      "storefront cleaning near me",
      "building washing services",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export const lightingServices = services.filter((s) => s.category === "lighting");
export const cleaningServices = services.filter((s) => s.category === "cleaning");
export const featuredServices = services.filter((s) => s.featured);
