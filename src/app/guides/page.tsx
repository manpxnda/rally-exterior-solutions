import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Exterior Cleaning & Lighting Guides | Pricing, Tips & FAQs",
  description: `Honest guides from ${site.name} on exterior cleaning and lighting — pricing, what to expect, and how to choose the right service in the Ohio Valley.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
        ])}
      />

      <PageHeader
        eyebrow="Guides & Resources"
        title="Straight answers on exterior cleaning & lighting"
        description="No fluff — real pricing, what to expect, and how to pick the right service for your home. Written by the team that does the work."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
          </Button>
          <CallButton
            source="guides_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <SectionHeading
          eyebrow="Browse Guides"
          title="Helpful reads before you book"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold-200 hover:shadow-cardHover"
            >
              <span className="flex items-center gap-2 text-gold-600">
                <Icon name="check" className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                  {guide.category} · {guide.readMinutes} min read
                </span>
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink-900">
                {guide.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                {guide.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900">
                Read the guide
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
