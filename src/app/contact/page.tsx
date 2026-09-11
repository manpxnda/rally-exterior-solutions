import type { Metadata } from "next";
import Link from "next/link";
import { site, regionLabel, serviceAreaCities } from "@/lib/site";
import { getServiceSlugs } from "@/data/services";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { CallLink, TextLink } from "@/components/CallButton";
import { Stars } from "@/components/ui/Stars";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Start My Project — Contact Rally Exterior Solutions",
  description: `Start your permanent lighting design, get a Christmas lighting quote, or request a free estimate for any Rally exterior service in the ${regionLabel} region. Call ${site.phoneDisplay} or send a message.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const validService =
    service && getServiceSlugs().includes(service) ? service : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <PageHeader
        eyebrow="Start My Project"
        title="Show us your home. We'll take it from there."
        description={`Pick the path that fits, or use the form below for anything else. Prefer to talk? Call ${site.phoneDisplay}.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* Lighting journeys — the two front doors (2026 repositioning) */}
      <Section tone="muted" className="!py-10 sm:!py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/design-consultation"
            className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-cardHover"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-sky-300">
              <Icon name="lighting" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-sky-600">Permanent lighting</span>
              <span className="mt-1 block font-display text-xl font-bold text-ink-900">Design my home</span>
              <span className="mt-1 block text-sm text-ink-500">Schedule a design consultation. We walk the home with you and design the system around it.</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
                Start <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
          <Link
            href="/christmas-quote"
            className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-cardHover"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-900">
              <Icon name="snowflake" className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider text-gold-600">Christmas lighting</span>
              <span className="mt-1 block font-display text-xl font-bold text-ink-900">Get my Christmas quote</span>
              <span className="mt-1 block text-sm text-ink-500">Send your address and a photo. We can often design and quote your home remotely.</span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
                Start <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
        <p className="mt-5 text-center text-sm text-ink-500">
          Landscape lighting, pressure washing, house or roof washing, concrete, sealing, or not sure? Use the form below.
        </p>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Contact info / trust */}
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-2xl font-bold text-ink-900">
              Talk to a real local team
            </h2>
            <p className="mt-3 text-ink-600">
              No call centers, no runaround. When you reach out to Rally, you
              get straight answers and fast, honest pricing.
            </p>

            <div className="mt-8 space-y-5">
              <ContactRow icon="phone" label="Call or text">
                <CallLink
                  source="contact_page"
                  className="text-lg font-bold text-ink-900 hover:text-gold-600"
                >
                  {site.phoneDisplay}
                </CallLink>
                <div className="mt-1">
                  <TextLink
                    source="contact_page"
                    className="text-sm font-semibold text-gold-600 hover:text-gold-700"
                  >
                    Text us instead →
                  </TextLink>
                </div>
              </ContactRow>
              <ContactRow icon="mail" label="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-ink-900 hover:text-gold-600"
                >
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon="clock" label="Hours">
                <span className="text-ink-700">{site.hoursShort}</span>
              </ContactRow>
              <ContactRow icon="pin" label="Service area">
                <span className="text-ink-700">
                  {serviceAreaCities.slice(0, 6).join(", ")} &amp; the surrounding{" "}
                  {regionLabel} region
                </span>
              </ContactRow>
            </div>

            {/* trust card */}
            <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-6">
              <div className="flex items-center gap-2">
                <Stars rating={site.stats.reviewRating} size="h-5 w-5" />
                <span className="font-bold text-ink-900">
                  {site.stats.reviewRating}/5
                </span>
                <span className="text-sm text-ink-500">
                  · {site.stats.reviewCount}+ reviews
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-ink-600">
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-green-600" strokeWidth={2.5} />
                  Fully insured &amp; locally owned
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-green-600" strokeWidth={2.5} />
                  Clear, upfront pricing — no hidden fees
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-green-600" strokeWidth={2.5} />
                  We&apos;re not done until you&apos;re thrilled
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-cardHover sm:p-8">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Request your free estimate
              </h2>
              <p className="mt-1 text-ink-500">
                {site.offer.sub}
              </p>
              <div className="mt-6">
                <LeadForm source="contact_page" defaultService={validService} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: "phone" | "mail" | "clock" | "pin";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-300">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">
          {label}
        </p>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}
