import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Promotes the free lighting mockup tool — a high-intent lead magnet. */
export function MockupPromo() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/lighting/permanent-warm-white.jpg"
          alt="Home with permanent exterior lighting at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/60" />
      </div>
      <div className="glow-gold pointer-events-none absolute -bottom-32 right-10 h-[28rem] w-[28rem]" />

      <Container className="relative">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold text-gold-300">
            <Icon name="sparkle" className="h-4 w-4" />
            Free interactive tool
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            See your home lit up — <span className="text-gold-300">before you buy</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-100">
            Upload a photo of your home and preview permanent or Christmas
            lighting right on it — pick the style, spacing, and colors. Love it?
            We&apos;ll send a free designer mockup and quote.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/mockup" size="lg">
              Try the Free Mockup
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
