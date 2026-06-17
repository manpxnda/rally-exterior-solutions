import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/data/locations";
import { serviceAreaCities, regionLabel, site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Service Area — Ohio Valley & Wheeling, WV",
  description: `Rally Exterior Solutions serves ${regionLabel} — Wheeling, St. Clairsville, Moundsville, Martins Ferry, Bridgeport and surrounding towns. Find your city for local exterior cleaning & lighting.`,
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Area", url: "/locations" },
        ])}
      />

      <PageHeader
        eyebrow="Service Area"
        title={`Exterior cleaning & lighting across the ${regionLabel} region`}
        description={`Locally owned and operating within about ${site.geo.serviceRadiusMiles} miles of Wheeling, WV — both sides of the Ohio River. Find your town below.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service Area", href: "/locations" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
          </Button>
          <CallButton
            source="locations_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <SectionHeading
          eyebrow="Find Your City"
          title="Cities we serve"
          description="Click your town for local details — or just reach out, we likely cover you either way."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold-200 hover:shadow-cardHover"
            >
              <span className="flex items-center gap-2 text-gold-600">
                <Icon name="pin" className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                  {loc.county}
                </span>
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink-900">
                {loc.city}, {loc.state}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                {loc.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                {loc.city} details
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center">
          <h3 className="font-bold text-ink-900">Don&apos;t see your town?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-500">
            We also serve {serviceAreaCities.slice(0, 10).join(", ")} and many
            more communities across the {regionLabel} region. If you&apos;re
            within ~{site.geo.serviceRadiusMiles} miles of Wheeling, reach out —
            we&apos;ve got you covered.
          </p>
          <div className="mt-5">
            <Button href="/contact">Check My Availability</Button>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
