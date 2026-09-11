import type { Metadata } from "next";
import { regionLabel } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Lighting Gallery — Permanent & Christmas Lighting Projects",
  description: `Real Rally Exterior Solutions lighting projects across the ${regionLabel} region: permanent roofline lighting, Christmas displays, and landscape lighting — plus before-and-after results from our exterior cleaning work.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />

      <PageHeader
        eyebrow="Lighting Gallery"
        title="Real Rally homes, after dark"
        description="Permanent lighting, Christmas displays, and landscape lighting on real Ohio Valley homes. Exterior cleaning before-and-afters live under their own tab."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/design-consultation" size="lg">
            Design My Home
          </Button>
          <Button href="/christmas-quote" variant="white" size="lg">
            Get My Christmas Quote
          </Button>
          <CallButton
            source="gallery_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      <Section tone="white">
        <GalleryGrid />
        <p className="mt-12 text-center text-sm text-ink-400">
          Photos are being added as we document recent projects. Want to see
          examples for your specific home?{" "}
          <a href="/contact" className="font-semibold text-ink-900 underline-offset-2 hover:underline">
            Just ask — we&apos;re happy to share.
          </a>
        </p>
      </Section>

      <CTASection />
    </>
  );
}
