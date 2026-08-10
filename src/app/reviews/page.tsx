import type { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import { getService } from "@/data/services";
import { site, regionLabel } from "@/lib/site";

import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviewsSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Reviews — ${site.stats.reviewRating}★ from ${site.stats.reviewCount}+ Local Customers`,
  description: `Read real Google reviews of Rally Exterior Solutions — rated ${site.stats.reviewRating}★ by ${site.stats.reviewCount}+ homeowners and businesses across the ${regionLabel} region for cleaning & lighting work.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={[
          reviewsSchema(testimonials),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Reviews", url: "/reviews" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Reviews"
        title={`Rated ${site.stats.reviewRating}★ by your neighbors`}
        description={`${site.stats.reviewCount}+ five-star Google reviews from homeowners and businesses across the ${regionLabel} region. Here's what they say when the job's done.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source="reviews_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        {/* Aggregate strip */}
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50 px-8 py-7 text-center">
          <Stars rating={site.stats.reviewRating} size="h-7 w-7" />
          <p className="font-display text-3xl font-bold text-ink-900">
            {site.stats.reviewRating} out of 5
          </p>
          <p className="text-sm text-ink-500">
            Based on {site.stats.reviewCount}+ Google reviews ·{" "}
            <a
              href={site.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink-900 underline underline-offset-2 hover:text-gold-600"
            >
              see us on Google →
            </a>
          </p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.map((t, i) => {
            const svc = t.service ? getService(t.service) : undefined;
            return (
              <figure
                key={i}
                className="break-inside-avoid rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
              >
                <Stars rating={t.rating ?? 5} size="h-4 w-4" />
                <blockquote className="mt-3 leading-relaxed text-ink-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-bold text-ink-900">{t.name}</span>
                  {svc ? (
                    <Link
                      href={`/services/${svc.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-gold-600 hover:underline"
                    >
                      {svc.shortName}
                    </Link>
                  ) : (
                    <span className="text-xs uppercase tracking-wider text-ink-400">
                      {t.location}
                    </span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Leave-a-review CTA */}
        <div className="mt-14 rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center">
          <h2 className="font-display text-xl font-bold text-ink-900">
            Did we work on your place recently?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-500">
            A quick review helps your neighbors find us — and it genuinely means
            a lot to a local crew. It takes about a minute.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/review-card">Leave a Review</Button>
            <Button href="/gallery" variant="outline">
              See Our Work
            </Button>
          </div>
        </div>
      </Section>

      <CTASection title="Ready to see what the reviews are about?" />
    </>
  );
}
