import Image from "next/image";
import { site, regionLabel } from "@/lib/site";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { LeadForm } from "@/components/LeadForm";

const heroBullets = [
  "Permanent & holiday lighting",
  "House, roof & soft washing",
  "Concrete cleaning & sealing",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      {/* Real project photo background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/team/rally-driveway.png"
          alt="Rally Exterior Solutions surface-cleaning a driveway in the Ohio Valley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_30%]"
        />
        {/* readability overlays: opaque on the left where copy sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/92 to-ink-900/40" />
        <div className="absolute inset-0 bg-ink-900/35" />
      </div>

      {/* Ambient glow + texture */}
      <div className="glow-gold pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm">
            <Stars rating={site.stats.reviewRating} size="h-4 w-4" />
            <span className="font-semibold text-white">
              {site.stats.reviewRating}
            </span>
            <span className="text-ink-300">
              · {site.stats.reviewCount}+ local reviews
            </span>
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-shadow-lg sm:text-5xl lg:text-[3.4rem]">
            Make Your Property the{" "}
            <span className="text-gold-300">Brightest &amp; Cleanest</span> on
            the Block
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-100 text-shadow-lg">
            Lighting and exterior cleaning across the {regionLabel} region —
            done right, on time, by people who answer the phone.
          </p>

          <ul className="mt-6 space-y-2.5">
            {heroBullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-ink-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get My Free Estimate
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <CallButton
              source="hero"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:border-white hover:bg-white/10"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-300">
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="h-4 w-4 text-gold-300" /> Fully
              insured
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="pin" className="h-4 w-4 text-gold-300" /> Locally owned
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="bolt" className="h-4 w-4 text-gold-300" /> Same-day
              quotes
            </span>
          </div>
        </div>

        {/* Lead form card */}
        <div className="lg:justify-self-end lg:pl-6">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 text-ink-900 shadow-cardHover sm:p-7">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-gold-700">
                Free Estimate
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold">
              Get your free quote
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              {site.offer.sub} Takes about 30 seconds.
            </p>
            <div className="mt-5">
              <LeadForm source="hero_form" compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
