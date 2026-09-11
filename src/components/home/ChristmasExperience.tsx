import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const STEPS = [
  { title: "Show us your home", body: "Send your address and a photo if needed." },
  { title: "Pick your look", body: "Rally creates a few clean options." },
  { title: "We handle everything", body: "Lights, installation, timers, and in-season service." },
  { title: "Enjoy Christmas", body: "Come home to the finished display." },
  { title: "We return in January", body: "Removal, labeling, organization, and storage." },
];

/**
 * CHRISTMAS EXPERIENCE — convenience, relief, clarity, ease.
 * Warm cream background shifts the mood without turning into a Christmas store.
 */
export function ChristmasExperience() {
  return (
    <section id="christmas" className="bg-cream py-16 text-ink-900 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
            Christmas Lighting
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            Christmas lights without the ladder, tangled cords, or January cleanup.
          </h2>
          <p className="mt-4 text-xl font-semibold text-ink-800">
            You enjoy Christmas. Rally handles the lights.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[2.25rem_1fr] gap-x-3 rounded-2xl bg-white p-5 shadow-card lg:block"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 font-display text-sm font-extrabold text-ink-900 lg:mb-4">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold leading-snug text-ink-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-lg text-ink-800">
          Rally provides commercial-grade lights, sets the timers, and keeps
          everything working through the season. You don&apos;t climb anything,
          untangle anything, or store anything.
        </p>

        <div className="mt-8 flex flex-col items-start gap-3">
          <Button href="/christmas-quote" size="lg">
            Get My Christmas Quote
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <p className="text-sm text-ink-600">
            We can often design and quote your home remotely.{" "}
            <Link
              href="/services/holiday-lighting"
              className="font-semibold text-ink-900 underline-offset-4 hover:underline"
            >
              More about Christmas lighting →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
