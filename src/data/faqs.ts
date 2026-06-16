/**
 * FAQs — answer the real objections that stop people from booking.
 * Used on the homepage + emitted as FAQPage schema for SEO rich results.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does it cost?",
    a: "Every property is different, so we give you a clear, itemized quote up front — usually same-day, with no hidden fees and no obligation.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every estimate is 100% free and no-pressure. Tell us what you're interested in and we'll assess your property, answer your questions, and give you a firm price in writing.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. Rally Exterior Solutions is fully insured, and our technicians are trained on every surface and method we use. We're happy to provide a certificate of insurance for commercial or HOA work.",
  },
  {
    q: "Will pressure washing damage my home?",
    a: "We use the right method for every surface. Siding, roofs, and delicate areas get low-pressure 'soft washing' — so there's no risk of cracked siding, broken shingles, or water forced behind walls.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the Ohio Valley and Wheeling, WV region — roughly a 50-mile radius including St. Clairsville, Bridgeport, Martins Ferry, Bellaire, Moundsville, Wellsburg, and surrounding communities. Not sure if you're in range? Just ask.",
  },
  {
    q: "Is permanent lighting really invisible during the day?",
    a: "Yes. The track is color-matched to your trim and tucked under the eaves, so it disappears in daylight. At night, you control everything — warm white accents, holiday colors, or millions of color options — right from your phone.",
  },
  {
    q: "How soon can you get me on the schedule?",
    a: "Most cleaning projects can be scheduled within days. Permanent lighting and holiday lighting are seasonal and fill up fast, so we recommend reserving your spot early. Reach out and we'll find a date that works.",
  },
  {
    q: "What if I'm not happy with the results?",
    a: "We don't consider a job done until you're thrilled with it. If something isn't right, we make it right — that's the Rally standard.",
  },
];
