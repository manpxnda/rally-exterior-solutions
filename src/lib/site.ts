/**
 * SINGLE SOURCE OF TRUTH for business information.
 * ----------------------------------------------------------------------------
 * Edit values here and they update everywhere on the site (header, footer,
 * schema.org markup, contact page, CTAs, etc.). No code changes required.
 *
 * ⚠️  Replace the PLACEHOLDER phone/address/social values before launch.
 */

export const site = {
  name: "Rally Exterior Solutions",
  shortName: "Rally",
  // Legal entity — "Rally Exterior Solutions" is a trade name (DBA) of this LLC.
  // Must match the A2P 10DLC carrier registration exactly.
  legalName: "Rally Lawn Care Services LLC",
  tagline: "Brighter Homes. Cleaner Properties. Zero Hassle.",
  // One-sentence positioning used in meta descriptions & hero subhead.
  description:
    "Premium permanent lighting, Christmas lights, pressure washing & exterior cleaning across the Ohio Valley & Wheeling, WV. 4.9★ from local homeowners. Free, no-pressure estimates.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://rallyexteriorsolutions.com",

  // --- Contact (PLACEHOLDERS — update before launch) ----------------------
  phoneDisplay: "(740) 208-8632",
  phoneHref: "tel:+17402088632",
  // `?&body=` works cross-platform (iOS + Android). Pre-fills the text so
  // customers send in one tap.
  smsHref:
    "sms:+17402088632?&body=Hi%20Rally!%20I%27d%20like%20a%20free%20estimate%20for%20",
  email: "info@rallyexteriorsolutions.com",

  // Used for the Local Business schema + footer. A service-area business can
  // hide the street address; keep city/region/postal for local SEO.
  address: {
    // Physical business address — must match the A2P 10DLC carrier registration.
    street: "215 Walker Street",
    city: "Tiltonsville",
    region: "OH",
    regionName: "Ohio",
    postalCode: "43963",
    country: "US",
  },

  // Geo center of the service area (Wheeling, WV) — used by LocalBusiness schema.
  geo: {
    latitude: 40.0639,
    longitude: -80.7209,
    serviceRadiusMiles: 50,
  },

  hours: [
    { day: "Monday", open: "08:00", close: "18:00" },
    { day: "Tuesday", open: "08:00", close: "18:00" },
    { day: "Wednesday", open: "08:00", close: "18:00" },
    { day: "Thursday", open: "08:00", close: "18:00" },
    { day: "Friday", open: "08:00", close: "18:00" },
    { day: "Saturday", open: "09:00", close: "16:00" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ],

  hoursShort: "Mon–Fri 8a–6p · Sat 9a–4p",

  // --- Trust / proof signals -----------------------------------------------
  // ⚠️ CONFIRM these against your Google Business Profile before relying on
  // them in ads. reviewCount/projectsCompleted are conservative estimates.
  stats: {
    yearFounded: 2021,
    projectsCompleted: "500+",
    reviewCount: 34,
    reviewRating: 4.9,
    responseTime: "Same-day",
  },

  // --- Social / profile links (leave blank to hide) -----------------------
  social: {
    google: "https://www.google.com/search?q=Rally+Exterior+Solutions",
    // Placeholder FB/IG URLs removed (A2P review: no broken/placeholder links).
    // Add the real profile URLs here to bring the footer icons back.
    facebook: "",
    instagram: "",
  },

  // The headline offer used in CTAs and the conversion banner.
  offer: {
    headline: "Get a Free, No-Pressure Estimate",
    sub: "Most quotes back same-day. No hidden fees, ever.",
    // Seasonal promo — set `active: false` to hide the promo bar sitewide.
    promo: {
      active: true,
      text: "Christmas light installs are booking now — the best dates go first",
      cta: "Reserve your date",
      // Where the promo CTA points (defaults to /contact if omitted).
      href: "/services/holiday-lighting",
    },
  },
} as const;

// Primary regional keywords used across copy + schema for local SEO.
export const serviceAreaCities = [
  "Wheeling, WV",
  "St. Clairsville, OH",
  "Bridgeport, OH",
  "Martins Ferry, OH",
  "Bellaire, OH",
  "Moundsville, WV",
  "Triadelphia, WV",
  "Wellsburg, WV",
  "Bethlehem, WV",
  "Powhatan Point, OH",
  "Barnesville, OH",
  "Cadiz, OH",
] as const;

export const regionLabel = "Ohio Valley & Wheeling, WV";

export type Site = typeof site;
