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
 * CHRISTMAS LIGHTING JOURNEY — fast, remote-friendly quote.
 * Address + optional front-of-home photo + preferred look → existing
 * /api/lead pipeline (service = holiday-lighting; photo rides on the email).
 * No design-consultation gate for Christmas customers.
 */
export const metadata: Metadata = {
  title: "Get My Christmas Quote — Professional Christmas Lighting",
  description: `Get a Christmas lighting quote from Rally Exterior Solutions — often designed and quoted remotely from your address and a photo. Design, install, maintenance, removal, and storage handled. ${regionLabel}.`,
  alternates: { canonical: "/christmas-quote" },
};

const INCLUDED = [
  "Professional design",
  "Commercial-grade lights (Rally provides them)",
  "Installation and timer setup",
  "In-season maintenance",
  "Removal in January",
  "Labeling, organization, and storage",
];

export default function ChristmasQuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Christmas Lighting", url: "/services/holiday-lighting" },
          { name: "Christmas Quote", url: "/christmas-quote" },
        ])}
      />

      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/lighting/christmas-multicolor.jpg"
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-300">
              Christmas Lighting
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Get your Christmas quote.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-100">
              You enjoy Christmas. Rally handles the lights. Send your address
              and, if you can, a photo of the front of the home — we can often
              design and quote remotely.
            </p>

            <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-ink-300">
              What&apos;s included
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {INCLUDED.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-ink-100">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-300">
              Prefer to talk?{" "}
              <CallLink source="christmas_quote" className="font-semibold text-white hover:text-gold-300">
                Call {site.phoneDisplay}
              </CallLink>{" "}
              <span className="text-ink-500">·</span>{" "}
              <TextLink source="christmas_quote" className="font-semibold text-white hover:text-gold-300">
                Text us
              </TextLink>
            </p>
            <p className="mt-3 text-sm text-ink-400">
              Thinking about lights that never come down?{" "}
              <Link href="/design-consultation" className="font-semibold text-ink-100 underline-offset-4 hover:underline">
                Design my permanent lighting →
              </Link>
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-ink-900 shadow-cardHover sm:p-8">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold-700">
                <Icon name="snowflake" className="mr-1 inline h-3.5 w-3.5" />
                Christmas quote
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold">Show us your home.</h2>
            <p className="mt-1 text-sm text-ink-500">
              About a minute. A front-of-home photo is optional but helps.
            </p>
            <div className="mt-5">
              <LeadForm variant="christmas" source="christmas_quote_page" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
