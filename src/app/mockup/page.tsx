import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { LightingMockup } from "@/components/mockup/LightingMockup";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Lighting Mockup — See Your Home Lit Up",
  description:
    "Upload a photo of your home and preview permanent lighting or Christmas C9 roofline lights — pick facing, spacing & colors, then get a free designer mockup + quote from Rally.",
  alternates: { canonical: "/mockup" },
  openGraph: {
    title: `Free Lighting Mockup | ${site.name}`,
    description:
      "See your home with permanent or Christmas lighting before you buy. Free, instant preview + a designer mockup and quote.",
    url: `${site.url}/mockup`,
  },
};

const steps = [
  { icon: "image" as const, title: "Upload your photo", body: "A simple shot of your home from the street works best." },
  { icon: "lighting" as const, title: "Design it live", body: "Pick the style, facing, spacing & colors and watch it light up." },
  { icon: "sparkle" as const, title: "Get a pro mockup", body: "We send a designer-made rendering plus a free, no-pressure quote." },
];

export default function MockupPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Lighting Mockup", url: "/mockup" },
        ])}
      />

      <PageHeader
        eyebrow="Free Tool"
        title="See your home lit up — before you buy"
        description="Upload a photo, choose permanent or Christmas C9 lighting, and preview it live. Love what you see? We'll send a free designer mockup and quote."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Lighting Mockup", href: "/mockup" },
        ]}
      />

      <Section tone="white">
        <LightingMockup />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How It Works"
          title="From photo to lit-up home in minutes"
          className="mb-12"
        />
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-ink-900 shadow-cta">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-400">
          The live preview is an approximate visualization to help you picture the
          look. Your free mockup is hand-finished by our team for an accurate
          result.
        </p>
      </Section>

      <CTASection service="permanent-lighting" />
    </>
  );
}
