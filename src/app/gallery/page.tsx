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
  title: "Project Gallery — Before & After Transformations",
  description: `See real before-and-after results from Rally Exterior Solutions across the ${regionLabel} region: lighting installs, house & roof washing, concrete cleaning and more.`,
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
        eyebrow="Project Gallery"
        title="Transformations worth showing off"
        description="Real homes and businesses in the Ohio Valley. Drag any slider to see the before-and-after for yourself."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get Results Like These
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
