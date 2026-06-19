import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService } from "@/data/services";
import { getLocation } from "@/data/locations";
import { getComboCities, getAllCombos, isValidCombo } from "@/data/serviceAreas";
import { beforeAfters, showcase } from "@/data/gallery";
import { testimonialsForService } from "@/data/testimonials";
import { site } from "@/lib/site";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceInCitySchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string; city: string }> };

// Only the curated combos exist — anything off-list 404s (no doorway pages).
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCombos().map((c) => ({ slug: c.service, city: c.city }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getService(slug);
  const loc = getLocation(city);
  if (!service || !loc) return {};
  const title = `${service.name} in ${loc.city}, ${loc.state}`;
  const lead = service.metaDescription.split(".")[0];
  return {
    title,
    description: `${lead} in ${loc.city}, ${loc.stateName}. Local, insured, free estimates from Rally Exterior Solutions.`,
    keywords: [
      `${service.shortName.toLowerCase()} ${loc.city} ${loc.state}`,
      `${service.shortName.toLowerCase()} ${loc.city}`,
      `${service.shortName.toLowerCase()} near me`,
      ...(service.category === "lighting"
        ? [`christmas lights ${loc.city} ${loc.state}`, `lighting installers ${loc.city}`]
        : [`pressure washing ${loc.city} ${loc.state}`]),
    ],
    alternates: { canonical: `/services/${service.slug}/${loc.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: loc.intro,
      url: `${site.url}/services/${service.slug}/${loc.slug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: Params) {
  const { slug, city } = await params;
  if (!isValidCombo(slug, city)) notFound();
  const service = getService(slug);
  const loc = getLocation(city);
  if (!service || !loc) notFound();

  const isLighting = service.category === "lighting";
  const categoryLabel = isLighting ? "Exterior Lighting" : "Exterior Cleaning";
  const proof = beforeAfters.filter((b) => b.service === service.slug).slice(0, 2);
  const photos = showcase.filter((s) => s.service === service.slug).slice(0, 3);
  const reviews = testimonialsForService(service.slug, 3);
  const otherCities = getComboCities(service.slug).filter((c) => c !== city);

  const leadIn = isLighting
    ? `Make your ${loc.city} property the brightest on the block.`
    : `Keep your ${loc.city} property clean, protected, and looking its best.`;

  return (
    <>
      <JsonLd
        data={[
          serviceInCitySchema(service, loc),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.shortName, url: `/services/${service.slug}` },
            { name: `${loc.city}, ${loc.state}`, url: `/services/${service.slug}/${loc.slug}` },
          ]),
          faqSchema(),
        ]}
      />

      <PageHeader
        eyebrow={`${categoryLabel} · ${loc.county}`}
        title={`${service.shortName} in ${loc.city}, ${loc.state}`}
        description={`${leadIn} ${loc.intro}`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortName, href: `/services/${service.slug}` },
          { name: loc.city, href: `/services/${service.slug}/${loc.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?service=${service.slug}`} size="lg">
            Get a Free {loc.city} Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source={`combo_${service.slug}_${loc.slug}`}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Local context (unique per city) */}
            <h2 className="font-display text-2xl font-bold text-ink-900">
              {service.shortName} for {loc.city} homes &amp; businesses
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{loc.context}</p>
            <p className="mt-4 leading-relaxed text-ink-600">{service.description}</p>

            {/* Benefits */}
            <h3 className="mt-10 text-lg font-bold text-ink-900">
              What {loc.city} customers get with Rally
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="text-ink-700">{b}</span>
                </li>
              ))}
            </ul>

            {/* Nearby */}
            <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <p className="text-sm font-bold text-ink-900">
                Also serving near {loc.city}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {loc.nearby.join(", ")} and the surrounding {loc.county} area —{" "}
                <Link href={`/locations/${loc.slug}`} className="font-semibold text-ink-900 underline-offset-2 hover:underline">
                  see everything we do in {loc.city} →
                </Link>
              </p>
            </div>
          </div>

          {/* Sticky lead form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-cardHover">
              <h2 className="font-display text-xl font-bold text-ink-900">
                Free {loc.city} {service.shortName.toLowerCase()} quote
              </h2>
              <p className="mt-1 text-sm text-ink-500">{service.priceNote}</p>
              <div className="mt-5">
                <LeadForm source={`combo_${service.slug}_${loc.slug}`} defaultService={service.slug} compact />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Proof */}
      {proof.length > 0 && (
        <Section tone="gradient">
          <SectionHeading eyebrow="Real Results" title={`Our ${service.shortName.toLowerCase()} work`} tone="light" className="mb-10" />
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {proof.map((item) => (
              <figure key={item.id}>
                <BeforeAfter before={item.before} after={item.after} beforeAlt={`${item.title} before`} afterAlt={`${item.title} after`} />
                <figcaption className="mt-3 text-sm text-ink-300">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {photos.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Gallery" title={`${service.shortName} we've installed`} className="mb-10" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item) =>
              item.src ? (
                <div key={item.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                </div>
              ) : null
            )}
          </div>
        </Section>
      )}

      <ProcessSteps />

      {reviews.length > 0 && <Testimonials items={reviews} limit={3} />}

      {/* Internal links: other cities for this service */}
      {otherCities.length > 0 && (
        <Section tone="muted">
          <SectionHeading eyebrow="Service Area" title={`${service.shortName} in nearby towns`} className="mb-8" />
          <div className="flex flex-wrap justify-center gap-2.5">
            {otherCities.map((c) => {
              const o = getLocation(c);
              if (!o) return null;
              return (
                <Link
                  key={c}
                  href={`/services/${service.slug}/${c}`}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-gold-300 hover:text-ink-900"
                >
                  {service.shortName} in {o.city}, {o.state}
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-ink-500">
            <Link href={`/services/${service.slug}`} className="font-semibold text-ink-900 underline-offset-2 hover:underline">
              All about {service.name.toLowerCase()} →
            </Link>
          </p>
        </Section>
      )}

      <FAQ heading />
      <CTASection title={`Ready for ${service.shortName.toLowerCase()} in ${loc.city}?`} service={service.slug} />
    </>
  );
}
