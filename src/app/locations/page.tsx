import type { Metadata } from "next";
import Link from "next/link";
import { locations, getLocation } from "@/data/locations";
import { serviceCityCombos } from "@/data/serviceAreas";
import { getService } from "@/data/services";
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
  title: `Service Area — ${locations.length} Towns Across the Ohio Valley & Wheeling, WV`,
  description: `Rally serves ${locations.length} towns across ${regionLabel} — pressure washing, house washing, gutter cleaning, permanent & Christmas lighting. Find your city for local details & free quotes.`,
  alternates: { canonical: "/locations" },
};

// Invert the service×city combos: city → services with a dedicated local page.
const comboServicesByCity = new Map<string, string[]>();
Object.entries(serviceCityCombos).forEach(([svc, cities]) =>
  cities.forEach((c) =>
    comboServicesByCity.set(c, [...(comboServicesByCity.get(c) ?? []), svc])
  )
);
const topComboCities = [...comboServicesByCity.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 6);

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

      {/* Most-requested service pages in the biggest towns (internal links to
          the "[service] [city]" pages that win local head terms) */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Most Requested"
          title="Popular services by town"
          description="Dedicated local pages for the services people ask about most — photos, pricing context, and same-day quotes for your town."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topComboCities.map(([citySlug, svcSlugs]) => {
            const loc = getLocation(citySlug);
            if (!loc) return null;
            return (
              <div
                key={citySlug}
                className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
              >
                <Link
                  href={`/locations/${citySlug}`}
                  className="font-display text-lg font-bold text-ink-900 hover:text-gold-600"
                >
                  {loc.city}, {loc.state}
                </Link>
                <div className="mt-3 flex flex-wrap gap-2">
                  {svcSlugs.map((svcSlug) => {
                    const svc = getService(svcSlug);
                    if (!svc) return null;
                    return (
                      <Link
                        key={svcSlug}
                        href={`/services/${svcSlug}/${citySlug}`}
                        className="rounded-full border border-ink-200 bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-gold-300 hover:text-ink-900"
                      >
                        {svc.shortName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

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
