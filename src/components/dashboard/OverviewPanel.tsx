import type { Kpis, Metric } from "@/lib/dashboardInsights";

/** Top-line "is the site winning?" KPIs — 28 days vs the prior 28. */
export function OverviewPanel({ kpis }: { kpis: Kpis }) {
  if (!kpis.configured) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900">At a glance</h2>
        <span className="text-xs text-ink-400">last 28 days vs prior 28</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Tile
          label="Clicks"
          value={kpis.clicks.value.toLocaleString()}
          metric={kpis.clicks}
          higherIsBetter
        />
        <Tile
          label="Impressions"
          value={kpis.impressions.value.toLocaleString()}
          metric={kpis.impressions}
          higherIsBetter
        />
        <Tile
          label="Avg. position"
          value={kpis.avgPosition.value ? kpis.avgPosition.value.toFixed(1) : "—"}
          metric={{
            value: kpis.avgPosition.value,
            prev: kpis.avgPosition.prev,
            // delta is already "improvement" (prev - cur); show it directly
            delta: kpis.avgPosition.delta,
          }}
          higherIsBetter
          deltaIsImprovement
          decimals={1}
        />
        <Tile label="Keywords in top 3" value={kpis.top3.toLocaleString()} tone="green" />
        <Tile label="Keywords in top 10" value={kpis.top10.toLocaleString()} tone="amber" />
        <Tile
          label="Pages indexed"
          value={
            kpis.pagesIndexed
              ? `${kpis.pagesIndexed.indexed}/${kpis.pagesIndexed.total}`
              : "—"
          }
        />
      </div>
    </section>
  );
}

function Tile({
  label,
  value,
  metric,
  tone = "navy",
  higherIsBetter = false,
  deltaIsImprovement = false,
  decimals = 0,
}: {
  label: string;
  value: string;
  metric?: Metric;
  tone?: "navy" | "green" | "amber";
  higherIsBetter?: boolean;
  deltaIsImprovement?: boolean;
  decimals?: number;
}) {
  const toneClass =
    tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-700" : "text-ink-900";

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
      <p className={`mt-1 font-display text-2xl font-extrabold ${toneClass}`}>{value}</p>
      {metric && <Delta metric={metric} higherIsBetter={higherIsBetter} deltaIsImprovement={deltaIsImprovement} decimals={decimals} />}
    </div>
  );
}

function Delta({
  metric,
  higherIsBetter,
  deltaIsImprovement,
  decimals,
}: {
  metric: Metric;
  higherIsBetter: boolean;
  deltaIsImprovement: boolean;
  decimals: number;
}) {
  if (metric.delta == null || metric.prev == null) {
    return <p className="mt-1 text-xs text-ink-300">no prior data</p>;
  }
  // delta is pre-framed so that, given higherIsBetter, positive is always good
  // (avg position passes prev - cur; counts pass cur - prev).
  const d = metric.delta;
  const isGood = higherIsBetter ? d > 0 : d < 0;
  if (Math.abs(d) < (decimals ? 0.1 : 0.5)) {
    return <p className="mt-1 text-xs font-semibold text-ink-400">— flat</p>;
  }
  const magnitude = decimals ? Math.abs(d).toFixed(decimals) : Math.abs(d).toLocaleString();
  const showPct = !deltaIsImprovement && metric.prev > 0;
  return (
    <p className={`mt-1 text-xs font-bold ${isGood ? "text-green-700" : "text-red-600"}`}>
      {isGood ? "▲" : "▼"} {magnitude}
      {showPct && (
        <span className="font-semibold text-ink-400">
          {" "}
          ({((d / metric.prev) * 100).toFixed(0)}%)
        </span>
      )}
    </p>
  );
}
