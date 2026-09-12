import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * HOMEPAGE HERO — exterior lighting, two doors.
 * PHOTO: permanent warm-white track on a real install (architectural, not
 * "Christmas lights left on"). HERO PHOTO UPGRADE RECOMMENDED: this file is
 * 1331px wide — a 2000px+ blue-hour shot of a Rally permanent install would
 * be sharper on large/retina screens. Swap the src here when it exists.
 */
export function LightingHero() {
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-ink-900 text-white lg:min-h-[calc(100svh-4.5rem)] lg:max-h-[900px]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/lighting/permanent-warm-white.jpg"
          alt="Two-story craftsman home at night with warm white permanent lighting outlining every gable and eave — a Rally Exterior Solutions install"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_50%]"
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
            <Button href="/design-consultation" size="lg">
              Design My Home
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button href="/christmas-quote" variant="white" size="lg">
              Get My Christmas Quote
            </Button>
          </div>

          {/* Proof strip — verified facts only (rating/count from site.stats) */}
          <ul
            className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-100 sm:text-xs"
            aria-label="Why homeowners trust Rally"
          >
            <li className="text-white">
              {site.stats.reviewRating}★ · {site.stats.reviewCount} Google reviews
            </li>
            <li aria-hidden="true" className="text-sky-300">•</li>
            <li>Local Ohio Valley team</li>
            <li aria-hidden="true" className="text-sky-300">•</li>
            <li>Professional installation</li>
            <li aria-hidden="true" className="text-sky-300">•</li>
            <li>Rally Care support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
