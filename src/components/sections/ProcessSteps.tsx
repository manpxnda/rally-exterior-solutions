import { processSteps } from "@/data/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

export function ProcessSteps() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="How It Works"
        title="Getting started is genuinely easy"
        description="No pressure, no confusion — three simple steps from first call to finished job."
        className="mb-12"
      />

      <ol className="grid gap-6 md:grid-cols-3">
        {processSteps.map((step) => (
          <li
            key={step.number}
            className="relative rounded-2xl border border-ink-100 bg-white p-7 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 font-display text-xl font-extrabold text-ink-900 shadow-cta">
                {step.number}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Icon name={step.icon as IconName} className="h-6 w-6" />
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 text-center">
        <Button href="/contact" size="lg">
          Start With a Free Estimate
        </Button>
      </div>
    </Section>
  );
}
