import type { Metadata } from "next";
import { site, regionLabel } from "@/lib/site";
import { lightingFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";

import { LightingHero } from "@/components/home/LightingHero";
import { TwoPaths } from "@/components/home/TwoPaths";
import { PermanentStory } from "@/components/home/PermanentStory";
import { DayNight } from "@/components/home/DayNight";
import { PermanentProcess } from "@/components/home/PermanentProcess";
import { ChristmasExperience } from "@/components/home/ChristmasExperience";
import { ChristmasGallery } from "@/components/home/ChristmasGallery";
import { WhyRallyLighting } from "@/components/home/WhyRallyLighting";
import { LandscapeTeaser } from "@/components/home/LandscapeTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { OtherServicesNote } from "@/components/home/OtherServicesNote";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

/**
 * HOMEPAGE — Rally's front door is exterior lighting (2026 repositioning).
 * Permanent + Christmas carry ~90% of the emphasis; landscape is secondary.
 * Legacy cleaning services are NOT featured here — they keep their own pages,
 * the "Other Services" menu, and the footer.
 */
export const metadata: Metadata = {
  title: `Permanent, Christmas & Landscape Lighting — Wheeling, WV & the Ohio Valley | ${site.name}`,
  description: `Professional exterior lighting for homes across Wheeling, WV and the Ohio Valley. Permanent lighting designed around your home, Christmas lighting handled start to finish, and landscape lighting beyond the roofline — installed and supported by Rally.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — Exterior Lighting for the Ohio Valley`,
    description: `Permanent lighting, professional Christmas lighting, and landscape lighting in the ${regionLabel} region. Designed, installed, and supported by Rally.`,
    url: site.url,
    type: "website",
  },
};

const lightingReviews = testimonials.filter(
  (t) => t.service === "permanent-lighting" || t.service === "holiday-lighting"
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(lightingFaqs)} />
      <LightingHero />
      <TwoPaths />
      <PermanentStory />
      <DayNight />
      <PermanentProcess />
      <ChristmasExperience />
      <ChristmasGallery />
      <WhyRallyLighting />
      <Testimonials
        items={lightingReviews}
        limit={3}
        eyebrow="From Rally lighting customers"
        title="What it's like to work with Rally."
        description="Real Google reviews from permanent and Christmas lighting customers in the Ohio Valley."
        tone="white"
      />
      <LandscapeTeaser />
      <ServiceArea />
      <FAQ
        items={lightingFaqs}
        eyebrow="Questions"
        title="Things homeowners ask before they call"
        ctaHref="/contact"
        ctaLabel="Start My Project"
      />
      <FinalCTA />
      <OtherServicesNote />
    </>
  );
}
