import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProofSection } from "@/components/sections/ProofSection";
import { WhyRally } from "@/components/sections/WhyRally";
import { MockupPromo } from "@/components/sections/MockupPromo";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Guarantee } from "@/components/sections/Guarantee";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ProofSection />
      <WhyRally />
      <MockupPromo />
      <ProcessSteps />
      <Testimonials limit={3} />
      <Guarantee />
      <ServiceArea />
      <FAQ />
      <CTASection />
    </>
  );
}
