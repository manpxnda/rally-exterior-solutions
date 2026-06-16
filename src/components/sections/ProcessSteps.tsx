import { processSteps } from "@/data/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ProcessSteps() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="How It Works"
        title="Getting started is genuinely easy"
        description="No high-pressure sales, no confusing process. Three simple steps from first call to finished project."
        className="mb-12"
      />

      <ol className="grid gap-8 md:grid-cols-3">
        {processSteps.map((step, i) => (
          <li key={step.number} className="relative">
            {/* connector */}
            {i < processSteps.length - 1 && (
              <span className="absolute left-7 top-7 hidden h-px w-full bg-ink-100 md:block" />
            )}
            <div className="relative flex flex-col">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 font-display text-xl font-extrabold text-ink-900 shadow-cta">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {step.body}
              </p>
            </div>
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
