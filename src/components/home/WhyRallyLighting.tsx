import { Section, SectionHeading } from "@/components/ui/Section";

const ITEMS = [
  {
    title: "Designed for your home",
    body: "Not a one-size-fits-all installation. Track, color, and placement are chosen for your architecture.",
  },
  {
    title: "Proactive communication",
    body: "You'll know what happens next before you have to ask. Scheduling, arrival, and follow-up included.",
  },
  {
    title: "Professional installation",
    body: "Prepared crews, clean work areas, and respect for the property. We leave it the way we found it, plus lights.",
  },
  {
    title: "Rally Care",
    body: "If something isn't right, Rally owns the next step and keeps you updated until it's resolved.",
  },
  {
    title: "A finished experience",
    body: "The job isn't done when the lights turn on. We make sure you understand and enjoy what was installed.",
  },
];

/** WHY RALLY — what the experience feels like, not contractor clichés. */
export function WhyRallyLighting() {
  return (
    <Section tone="ink" id="why-rally">
      <SectionHeading
        eyebrow="Why Rally"
        title="The lights are only part of the experience."
        description="Premium is a feeling created by consistent details. Here is what that looks like from your side of the driveway."
        align="left"
        tone="light"
        className="mb-10"
      />
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it) => (
          <div key={it.title} className="border-t border-white/15 pt-4 before:-mt-[calc(1rem+1px)] before:mb-4 before:block before:h-0.5 before:w-8 before:bg-gold-400">
            <dt className="font-display text-lg font-bold text-white">{it.title}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink-200">{it.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
