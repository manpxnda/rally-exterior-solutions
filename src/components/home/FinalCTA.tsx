import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallLink } from "@/components/CallButton";

/** FINAL CTA — decisive close. Two doors, landscape as a small link. */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-white sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/lighting/christmas-warm-white.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_55%]"
        />
        <div className="absolute inset-0 bg-ink-900/75" />
      </div>
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          Ready to see your home differently?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-100">
          Show us your home. We&apos;ll take it from there.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/design-consultation" size="lg">
            Design My Permanent Lighting
          </Button>
          <Button href="/christmas-quote" variant="white" size="lg">
            Get My Christmas Quote
          </Button>
        </div>
        <p className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-ink-200 sm:flex-row sm:gap-5">
          <Link href="/services/landscape-lighting" className="underline underline-offset-4 hover:text-white">
            Landscape lighting
          </Link>
          <CallLink source="home_final_cta" className="underline underline-offset-4 hover:text-white">
            Call {site.phoneDisplay}
          </CallLink>
          <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-white">
            {site.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
