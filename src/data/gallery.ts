/**
 * GALLERY / PROOF assets — real Rally project photos.
 * ----------------------------------------------------------------------------
 * Before/after pairs power the homepage proof slider, the gallery, and each
 * service page's proof section. All pairs are portrait phone photos, shown in
 * the portrait (3:4) slider. To add more: drop matched files in
 * /public/images/gallery/ and add an entry here.
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
    title: "House Soft Wash",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/house-washing-before-1.jpg",
    after: "/images/gallery/house-washing-after-1.jpg",
  },
  {
    id: "roof-1",
    title: "Roof Cleaning",
    service: "roof-washing",
    location: "Ohio Valley",
    before: "/images/gallery/roof-washing-before-1.jpg",
    after: "/images/gallery/roof-washing-after-1.jpg",
  },
  {
    id: "concrete-1",
    title: "Concrete Walkway Cleaning",
    service: "concrete-cleaning",
    location: "Ohio Valley",
    before: "/images/gallery/concrete-cleaning-before-1.jpg",
    after: "/images/gallery/concrete-cleaning-after-1.jpg",
  },
  {
    id: "house-3",
    title: "Exterior House Washing",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/house-washing-before-3.jpg",
    after: "/images/gallery/house-washing-after-3.jpg",
  },
  {
    id: "concrete-3",
    title: "Driveway Cleaning",
    service: "concrete-cleaning",
    location: "Ohio Valley",
    before: "/images/gallery/concrete-cleaning-before-3.jpg",
    after: "/images/gallery/concrete-cleaning-after-3.jpg",
  },
  {
    id: "house-5",
    title: "Algae & Mildew Removal",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/house-washing-before-5.jpg",
    after: "/images/gallery/house-washing-after-5.jpg",
  },
  {
    id: "gutter-1",
    title: "Gutter Cleanout",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/gutter-cleaning-before-1.jpg",
    after: "/images/gallery/gutter-cleaning-after-1.jpg",
  },
  {
    id: "fence-cleaning-1",
    title: "Vinyl Fence Cleaning",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/fence-cleaning-before-1.jpg",
    after: "/images/gallery/fence-cleaning-after-1.jpg",
  },
  {
    id: "gutter-3",
    title: "Gutter Cleaning",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/gutter-cleaning-before-3.jpg",
    after: "/images/gallery/gutter-cleaning-after-3.jpg",
  },
  {
    id: "fence-restoration-1",
    title: "Wood Fence Restoration",
    service: "house-washing",
    location: "Ohio Valley",
    before: "/images/gallery/fence-restoration-before-1.jpg",
    after: "/images/gallery/fence-restoration-after-1.jpg",
  },
];

/**
 * Showcase gallery — finished single-image projects (lighting).
 */
export type ShowcaseItem = {
  id: string;
  title: string;
  service: string;
  src?: string;
};

export const showcase: ShowcaseItem[] = [
  {
    id: "perm-warm-white",
    title: "Permanent Warm White Lighting",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-warm-white.jpg",
  },
  {
    id: "xmas-warm-white",
    title: "Warm White Christmas Roofline",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-warm-white.jpg",
  },
  {
    id: "perm-independence",
    title: "Red, White & Blue Scene",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-independence.jpg",
  },
  {
    id: "xmas-multicolor",
    title: "Multicolor Holiday Display",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-multicolor.jpg",
  },
  {
    id: "perm-pure-white",
    title: "Permanent Pure White",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-pure-white.jpg",
  },
  {
    id: "xmas-warm-white-brick",
    title: "Warm White on Brick",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-warm-white-brick.jpg",
  },
  {
    id: "perm-green-blue",
    title: "Custom Color Scene",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-green-blue.jpg",
  },
  {
    id: "xmas-cool-white",
    title: "Cool White Christmas Lights",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-cool-white.jpg",
  },
  {
    id: "perm-forward-facing",
    title: "Architectural Track Lighting",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-forward-facing.jpg",
  },
  {
    id: "xmas-gingerbread",
    title: "Gingerbread Multicolor",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-gingerbread.jpg",
  },
  {
    id: "perm-pink",
    title: "Custom Holiday Color",
    service: "permanent-lighting",
    src: "/images/lighting/permanent-pink.jpg",
  },
  {
    id: "xmas-white",
    title: "Classic White Christmas Lights",
    service: "holiday-lighting",
    src: "/images/lighting/christmas-white.jpg",
  },
];
