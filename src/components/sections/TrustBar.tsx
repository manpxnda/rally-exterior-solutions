import { trustSignals } from "@/data/content";
import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";

const iconMap: Record<string, IconName> = {
  pin: "pin",
  shield: "shield",
  tag: "tag",
  bolt: "bolt",
};

export function TrustBar() {
  return (
    <div className="border-b border-ink-100 bg-white">
      <Container>
        <dl className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {trustSignals.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-ink-900">
                <Icon name={iconMap[item.icon]} className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm font-bold text-ink-900">{item.label}</dt>
                <dd className="text-xs text-ink-500">{item.sub}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="sr-only">
          {site.name} has completed {site.stats.projectsCompleted} projects with
          a {site.stats.reviewRating}-star average rating.
        </p>
      </Container>
    </div>
  );
}
