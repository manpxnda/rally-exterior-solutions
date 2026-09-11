import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, regionLabel } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/LeadForm";
import { CallLink, TextLink } from "@/components/CallButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/**
 * PERMANENT LIGHTING JOURNEY — consultative, premium.
 * Captures the address + what the homeowner wants the home to feel like, then
 * posts to the existing /api/lead pipeline (service = permanent-lighting).
 */
export const metadata: Metadata = {
  title: "Design My Home — Permanent Lighting Design Consultation",
  description: `Request a permanent lighting design consultation from Rally Exterior Solutions. We walk the home with you, design the system around your architecture, and show you exactly what it could look like. ${regionLabel}.`,
  alternates: { canonical: "/design-consultation" },
};

const NEXT = [
  {
    title: "We reach out to schedule",
    body: "A quick call or text to find a time that works for you.",
  },
  {
    title: "We walk the home with you",
    body: "Rooflines, trim color, what you want the home to feel like — the design starts there.",
  },
  {
    title: "You see the design and the price",
    body: "A clear proposal for your home. No pressure, no obligation.",
  },
];

export default function DesignConsultationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Permanent Lighting", url: "/services/permanent-lighting" },
          { name: "Design Consultation", url: "/design-consultation" },
        ])}
      />

      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/lighting/permanent-warm-white.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/50" />
        </div>

        <Container className="relative grid items-start gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr]">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-300">
              Permanent Lighting
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Let&apos;s design your home.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-100">
              Permanent lighting is designed around your architecture, not pulled
              from a catalog. Tell us a little about the home and we&apos;ll
              schedule a design consultation.
            </p>

            <ol className="mt-8 space-y-4">
              {NEXT.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/20 font-display text-sm font-extrabold text-sky-300">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white">{s.title}</p>
                    <p className="text-sm text-ink-200">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-ink-300">
              Prefer to talk?{" "}
              <CallLink source="design_consultation" className="font-semibold text-white hover:text-gold-300">
                Call {site.phoneDisplay}
              </CallLink>{" "}
              <span className="text-ink-500">·</span>{" "}
              <TextLink source="design_consultation" className="font-semibold text-white hover:text-gold-300">
                Text us
              </TextLink>
            </p>
            <p className="mt-3 text-sm text-ink-400">
              Looking for Christmas lights instead?{" "}
              <Link href="/christmas-quote" className="font-semibold text-ink-100 underline-offset-4 hover:underline">
                Get a Christmas quote →
              </Link>
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-ink-900 shadow-cardHover sm:p-8">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-sky-600">
                <Icon name="lighting" className="mr-1 inline h-3.5 w-3.5" />
                Design consultation
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold">Show us your home.</h2>
            <p className="mt-1 text-sm text-ink-500">
              Takes about a minute. We&apos;ll take it from there.
            </p>
            <div className="mt-5">
              <LeadForm variant="permanent" source="design_consultation_page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
