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

/**
 * HOMEPAGE (lighting) FAQs — the questions homeowners ask before they call
 * about permanent or Christmas lighting. Emitted as FAQPage schema on "/".
 * Business-policy specifics (warranty terms, booking windows, ownership of
 * Christmas lights) are intentionally general — confirm before adding detail.
 */
export const lightingFaqs: Faq[] = [
  {
    q: "Can you see permanent lights during the day?",
    a: "Barely. The track sits under the roof edge and is color-matched to your trim, so from the street most people don't notice it until it's on.",
  },
  {
    q: "Can I use normal warm white every night, or is it just colors?",
    a: "Both. Warm architectural white is the everyday look most homeowners run. Full color — Christmas, game day, parties — is there when you want it, not all the time.",
  },
  {
    q: "Can I schedule the lights?",
    a: "Yes. Set your everyday schedule once and it runs itself. Change scenes any time from your phone.",
  },
  {
    q: "What happens if something stops working?",
    a: "You contact Rally, and Rally owns the next step. We'll diagnose it, schedule the fix, and keep you updated until it's resolved.",
  },
  {
    q: "Can the permanent system be expanded later?",
    a: "Yes. Many homeowners start with the front of the home and add rooflines, landscape lighting, or entertaining areas later.",
  },
  {
    q: "Do I provide the Christmas lights?",
    a: "No. Rally provides commercial-grade lights designed for your home, installs them, keeps them working through the season, and takes them down in January.",
  },
  {
    q: "Do you take the Christmas lights down?",
    a: "Yes. We return after the season, remove everything, label it, and store it for next year. You never touch a ladder.",
  },
  {
    q: "What if a Christmas light goes out during the season?",
    a: "Let us know and we'll come fix it. In-season maintenance is part of the service.",
  },
  {
    q: "Do I have to be home?",
    a: "Usually not. Most installations and removals happen outside the home. We'll confirm the details with you before the visit.",
  },
  {
    q: "Can you quote my Christmas lights remotely?",
    a: "Often, yes. Send your address and a photo of the front of the home and we can usually design and quote from there. Permanent lighting starts with a design consultation at the home.",
  },
];
