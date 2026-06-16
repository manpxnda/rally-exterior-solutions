import type { Metadata } from "next";
import { site, regionLabel } from "@/lib/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Icon } from "@/components/ui/Icon";
import { Guarantee } from "@/components/sections/Guarantee";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Rally Exterior Solutions — Local, Premium, Trusted",
  description: `Rally Exterior Solutions is a locally owned exterior lighting and cleaning company serving the ${regionLabel} region. Learn what makes us different.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "phone" as const,
    title: "We actually answer",
    body: "You'll never feel ignored. We respond fast, show up when we say, and keep you in the loop.",
  },
  {
    icon: "shield" as const,
    title: "We protect your property",
    body: "The right method for every surface, careful crews, and respect for your landscaping and home.",
  },
  {
    icon: "tag" as const,
    title: "Honest, upfront pricing",
    body: "Clear written quotes before any work starts. No surprise fees, no pressure, ever.",
  },
  {
    icon: "sparkle" as const,
    title: "Premium results",
    body: "Commercial-grade products and proven techniques that look better and last longer.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <PageHeader
        eyebrow="About Rally"
        title="Your neighbors in premium exterior services"
        description={`We started Rally to give Ohio Valley homeowners an exterior company they can actually count on — one that shows up, communicates, and delivers results worth bragging about.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a Free Estimate
          </Button>
          <CallButton
            source="about_header"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </PageHeader>

      {/* Story */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on a simple promise: do it right"
              align="left"
            />
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                Too many homeowners have a bad-contractor story — the no-show,
                the surprise invoice, the sloppy job. We built Rally Exterior
                Solutions to be the opposite of that.
              </p>
              <p>
                From dazzling permanent lighting to deep-clean house and roof
                washing, we bring one professional, fully insured team to your
                entire exterior. We use commercial-grade products, the safe
                method for every surface, and we treat your property like it&apos;s
                our own.
              </p>
              <p>
                We&apos;re local, we&apos;re responsive, and we stand behind our
                work. That&apos;s the Rally difference — and it&apos;s why our
                customers keep recommending us to their neighbors.
              </p>
            </div>
          </div>
          <MediaFrame
            src="/images/team/rally-driveway.png"
            alt="Rally Exterior Solutions surface-cleaning a driveway in the Ohio Valley"
            aspect="portrait"
            className="shadow-cardHover"
          />
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What We Stand For"
          title="The standards behind every job"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-gold-300">
                <Icon name={v.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-ink-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {v.body}
              </p>
            </div>
          ))}
        </div>

        {/* Stats band */}
        <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl bg-ink-900 p-8 text-white sm:grid-cols-4">
          <Stat value={`${new Date().getFullYear() - site.stats.yearFounded}+`} label="Years serving locally" />
          <Stat value={site.stats.projectsCompleted} label="Projects completed" />
          <Stat value={`${site.stats.reviewRating}★`} label="Average rating" />
          <Stat value="100%" label="Locally owned" />
        </div>
      </Section>

      <Guarantee />
      <Testimonials limit={3} />
      <CTASection />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-extrabold text-gold-300 sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-200">{label}</div>
    </div>
  );
}
