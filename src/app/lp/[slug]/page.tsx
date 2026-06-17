import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, getServiceSlugs } from "@/data/services";
import { showcase, beforeAfters } from "@/data/gallery";
import { processSteps } from "@/data/content";
import { site } from "@/lib/site";

import { BrandMark } from "@/components/layout/Logo";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/LeadForm";
import { CallLink } from "@/components/CallButton";
import { TrackedCall } from "@/components/TrackedCall";
import { Testimonials } from "@/components/sections/Testimonials";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — Free Estimate | ${site.name}`,
    description: service.metaDescription,
    // Paid landing pages are for ads, not organic — keep them out of the index
    // so they don't compete with the canonical /services/[slug] page.
    robots: { index: false, follow: true },
  };
}

export default async function LandingPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const heroImg = service.image ?? "/images/lighting/permanent-warm-white.jpg";
  const photos = showcase.filter((s) => s.service === slug);
  const pairs = beforeAfters.filter((b) => b.service === slug);
  const benefits = service.benefits.slice(0, 6);

  const trust = [
    { icon: "shield" as const, label: "Fully insured" },
    { icon: "pin" as const, label: "Locally owned" },
    { icon: "bolt" as const, label: `${site.stats.responseTime} quotes` },
    { icon: "star" as const, label: `${site.stats.reviewRating}★ (${site.stats.reviewCount}+ reviews)` },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal, distraction-free header — logo + phone + one CTA.
          (div, not <header>/<main>/<footer>: this page renders inside the root
          layout's <main>, so nested landmarks would be invalid.) */}
      <div className="sticky top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2.5" aria-label={site.name}>
            <BrandMark className="h-9 w-9 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-ink-900">
                Rally
              </span>
              <span className="mt-1 font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-400">
                Exterior Solutions
              </span>
            </span>
          </span>
          <div className="flex items-center gap-3">
            <CallLink
              source="lp_header"
              className="hidden text-sm font-bold text-ink-900 hover:text-gold-600 sm:inline-flex"
            />
            <Button href="#quote" size="sm">
              Free Estimate
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 pb-24 lg:pb-0">
        {/* HERO + form */}
        <section className="relative overflow-hidden bg-ink-900 text-white">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={heroImg}
              alt={`${service.name} by ${site.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/92 to-ink-900/50" />
            <div className="absolute inset-0 bg-ink-900/40" />
          </div>
          <div className="glow-gold pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem]" />

          <div className="container relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm">
                <Stars rating={site.stats.reviewRating} size="h-4 w-4" />
                <span className="font-semibold text-white">{site.stats.reviewRating}</span>
                <span className="text-ink-300">· {site.stats.reviewCount}+ local reviews</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-shadow-lg sm:text-5xl">
                {service.heroHeadline}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-100 text-shadow-lg">
                {service.heroSub}
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-ink-100">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                      <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#quote" size="lg">
                  Get My Free Estimate
                  <Icon name="arrowRight" className="h-5 w-5" />
                </Button>
                <TrackedCall
                  source="lp_hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold text-white hover:border-white hover:bg-white/10"
                >
                  <Icon name="phone" className="h-5 w-5" />
                  {site.phoneDisplay}
                </TrackedCall>
              </div>
            </div>

            {/* Lead form */}
            <div id="quote" className="scroll-mt-24 lg:justify-self-end">
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 text-ink-900 shadow-cardHover sm:p-7">
                <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold-700">
                  Free Estimate
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold">
                  Get your free quote
                </h2>
                <p className="mt-1 text-sm text-ink-500">
                  {site.offer.sub} Takes about 30 seconds.
                </p>
                <div className="mt-5">
                  <LeadForm source={`lp_${slug}`} defaultService={slug} compact />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <div className="border-b border-ink-100 bg-white">
          <div className="container grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-gold-600">
                  <Icon name={t.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-ink-900">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photo proof */}
        {photos.length > 0 && (
          <section className="bg-white py-14 sm:py-16">
            <div className="container">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                  Real Rally Projects
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink-900">
                  See the {service.shortName.toLowerCase()} in action
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {photos.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
                  >
                    {p.src && (
                      <Image
                        src={p.src}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits */}
        <section className="bg-ink-50 py-14 sm:py-16">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-ink-900">
                Why homeowners choose Rally
              </h2>
              <p className="mt-3 text-ink-600">{service.summary}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium text-ink-700">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="#quote" size="lg">
                Get My Free Estimate
                <Icon name="arrowRight" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-14 sm:py-16">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                How It Works
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink-900">
                Three easy steps
              </h2>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              {processSteps.map((step) => (
                <li key={step.number} className="flex flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 font-display text-lg font-extrabold text-ink-900 shadow-cta">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Before/after proof for cleaning LPs that have pairs */}
        {photos.length === 0 && pairs.length > 0 && (
          <section className="bg-ink-50 py-14 sm:py-16">
            <div className="container">
              <h2 className="mb-10 text-center font-display text-3xl font-bold text-ink-900">
                Real before &amp; afters
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pairs.slice(0, 3).map((p) => (
                  <div key={p.id} className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
                    {p.after && (
                      <Image src={p.after} alt={p.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Testimonials limit={3} />

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-ink-900 py-16 text-center text-white">
          <div className="glow-gold pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2" />
          <div className="container relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
              Ready to make your home the brightest on the block?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-200">
              Free, no-pressure estimate — most quotes back same-day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#quote" size="lg">
                Get My Free Estimate
                <Icon name="arrowRight" className="h-5 w-5" />
              </Button>
              <TrackedCall
                source="lp_footer_cta"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold text-white hover:border-white hover:bg-white/10"
              >
                <Icon name="phone" className="h-5 w-5" />
                Call {site.phoneDisplay}
              </TrackedCall>
            </div>
          </div>
        </section>
      </div>

      {/* Minimal footer (no nav to leak clicks) */}
      <div className="border-t border-ink-100 bg-white py-8">
        <div className="container flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="inline-flex items-center gap-2.5">
            <BrandMark className="h-8 w-8" />
            <span className="text-sm font-bold text-ink-900">{site.name}</span>
          </span>
          <p className="text-sm text-ink-500">
            Serving the Ohio Valley &amp; Wheeling, WV · Fully insured ·{" "}
            <CallLink source="lp_footer" className="font-bold text-ink-900 hover:text-gold-600" />
          </p>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <TrackedCall
            source="lp_mobile_bar"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-200 px-4 py-3 text-sm font-bold text-ink-900"
          >
            <Icon name="phone" className="h-5 w-5" />
            Call Now
          </TrackedCall>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-4 py-3 text-sm font-bold text-ink-900 shadow-cta"
          >
            <Icon name="calendar" className="h-5 w-5" />
            Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
