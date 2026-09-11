import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const STEPS = [
  {
    n: "01",
    title: "Tell us what you want the home to feel like.",
    body: "Warm and understated? Full color for the holidays? Both? That's where the design starts.",
  },
  {
    n: "02",
    title: "Rally designs the system around your home.",
    body: "Track placement, color, and coverage are chosen for your architecture, not pulled from a catalog.",
  },
  {
    n: "03",
    title: "Our team installs, tests, and cleans the property.",
    body: "Prepared crew, tidy work area, and every zone tested before we leave.",
  },
  {
    n: "04",
    title: "We set up your scenes and show you how everything works.",
    body: "Your everyday look, your holiday looks, and your schedule are ready on your phone before we pull out of the driveway.",
  },
];

/** HOW PERMANENT LIGHTING WORKS — four steps, no fluff. */
export function PermanentProcess() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="How it works"
        title="From first design to first night, Rally handles the details."
        align="left"
        className="mb-10"
      />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t-2 border-ink-100 pt-5 before:-mt-[calc(1.25rem+2px)] before:mb-5 before:block before:h-0.5 before:w-12 before:bg-gold-400">
            <span className="font-display text-sm font-extrabold tracking-wider text-gold-600">{s.n}</span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-ink-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Button href="/design-consultation" size="lg">
          Schedule My Design Consultation
          <Icon name="arrowRight" className="h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
}
