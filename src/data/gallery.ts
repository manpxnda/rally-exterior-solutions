/**
 * GALLERY / PROOF assets.
 * ----------------------------------------------------------------------------
 * Before/after items power the homepage proof slider and the /gallery page.
 * `before` / `after` are OPTIONAL image paths — when omitted a labeled
 * placeholder renders so the layout stays intact. To add real photos:
 *   1. Drop files in /public/images/gallery/
 *   2. Set before/after to "/images/gallery/your-file.jpg"
 */
export type BeforeAfter = {
  id: string;
  title: string;
  service: string; // service slug
  location: string;
  before?: string;
  after?: string;
};

export const beforeAfters: BeforeAfter[] = [
  {
    id: "house-1",
    title: "Vinyl Siding Soft Wash",
    service: "house-washing",
    location: "Wheeling, WV",
  },
  {
    id: "roof-1",
    title: "Black Streak Roof Removal",
    service: "roof-washing",
    location: "Moundsville, WV",
  },
  {
    id: "concrete-1",
    title: "Driveway Restoration",
    service: "concrete-cleaning",
    location: "St. Clairsville, OH",
  },
  {
    id: "lighting-1",
    title: "Permanent Lighting — Holiday Scene",
    service: "permanent-lighting",
    location: "Bridgeport, OH",
  },
  {
    id: "paver-1",
    title: "Paver Patio Clean & Seal",
    service: "concrete-paver-sealing",
    location: "Wheeling, WV",
  },
  {
    id: "commercial-1",
    title: "Storefront Building Wash",
    service: "commercial-cleaning",
    location: "Martins Ferry, OH",
  },
];

/**
 * Showcase gallery (single images, e.g. finished lighting / clean exteriors).
 * Optional `src`; placeholder renders when omitted.
 */
export type ShowcaseItem = {
  id: string;
  title: string;
  service: string;
  src?: string;
};

export const showcase: ShowcaseItem[] = [
  { id: "show-1", title: "Warm White Roofline", service: "permanent-lighting" },
  { id: "show-2", title: "Festive Red & Green", service: "holiday-lighting" },
  { id: "show-3", title: "Freshly Washed Brick Home", service: "house-washing" },
  { id: "show-4", title: "Restored Paver Walkway", service: "concrete-paver-sealing" },
  { id: "show-5", title: "Game-Day Color Scene", service: "permanent-lighting" },
  { id: "show-6", title: "Clean Commercial Facade", service: "commercial-cleaning" },
];
