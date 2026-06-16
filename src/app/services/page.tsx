import type { Metadata } from "next";
import { lightingServices, cleaningServices } from "@/data/services";
import { regionLabel } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Services — Exterior Lighting & Cleaning",
  description: `Explore Rally Exterior Solutions' services across the ${regionLabel} region: permanent lighting, holiday lighting, house & roof washing, soft washing, concrete cleaning, paver sealing, and commercial exterior cleaning.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <PageHeader
        eyebrow="Our Services"
        title="Premium exterior services, one trusted team"
        description={`Lighting that wows and cleaning that transforms — everything your home or business needs to look its absolute best across the ${regionLabel} region.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
          </Button>
          <CallButton
            source="services_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <SectionHeading
          eyebrow="Exterior Lighting"
          title="Lighting that makes your home unforgettable"
          description="Year-round curb appeal and stress-free holidays — professionally designed and installed."
          align="left"
          className="mb-8"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lightingServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Exterior Cleaning"
          title="Cleaning that restores and protects"
          description="Safe, professional methods that erase years of grime and protect your biggest investment."
          align="left"
          className="mb-8"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cleaningServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      <ProcessSteps />
      <Testimonials limit={3} />
      <CTASection />
    </>
  );
}
