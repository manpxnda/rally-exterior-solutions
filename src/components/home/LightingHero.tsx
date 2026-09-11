import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * HOMEPAGE HERO — exterior lighting, two doors.
 * PHOTO: real Rally home at night, warm-white roofline + stone uplighting.
 * Swap /images/lighting/christmas-warm-white.jpg for a newer hero shot any time.
 */
export function LightingHero() {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-ink-900 text-white lg:min-h-[calc(100svh-4.5rem)] lg:max-h-[900px]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/lighting/christmas-warm-white.jpg"
          alt="Two-story home at night with warm white lighting along every roofline and soft uplighting on the stone foundation — a Rally Exterior Solutions install in the Ohio Valley"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_62%]"
        />
        {/* readability: darker toward the bottom-left where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-ink-900/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/55 via-ink-900/10 to-transparent" />
      </div>

      <div className="container relative max-w-none py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-sky-300 sm:text-sm">
            Permanent &bull; Christmas &bull; Landscape
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-shadow-lg sm:text-5xl lg:text-6xl">
            Your home changes after&nbsp;dark.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-50 text-shadow-lg sm:text-xl">
            Permanent lighting, professional Christmas displays, and landscape
            lighting — designed around your home, installed by Rally, and
            supported after the lights come on.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#permanent" size="lg">
              Explore Permanent Lighting
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button href="/christmas-quote" variant="white" size="lg">
              Get My Christmas Quote
            </Button>
          </div>

          <p className="mt-6 max-w-xl text-sm text-ink-200">
            Locally owned and operated in the Ohio Valley.{" "}
            <span className="hidden sm:inline text-ink-400">·</span>{" "}
            <span className="block sm:inline">
              Permanent stays up year-round. Christmas goes up in November and
              comes down in January.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
