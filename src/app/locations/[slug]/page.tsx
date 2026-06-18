import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { getLocation, getLocationSlugs, getLocationByCity } from "@/data/locations";
import { services } from "@/data/services";
import { site } from "@/lib/site";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProofSection } from "@/components/sections/ProofSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { locationSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  const title = `${loc.city}, ${loc.state} Exterior Cleaning & Lighting`;
  return {
    title,
    description: `${loc.intro} Free estimates on house washing, roof washing, pressure washing, and permanent & holiday lighting in ${loc.city}, ${loc.stateName}.`,
    keywords: [
      `pressure washing ${loc.city} ${loc.state}`,
      `house washing ${loc.city}`,
      `roof cleaning ${loc.city} ${loc.state}`,
      `permanent lighting ${loc.city}`,
      `Christmas light installation ${loc.city} ${loc.state}`,
      `exterior cleaning ${loc.city}`,
    ],
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: loc.intro,
      url: `${site.url}/locations/${loc.slug}`,
    },
  };
}

export default async function LocationPage({ params }: Params) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <>
      <JsonLd
        data={[
          locationSchema(loc),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Area", url: "/locations" },
            { name: `${loc.city}, ${loc.state}`, url: `/locations/${loc.slug}` },
          ]),
          faqSchema(),
        ]}
      />

      <PageHeader
        eyebrow={`Serving ${loc.city}, ${loc.stateName}`}
        title={`Exterior Cleaning & Lighting in ${loc.city}, ${loc.state}`}
        description={loc.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service Area", href: "/locations" },
          { name: `${loc.city}, ${loc.state}`, href: `/locations/${loc.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free {loc.city} Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source={`location_${loc.slug}_header`}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      {/* Local context + services */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
            {loc.county}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Your local exterior team in {loc.city}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            {loc.context}
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading
            eyebrow="What We Do"
            title={`Exterior services in ${loc.city}`}
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </Section>

      <ProofSection limit={3} />

      <ProcessSteps />

      <Testimonials limit={3} />

      {/* Nearby areas */}
      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Service Area"
            title={`Proudly serving ${loc.city} & nearby`}
          />
          <p className="mt-4 text-ink-500">
            We also serve{" "}
            {loc.nearby.map((name, i) => {
              const match = getLocationByCity(name);
              const sep =
                i < loc.nearby.length - 2
                  ? ", "
                  : i === loc.nearby.length - 2
                    ? " and "
                    : "";
              return (
                <Fragment key={name}>
                  {match ? (
                    <Link
                      href={`/locations/${match.slug}`}
                      className="font-medium text-ink-700 underline decoration-ink-200 underline-offset-2 transition-colors hover:text-gold-600"
                    >
                      {name}
                    </Link>
                  ) : (
                    name
                  )}
                  {sep}
                </Fragment>
              );
            })}
            , plus the surrounding {loc.county} area. Not sure if you&apos;re in
            range? Just ask.
          </p>
          <div className="mt-6">
            <Button href="/locations" variant="outline">
              View full service area
            </Button>
          </div>
        </div>
      </Section>

      <FAQ heading />
      <CTASection
        title={`Ready for a brighter, cleaner property in ${loc.city}?`}
      />

      {/* hidden helpful internal link for crawlers/users */}
      <div className="sr-only">
        <Link href="/services">All exterior services</Link>
      </div>
    </>
  );
}
