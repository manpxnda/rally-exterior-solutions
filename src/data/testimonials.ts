/**
 * TESTIMONIALS — real Google reviews from Rally customers.
 * `service` maps to a service slug so relevant reviews surface on service pages.
 * `location` holds a short project-context tag.
 * Names shortened to first name + last initial (public reviews).
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
      "Jason did an incredible job power washing our house — it looks brand new again! He was super easy to work with, didn't make things overly complicated, and got us a great rate within our budget. Will definitely recommend to friends, family and neighbors!",
    name: "Damon M.",
    location: "House washing",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "We had the best experience with Rally! Beyond professional, quick installation, and excellent instructions. On top of that our house looks amazing. So thankful we used Rally for our permanent lighting!",
    name: "Jessica G.",
    location: "Permanent lighting",
    service: "permanent-lighting",
    rating: 5,
  },
  {
    quote:
      "Our church building hadn't been washed in years and our gutters were plugged. In 8 hours all the black and green were gone — the gutters were black and now they're white again. They did a great job and never quit until the job was done.",
    name: "Mike & Jana T.",
    location: "Church building",
    service: "commercial-cleaning",
    rating: 5,
  },
  {
    quote:
      "Jason did a phenomenal job power washing our entire driveway, sidewalk, and the pergola at the back of our house. The areas look brand new.",
    name: "Callie S.",
    location: "Driveway & concrete",
    service: "concrete-cleaning",
    rating: 5,
  },
  {
    quote:
      "I highly recommend Rally to all friends and family. Jason was extremely professional, polite, and kind. He installed Christmas lights on our home and we could not be more pleased with the results. We're definitely customers for life now!",
    name: "Alexa K.",
    location: "Christmas lighting",
    service: "holiday-lighting",
    rating: 5,
  },
  {
    quote:
      "My house looks like a new house! If I were ready to sell, I'd list it tomorrow. Not only would it shine with curb appeal, but I feel certain it would increase the value as well. Excellent job!",
    name: "Pattie H.",
    location: "House washing",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "Jason and his co-worker did amazing work cleaning my white wood shingle home — there was a lot of dirt and even algae on it. It now appears freshly painted, even though it's been several years since it actually was.",
    name: "John H.",
    location: "Wood shingle home",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "Excellent customer service — the employees are extremely courteous and friendly. Affordable prices and fantastic work. My siding looks almost brand new. I'd highly recommend them to anyone.",
    name: "Diane K.",
    location: "Siding wash",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "Just had my house and garage washed — fantastic cleaning job, friendly and courteous service. Highly recommend to all!",
    name: "Pamela D.",
    location: "House & garage",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "They did our exterior lights for Christmas and did a fabulous job! Extremely polite, accommodating, and meticulous. So excited for the holidays!",
    name: "Susan K.",
    location: "Christmas lighting",
    service: "holiday-lighting",
    rating: 5,
  },
  {
    quote:
      "Jason was awesome to work with and very detailed in making your vision bright. Would highly recommend for lighting. Thanks Jason!",
    name: "Betty S.",
    location: "Permanent lighting",
    service: "permanent-lighting",
    rating: 5,
  },
  {
    quote:
      "As a business owner myself, I'm very impressed with this company. They're fast, effective, and extremely responsive. I'd definitely recommend them to anyone looking for reliable, professional service.",
    name: "Joy H.",
    location: "Local business owner",
    service: "commercial-cleaning",
    rating: 5,
  },
  {
    quote:
      "Jason used a commercial-grade power washer to clean my driveway and sidewalks and saved me hours of work. The concrete turned out great. I'd highly recommend.",
    name: "Tim R.",
    location: "Driveway & sidewalks",
    service: "concrete-cleaning",
    rating: 5,
  },
  {
    quote:
      "Rally answered my call right away, set up an appointment for an estimate, quoted a price, showed up on the agreed day, did an excellent job, and charged exactly the price quoted. I'm so happy with the work!",
    name: "Carla W.",
    location: "House washing",
    service: "house-washing",
    rating: 5,
  },
  {
    quote:
      "Jason did an amazing job cleaning my driveway and sidewalks — they look brand new! He's very knowledgeable and pleasant. I'd highly recommend him.",
    name: "K.M.",
    location: "Driveway & sidewalks",
    service: "concrete-cleaning",
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
