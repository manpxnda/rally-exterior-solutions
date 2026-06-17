/**
 * LOCATION (service-area) landing pages — local SEO.
 * ----------------------------------------------------------------------------
 * Each entry generates a page at /locations/[slug] targeting "[service] [city]"
 * style searches. Keep the `intro` + `context` genuinely UNIQUE per city
 * (Google penalizes near-duplicate "doorway" pages). To add a city, copy a
 * block and write distinct local copy.
 */
export type Location = {
  slug: string;
  city: string;
  state: "WV" | "OH";
  stateName: string;
  county: string;
  /** unique 1–2 sentence local intro (used as H1 description + meta) */
  intro: string;
  /** unique paragraph on why exterior services matter locally */
  context: string;
  /** nearby towns / neighborhoods we also serve */
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "wheeling-wv",
    city: "Wheeling",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Wheeling's historic homes and tree-lined neighborhoods — from Woodsdale and Edgwood to Wheeling Island — are beautiful, but Ohio River humidity is hard on them. Rally keeps Wheeling properties bright, clean, and well-lit year-round.",
    context:
      "Older brick and wood-sided homes here are prone to algae streaks, black roof staining, and grimy concrete. Our low-pressure soft-wash methods clean them safely without damage, and our permanent lighting makes historic facades shine after dark.",
    nearby: ["Woodsdale", "Edgwood", "Elm Grove", "Wheeling Island", "Triadelphia"],
  },
  {
    slug: "st-clairsville-oh",
    city: "St. Clairsville",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "St. Clairsville's hilltop neighborhoods and newer subdivisions off National Road deserve to look their best. Rally handles the exterior cleaning and lighting so your home or business stands out.",
    context:
      "From vinyl-sided homes near the Ohio Valley Mall to brick storefronts downtown, we soft-wash siding, brighten driveways and walkways, and install permanent lighting across St. Clairsville and Belmont County.",
    nearby: ["Lansing", "Morristown", "Barton", "Belmont"],
  },
  {
    slug: "moundsville-wv",
    city: "Moundsville",
    state: "WV",
    stateName: "West Virginia",
    county: "Marshall County",
    intro:
      "From the riverfront to the neighborhoods around the Grave Creek Mound, Moundsville homes take a beating from river humidity and road grime. Rally restores their curb appeal.",
    context:
      "We remove the black roof streaks and green siding algae common on Moundsville's older homes, clean driveways and sidewalks, and light up rooflines for the holidays and all year.",
    nearby: ["Glen Dale", "McMechen", "Benwood", "Cameron"],
  },
  {
    slug: "martins-ferry-oh",
    city: "Martins Ferry",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Martins Ferry's classic river-town homes have great bones — Rally keeps their siding, roofs, and walkways looking sharp and their exteriors glowing at night.",
    context:
      "The Ohio River valley's humidity means mildew and algae build up fast here. Our soft washing clears it safely, and our lighting brings out the character of Martins Ferry's older homes.",
    nearby: ["Bridgeport", "Bellaire", "Brookside", "Yorkville"],
  },
  {
    slug: "bridgeport-oh",
    city: "Bridgeport",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Right across the river from Wheeling, Bridgeport homes and businesses get the same Ohio Valley grime — and the same first-class treatment from Rally.",
    context:
      "We house-wash, roof-wash, and clean concrete throughout Bridgeport, plus permanent and holiday lighting that makes your property pop along the river corridor.",
    nearby: ["Wheeling", "Martins Ferry", "Brookside", "Lansing"],
  },
  {
    slug: "bellaire-oh",
    city: "Bellaire",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Bellaire's brick streets and historic stone-and-brick homes are full of character. Rally keeps them clean and bright without ever risking damage to the masonry.",
    context:
      "Brick and stone exteriors need a gentle touch — our soft-wash approach removes algae and grime safely, and our lighting accents Bellaire's classic architecture beautifully.",
    nearby: ["Shadyside", "Neffs", "Bridgeport", "Powhatan Point"],
  },
  {
    slug: "wellsburg-wv",
    city: "Wellsburg",
    state: "WV",
    stateName: "West Virginia",
    county: "Brooke County",
    intro:
      "Wellsburg's riverfront and historic downtown deserve to shine. Rally handles exterior cleaning and lighting for homes and businesses throughout Brooke County.",
    context:
      "From the older homes near the river to newer builds in the hills, we wash siding and roofs, restore concrete and decks, and install lighting that lasts season after season.",
    nearby: ["Follansbee", "Bethany", "Beech Bottom", "Colliers"],
  },
  {
    slug: "barnesville-oh",
    city: "Barnesville",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Barnesville's stately Victorian homes are some of the most beautiful in the region — and Rally keeps them that way, from clean siding and roofs to dazzling holiday lighting.",
    context:
      "Ornate older homes need careful, damage-free cleaning. Our soft washing protects delicate trim and paint, and our permanent lighting shows off Barnesville's architecture year-round.",
    nearby: ["Bethesda", "Belmont", "Quaker City", "Morristown"],
  },
  {
    slug: "triadelphia-wv",
    city: "Triadelphia",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Just east of Wheeling along the National Road, Triadelphia and the booming Highlands corridor are home to growing neighborhoods and busy storefronts. Rally keeps them clean and brightly lit.",
    context:
      "From new subdivisions in the hills to retail along The Highlands, Triadelphia properties pick up road grime and algae fast. We soft-wash homes and businesses, brighten concrete, and install lighting that makes them stand out day or night.",
    nearby: ["Valley Grove", "Dallas", "Elm Grove", "Wheeling"],
  },
  {
    slug: "bethlehem-wv",
    city: "Bethlehem",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "A quiet village on the hilltops just south of Wheeling, Bethlehem's well-kept homes deserve exteriors that match. Rally delivers premium cleaning and lighting close to home.",
    context:
      "Bethlehem's tree-lined streets mean shade, leaf debris, and roof algae are common. We soft-wash siding and roofs, brighten driveways and walkways, and install permanent lighting for effortless year-round curb appeal.",
    nearby: ["Mozart", "Wheeling", "Elm Grove", "Woodsdale"],
  },
  {
    slug: "powhatan-point-oh",
    city: "Powhatan Point",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Tucked along the Ohio River in southern Belmont County, Powhatan Point's riverfront homes take on humidity, mildew, and roof staining. Rally restores their curb appeal and lights them up.",
    context:
      "River-valley moisture is hard on siding and roofs here. Our low-pressure soft washing removes algae and black streaks without damage, and our concrete cleaning and lighting round out a fresh, cared-for look.",
    nearby: ["Clarington", "Sardis", "Shadyside", "Bellaire"],
  },
  {
    slug: "cadiz-oh",
    city: "Cadiz",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "The seat of Harrison County and birthplace of Clark Gable, Cadiz pairs a historic downtown with hilltop homes that deserve to look their best. Rally brings premium exterior cleaning and lighting to town.",
    context:
      "Harrison County's rolling, wooded terrain means homes here battle shade, moss, and roof algae. Our soft-wash methods clear them safely, and our permanent lighting gives Cadiz's classic homes year-round curb appeal.",
    nearby: ["Hopedale", "Jewett", "Scio", "Harrisville"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
