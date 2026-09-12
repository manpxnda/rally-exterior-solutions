import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * THE TWO DOORS — Permanent (navy, architectural) vs. Christmas (cream, easy).
 * Two different emotional experiences, one brand. Landscape is deliberately
 * not a third equal card.
 */
export function TwoPaths() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-label="Choose your lighting path">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* PERMANENT */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-ink-800 text-white shadow-card">
            <div className="relative aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src="/images/lighting/permanent-pure-white.jpg"
                alt="Craftsman-style home at night with clean white permanent lighting outlining every gable and eave"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
                Permanent Lighting
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                Permanent lighting. Built for the home.
              </h2>
              <p className="text-lg text-ink-100">
                Nearly invisible by day. Remarkable after dark.
              </p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                {[
                  ["Everyday", "Warm architectural white"],
                  ["Christmas", "One tap"],
                  ["Game day", "Team colors"],
                  ["Entertaining", "Custom scenes"],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-white/15 pt-2.5">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-300">{k}</dt>
                    <dd className="text-sm font-medium text-white sm:text-base">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-display text-xl font-bold text-sky-300">
                These lights never come down.
              </p>
              {/* Qualifying price — package framing only, never per foot */}
              <p className="text-sm leading-relaxed text-ink-100">
                <span className="font-semibold text-white">Projects generally start at $3,500.</span>{" "}
                Choose how far you want to take the home — the front elevation
                or the whole property.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                <Button href="/design-consultation">
                  Design My Home
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
                <Link
                  href="#permanent"
                  className="text-sm font-semibold text-ink-100 underline-offset-4 hover:text-white hover:underline"
                >
                  See how it works ↓
                </Link>
              </div>
            </div>
          </article>

          {/* CHRISTMAS */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-cream text-ink-900 shadow-card">
            <div className="relative aspect-[16/10] lg:aspect-[5/4]">
              <Image
                src="/images/lighting/christmas-gingerbread.jpg"
                alt="Brick home with multicolor Christmas lights along three peaked gables and warm uplighting in the landscaping"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-600">
                Christmas Lighting
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">
                You enjoy Christmas. Rally handles the lights.
              </h2>
              <p className="text-lg text-ink-700">
                No ladders. No tangled cords. No January cleanup.
              </p>
              <ul className="flex flex-wrap gap-2 pt-1" aria-label="What's included">
                {["Design", "Lights", "Install", "Timers", "Maintenance", "Removal", "Storage"].map((x) => (
                  <li
                    key={x}
                    className="rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-sm font-semibold text-ink-800"
                  >
                    {x}
                  </li>
                ))}
              </ul>
              <p className="font-display text-xl font-bold text-gold-600">
                Your Christmas is handled.
              </p>
              {/* Qualifying price — package framing only */}
              <p className="text-sm leading-relaxed text-ink-700">
                <span className="font-semibold text-ink-900">Professional displays generally start at $1,500.</span>{" "}
                Your final design depends on the areas of the home you&apos;d
                like to light.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                <Button href="/christmas-quote">
                  Get My Christmas Quote
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
                <Link
                  href="#christmas"
                  className="text-sm font-semibold text-ink-800 underline-offset-4 hover:text-ink-900 hover:underline"
                >
                  See Christmas lighting →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
