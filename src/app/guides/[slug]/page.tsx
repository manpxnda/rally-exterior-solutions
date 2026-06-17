import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs } from "@/data/guides";
import { getService } from "@/data/services";
import { site } from "@/lib/site";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: `${guide.title} | ${site.name}`,
      description: guide.metaDescription,
      url: `${site.url}/guides/${guide.slug}`,
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.relatedService ? getService(guide.relatedService) : undefined;

  return (
    <>
      <JsonLd
        data={[
          articleSchema(guide),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Guides", url: "/guides" },
            { name: guide.title, url: `/guides/${guide.slug}` },
          ]),
          faqSchema(guide.faqs),
        ]}
      />

      <PageHeader
        eyebrow={guide.category}
        title={guide.title}
        description={guide.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.category, href: `/guides/${guide.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source={`guide_${guide.slug}_header`}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <article className="mx-auto max-w-3xl">
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Icon name="calendar" className="h-4 w-4" />
            Updated {dateFmt.format(new Date(guide.updated))}
            <span aria-hidden>·</span>
            {guide.readMinutes} min read
          </p>

          {/* Price table */}
          {guide.priceTable && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 shadow-card">
              <div className="bg-ink-900 px-5 py-4">
                <h2 className="font-display text-lg font-bold text-white">
                  {guide.priceTable.caption}
                </h2>
              </div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-ink-100">
                  {guide.priceTable.rows.map((row) => (
                    <tr key={row.label} className="align-top">
                      <td className="px-5 py-4">
                        <span className="font-semibold text-ink-900">{row.label}</span>
                        {row.note && (
                          <span className="mt-0.5 block text-xs text-ink-400">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-gold-600">
                        {row.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-ink-100 bg-ink-50 px-5 py-3 text-xs leading-relaxed text-ink-500">
                {guide.priceTable.disclaimer}
              </p>
            </div>
          )}

          {/* Body sections */}
          <div className="mt-12 space-y-10">
            {guide.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  {sec.heading}
                </h2>
                {sec.body?.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-ink-600">
                        <Icon
                          name="check"
                          className="mt-1 h-4 w-4 shrink-0 text-gold-600"
                          strokeWidth={2.5}
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Inline conversion nudge */}
          <div className="mt-12 rounded-2xl border border-gold-200 bg-gold-50 p-6 text-center sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink-900">
              Want your exact price?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-600">
              Skip the guesswork — get a free, no-pressure quote in writing,
              usually the same day.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={related ? `/contact?service=${related.slug}` : "/contact"}
                size="lg"
              >
                Get My Free Estimate
                <Icon name="arrowRight" className="h-5 w-5" />
              </Button>
              <CallButton source={`guide_${guide.slug}_inline`} variant="outline" size="lg" />
            </div>
            {related && (
              <p className="mt-4 text-sm text-ink-500">
                Learn more about{" "}
                <a
                  href={`/services/${related.slug}`}
                  className="font-semibold text-ink-900 underline decoration-gold-300 underline-offset-2 hover:text-gold-600"
                >
                  {related.name}
                </a>
                .
              </p>
            )}
          </div>
        </article>
      </Section>

      <FAQ items={guide.faqs} heading />
      <CTASection service={guide.relatedService} />
    </>
  );
}
