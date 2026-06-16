import { whyRally } from "@/data/content";
import { site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

const iconMap: Record<string, IconName> = {
  layers: "layers",
  sparkle: "sparkle",
  chat: "chat",
  image: "image",
};

export function WhyRally() {
  return (
    <Section tone="white">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Why Rally"
            title="The exterior company homeowners actually recommend"
            description="We built Rally to fix everything people hate about hiring contractors: no-shows, vague pricing, sloppy work, and silence when you call."
            align="left"
          />
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {whyRally.map((item) => (
              <div key={item.title}>
                <dt className="flex items-center gap-2.5 font-bold text-ink-900">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-100 text-gold-700">
                    <Icon name={iconMap[item.icon]} className="h-5 w-5" />
                  </span>
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats panel */}
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-700 p-8 text-white shadow-card sm:p-10">
          <h3 className="font-display text-xl font-bold text-gold-300">
            Proof, not promises
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <Stat value={site.stats.projectsCompleted} label="Projects completed" />
            <Stat
              value={`${site.stats.reviewRating}★`}
              label={`${site.stats.reviewCount}+ reviews`}
            />
            <Stat value={site.stats.responseTime} label="Quote turnaround" />
            <Stat value="100%" label="Satisfaction focus" />
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-ink-200">
            “We treat every property like it&apos;s our own — and we don&apos;t
            consider the job done until you&apos;re thrilled with it.”
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            — The Rally Team
          </p>
        </div>
      </div>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-ink-200">{label}</div>
    </div>
  );
}
