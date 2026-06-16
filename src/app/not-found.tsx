import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/CallButton";

export default function NotFound() {
  return (
    <section className="bg-ink-900 py-24 text-white sm:py-32">
      <Container className="text-center">
        <p className="font-display text-7xl font-extrabold text-gold-300">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-200">
          The page may have moved — but we&apos;re still here to brighten and
          clean up your property.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <CallButton
            source="404"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-white hover:bg-white/10"
          />
        </div>

        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-400">
            Popular services
          </p>
          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-ink-100 hover:border-white hover:text-white"
              >
                {s.shortName}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
