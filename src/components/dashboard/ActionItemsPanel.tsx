import type { ActionItem } from "@/lib/dashboardInsights";
import { Icon, type IconName } from "@/components/ui/Icon";

const META: Record<
  ActionItem["category"],
  { icon: IconName; chip: string; dot: string }
> = {
  Indexing: { icon: "shield", chip: "bg-red-100 text-red-700", dot: "bg-red-500" },
  "Quick win": { icon: "bolt", chip: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  CTR: { icon: "chat", chip: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  Declining: { icon: "arrowRight", chip: "bg-red-100 text-red-700", dot: "bg-red-500" },
  "Content gap": { icon: "image", chip: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
};

/**
 * The centerpiece: a prioritized "what to do next" list, auto-generated from
 * live Search Console numbers. Limited to the top items so it stays actionable.
 */
export function ActionItemsPanel({
  items,
  configured,
  limit = 12,
}: {
  items: ActionItem[];
  configured: boolean;
  limit?: number;
}) {
  if (!configured) return null;

  const shown = items.slice(0, limit);

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900">
          What to do next
        </h2>
        <span className="text-xs text-ink-400">
          {items.length === 0 ? "all clear" : `${items.length} suggestion${items.length === 1 ? "" : "s"} · ranked by impact`}
        </span>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-800 shadow-card">
          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Icon name="check" className="h-5 w-5" strokeWidth={2.5} />
          </span>
          Nothing urgent from the search data right now. As impressions build,
          new opportunities (close-to-page-1 keywords, pages to retitle) will
          show up here automatically.
        </div>
      ) : (
        <ol className="space-y-3">
          {shown.map((item, i) => {
            const m = META[item.category];
            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${m.chip}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                      {item.category}
                    </span>
                    <h3 className="font-bold text-ink-900">{item.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
      {items.length > shown.length && (
        <p className="mt-2 text-xs text-ink-400">
          Showing the top {shown.length} of {items.length}. Knock these out first
          — the rest will resurface as you go.
        </p>
      )}
    </section>
  );
}
