import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getService,
  getServiceSlugs,
  services,
  type Service,
} from "@/data/services";
import { beforeAfters, showcase } from "@/data/gallery";
import { getGuideForService } from "@/data/guides";
import { testimonialsForService } from "@/data/testimonials";
import { regionLabel, site } from "@/lib/site";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ServiceCard } from "@/components/ServiceCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const proof = beforeAfters
    .filter((b) => b.service === service.slug)
    .slice(0, 4);
  const serviceShowcase = showcase.filter((s) => s.service === service.slug);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const reviews = testimonialsForService(service.slug, 3);
  const guide = getGuideForService(service.slug);
  const isLighting = service.category === "lighting";
  const categoryLabel = isLighting ? "Exterior Lighting" : "Exterior Cleaning";

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.name, url: `/services/${service.slug}` },
          ]),
          faqSchema(),
        ]}
      />

      <PageHeader
        eyebrow={categoryLabel}
        title={service.heroHeadline}
        description={service.heroSub}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.shortName, href: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?service=${service.slug}`} size="lg">
            Get a Free Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source={`service_${service.slug}_header`}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      {/* Hero image (illustrative) */}
      {service.image && (
        <div className="bg-white pt-12 sm:pt-16">
          <Container>
            <MediaFrame
              src={service.image}
              alt={`${service.name} in the ${regionLabel} region`}
              aspect="photo"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="mx-auto max-w-4xl shadow-card"
            />
          </Container>
        </div>
      )}

      {/* Main content + sticky form */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Problem → outcome */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
                  The problem
                </p>
                <p className="mt-2 text-ink-700">{service.problem}</p>
              </div>
              <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  The Rally result
                </p>
                <p className="mt-2 text-ink-800">{service.outcome}</p>
              </div>
            </div>

            <div className="prose-rally mt-8">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                {service.name} in the {regionLabel} region
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">
                {service.description}
              </p>
            </div>

            {/* Benefits */}
            <h3 className="mt-10 text-lg font-bold text-ink-900">
              What you get with Rally
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

            {/* Best for */}
            <h3 className="mt-10 text-lg font-bold text-ink-900">
              A great fit if you have…
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {service.bestFor.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Internal links: pricing guide + (lighting) mockup */}
            {(guide || isLighting) && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {guide && (
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50 p-5 transition-colors hover:border-gold-200 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 shadow-card">
                      <Icon name="tag" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">
                        How much does it cost?
                      </span>
                      <span className="block text-xs text-ink-500">
                        See the {service.shortName.toLowerCase()} pricing guide →
                      </span>
                    </span>
                  </Link>
                )}
                {isLighting && (
                  <Link
                    href="/mockup"
                    className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50 p-5 transition-colors hover:border-gold-200 hover:bg-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 shadow-card">
                      <Icon name="sparkle" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">
                        See it on your home
                      </span>
                      <span className="block text-xs text-ink-500">
                        Try the free lighting mockup →
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sticky lead form */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-cardHover">
              <h2 className="font-display text-xl font-bold text-ink-900">
                Free {service.shortName} estimate
              </h2>
              <p className="mt-1 text-sm text-ink-500">{service.priceNote}</p>
              <div className="mt-5">
                <LeadForm
                  source={`service_${service.slug}`}
                  defaultService={service.slug}
                  compact
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Proof */}
      {proof.length > 0 && (
        <Section tone="gradient">
          <SectionHeading
            eyebrow="Real Results"
            title={`See our ${service.shortName.toLowerCase()} work`}
            tone="light"
            className="mb-10"
          />
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            {proof.map((item) => (
              <figure key={item.id}>
                <BeforeAfter
                  before={item.before}
                  after={item.after}
                  beforeAlt={`${item.title} before`}
                  afterAlt={`${item.title} after`}
                />
                <figcaption className="mt-3 text-sm text-ink-300">
                  {item.title} · {item.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* Lighting gallery (only renders for services with showcase photos) */}
      {serviceShowcase.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Gallery"
            title={`${service.shortName} we've installed`}
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceShowcase.map((item) => (
              <figure
                key={item.id}
                className="overflow-hidden rounded-2xl shadow-card"
              >
                <MediaFrame
                  src={item.src}
                  alt={item.title}
                  label={item.title}
                  icon={service.icon}
                  aspect="photo"
                  rounded="rounded-none"
                />
                <figcaption className="bg-white px-4 py-3 text-sm font-semibold text-ink-900">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <ProcessSteps />

      {reviews.length > 0 && <Testimonials items={reviews} limit={3} />}

      {/* Related services */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Explore More"
          title="Other ways Rally can help"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s: Service) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <p className="mt-8 text-center text-ink-500">
          <Link href="/services" className="font-semibold text-ink-900 underline-offset-2 hover:underline">
            View all services →
          </Link>
        </p>
      </Section>

      <FAQ heading />
      <CTASection
        title={`Ready for ${service.shortName.toLowerCase()} done right?`}
        service={service.slug}
      />
    </>
  );
}
