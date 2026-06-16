/**
 * TESTIMONIALS — replace with real, verbatim reviews before/at launch.
 * Keep them specific and outcome-focused; specificity converts.
 * `service` is optional and used to surface relevant reviews on service pages.
 */
export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service?: string; // matches a service slug when relevant
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The permanent lighting completely changed how our house looks at night. We set it red, white and blue for the Fourth and warm white the rest of the year. Worth every penny — and no more ladders.",
    name: "Mark D.",
    location: "St. Clairsville, OH",
    service: "permanent-lighting",
    rating: 5,
  },
  {
    quote:
      "Rally showed up when they said they would, gave me a clear price up front, and our siding looks brand new. No surprises, no mess left behind. Exactly what I wanted from a contractor.",
    name: "Jennifer P.",
    location: "Wheeling, WV",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "Those black streaks on our roof were embarrassing. They were gone in an afternoon and the crew was careful and professional the whole time. Highly recommend.",
    name: "Tom & Linda R.",
    location: "Moundsville, WV",
    service: "roof-washing",
    rating: 5,
  },
  {
    quote:
      "We hired Rally for our Christmas lights and it was the best decision of the season. Designed it, hung it, came back when a section needed a tweak, then took it all down. We just enjoyed it.",
    name: "Ashley M.",
    location: "Bridgeport, OH",
    service: "holiday-lighting",
    rating: 5,
  },
  {
    quote:
      "Our driveway and paver patio look like the day they were installed. They cleaned and sealed everything and walked me through exactly what they were doing. True professionals.",
    name: "Greg S.",
    location: "Wheeling, WV",
    service: "concrete-paver-sealing",
    rating: 5,
  },
  {
    quote:
      "We use Rally for our storefront and sidewalks on a recurring schedule. Reliable, insured, and the property has never looked better. Our customers notice.",
    name: "Dana K.",
    location: "Martins Ferry, OH",
    service: "commercial-cleaning",
    rating: 5,
  },
];

export function testimonialsForService(slug: string, fallbackCount = 3): Testimonial[] {
  const matched = testimonials.filter((t) => t.service === slug);
  if (matched.length >= 2) return matched;
  return [...matched, ...testimonials.filter((t) => t.service !== slug)].slice(
    0,
    fallbackCount
  );
}
