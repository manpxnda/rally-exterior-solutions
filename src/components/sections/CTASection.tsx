import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";
import { Icon } from "@/components/ui/Icon";

/** High-impact conversion banner used to close pages. */
export function CTASection({
  title = "Ready for a brighter, cleaner property?",
  subtitle = site.offer.sub,
  service,
}: {
  title?: string;
  subtitle?: string;
  service?: string;
}) {
  const href = service ? `/contact?service=${service}` : "/contact";
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20">
      <div className="glow-gold pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2" />
      <Container className="relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-gold-300">
          <Icon name="calendar" className="h-4 w-4" />
          {site.stats.responseTime} quotes · No obligation
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-200">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={href} size="lg">
            Get My Free Estimate
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <CallButton
            source="cta_banner"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>
      </Container>
    </section>
  );
}
