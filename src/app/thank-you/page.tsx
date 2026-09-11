import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getService } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  title: "Thank You — We'll Be In Touch",
  description: "Your estimate request was received. We'll reach out shortly.",
  // Confirmation pages shouldn't be indexed.
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

const permanentSteps = [
  {
    icon: "phone" as const,
    title: "We'll reach out to schedule",
    body: "A quick call or text to find a design-consultation time that works for you.",
  },
  {
    icon: "calendar" as const,
    title: "We walk the home with you",
    body: "Rooflines, trim color, and what you want the home to feel like after dark.",
  },
  {
    icon: "tag" as const,
    title: "You see the design and the price",
    body: "A clear proposal for your home — no pressure, no obligation.",
  },
];

const christmasSteps = [
  {
    icon: "phone" as const,
    title: "We'll reach out",
    body: "Expect a call or text from the Rally team, usually the same business day.",
  },
  {
    icon: "calendar" as const,
    title: "We design your look",
    body: "Often from your address and photo alone — no appointment needed for most homes.",
  },
  {
    icon: "tag" as const,
    title: "You get your quote",
    body: "Design, install, maintenance, removal, and storage — one clear price in writing.",
  },
];

const nextSteps = [
  {
    icon: "phone" as const,
    title: "We'll reach out",
    body: "Expect a call or text from our team — usually the same day, during business hours.",
  },
  {
    icon: "calendar" as const,
    title: "We'll set a quick assessment",
    body: "We'll confirm details and, if needed, schedule a fast on-site look at your property.",
  },
  {
    icon: "tag" as const,
    title: "You'll get a clear quote",
    body: "A firm, itemized price in writing — no hidden fees, no pressure to commit.",
  },
];

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const matched = service ? getService(service) : undefined;
  const steps =
    service === "permanent-lighting"
      ? permanentSteps
      : service === "holiday-lighting"
        ? christmasSteps
        : nextSteps;
  const intro =
    service === "permanent-lighting"
      ? "We've received your design-consultation request. A member of the Rally team will reach out to schedule a time to walk the home with you."
      : service === "holiday-lighting"
        ? "We've received your Christmas lighting request. We'll review your home and reach out with your quote — often without needing a visit."
        : "We've received your free estimate request and a member of the Rally team will be in touch shortly.";

  return (
    <section className="bg-ink-900 py-20 text-white sm:py-28">
      <Container className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/15 text-green-400 ring-1 ring-green-400/30">
          <Icon name="check" className="h-10 w-10" strokeWidth={2.5} />
        </span>

        <h1 className="mx-auto mt-7 max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
          Thank you! Your request is in.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-200">
          {matched && !["permanent-lighting", "holiday-lighting"].includes(matched.slug)
            ? `Thanks for your interest in ${matched.name.toLowerCase()}. `
            : ""}
          {intro}
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400 text-ink-900">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-lg font-bold text-gold-300">
                  {i + 1}
                </span>
              </div>
              <h2 className="mt-4 font-bold text-white">{step.title}</h2>
              <p className="mt-1.5 text-sm text-ink-300">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <p className="text-ink-200">Need something sooner?</p>
          <CallButton source="thank_you" variant="primary" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/gallery" className="font-semibold text-gold-300 hover:text-gold-200">
            Browse our gallery →
          </Link>
          <span className="text-ink-600">·</span>
          <Link href="/services" className="font-semibold text-gold-300 hover:text-gold-200">
            Explore all services →
          </Link>
        </div>

        <p className="mt-10 text-sm text-ink-400">
          Prefer email? Reach us at{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>

        <div className="mt-8">
          <Button href="/" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
