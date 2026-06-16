import { guarantee } from "@/data/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function Guarantee() {
  return (
    <Section tone="white">
      <div className="overflow-hidden rounded-3xl border border-ink-100 bg-ink-50">
        <div className="grid lg:grid-cols-3">
          {/* Left badge panel */}
          <div className="flex flex-col justify-center bg-gradient-to-br from-ink-900 to-ink-700 p-8 text-white sm:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-ink-900">
              <Icon name="shield" className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
              {guarantee.title}
            </h2>
            <p className="mt-3 text-ink-200">
              Hiring an exterior company shouldn&apos;t feel risky. Here&apos;s
              our commitment to you, every single time.
            </p>
          </div>

          {/* Right points */}
          <div className="grid gap-px bg-ink-100 lg:col-span-2 sm:grid-cols-1">
            {guarantee.points.map((point) => (
              <div key={point.title} className="bg-ink-50 p-8 sm:p-10">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Icon name="check" className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-ink-600">{point.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
