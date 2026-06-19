import { getSearchRankings } from "@/lib/searchConsole";
import { Icon } from "@/components/ui/Icon";

/** Live keyword rankings from Search Console (server-rendered, behind auth). */
export async function RankingsPanel() {
  const { configured, rows, range, error } = await getSearchRankings();

  if (!configured) {
    return (
      <Card>
        <Heading />
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <Icon name="star" className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-bold text-ink-900">Connect Search Console</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
            See the exact keywords you rank for — query, average position, clicks
            &amp; impressions — right here. One-time setup with a Google service
            account.
          </p>
          <p className="mx-auto mt-3 max-w-md text-xs text-ink-400">
            Add <code className="rounded bg-ink-100 px-1">GSC_CLIENT_EMAIL</code>,{" "}
            <code className="rounded bg-ink-100 px-1">GSC_PRIVATE_KEY</code> &amp;{" "}
            <code className="rounded bg-ink-100 px-1">GSC_SITE_URL</code> in Vercel.
            Full steps in <strong>docs/SEARCH-CONSOLE-API.md</strong>.
          </p>
        </div>
      </Card>
    );
  }

  if (error || rows.length === 0) {
    return (
      <Card>
        <Heading range={range} />
        <div className="rounded-2xl border border-ink-100 bg-white p-6 text-sm text-ink-500 shadow-card">
          {error
            ? `Couldn't load rankings (${error}). Confirm the service account email was added as a user in Search Console for this property.`
            : "No query data yet. New sites take a few weeks to accumulate impressions — check back soon."}
        </div>
      </Card>
    );
  }

  const top3 = rows.filter((r) => r.position <= 3.5).length;
  const top10 = rows.filter((r) => r.position <= 10.5).length;
  const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
  const totalImpr = rows.reduce((s, r) => s + r.impressions, 0);

  return (
    <Card>
      <Heading range={range} />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Keywords" value={rows.length.toLocaleString()} />
        <Stat label="In top 3" value={top3.toLocaleString()} tone="green" />
        <Stat label="In top 10" value={top10.toLocaleString()} tone="amber" />
        <Stat label="Clicks (28d)" value={totalClicks.toLocaleString()} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
        <div className="max-h-[28rem] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-ink-50 text-xs uppercase tracking-wide text-ink-400">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Keyword</th>
                <th className="px-3 py-2.5 text-right font-semibold">Pos.</th>
                <th className="px-3 py-2.5 text-right font-semibold">Clicks</th>
                <th className="px-4 py-2.5 text-right font-semibold">Impr.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.slice(0, 50).map((r) => (
                <tr key={r.query} className="hover:bg-ink-50/60">
                  <td className="px-4 py-2.5 font-medium text-ink-800">{r.query}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-bold ${
                        r.position <= 3.5
                          ? "bg-green-100 text-green-700"
                          : r.position <= 10.5
                            ? "bg-amber-100 text-amber-700"
                            : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {r.position.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right text-ink-700">{r.clicks.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right text-ink-500">{r.impressions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Showing top {Math.min(rows.length, 50)} of {rows.length.toLocaleString()} keywords by
        impressions · {totalImpr.toLocaleString()} total impressions. Position is the 28-day average
        (lower = better). Green = top 3, amber = top 10.
      </p>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <section className="mb-10">{children}</section>;
}

function Heading({ range }: { range?: { start: string; end: string } | null }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-xl font-bold text-ink-900">
        Keyword rankings
      </h2>
      {range && (
        <span className="text-xs text-ink-400">
          {range.start} → {range.end}
        </span>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "navy",
}: {
  label: string;
  value: string;
  tone?: "navy" | "green" | "amber";
}) {
  const toneClass =
    tone === "green" ? "text-green-700" : tone === "amber" ? "text-amber-700" : "text-ink-900";
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
      <p className={`mt-1 font-display text-2xl font-extrabold ${toneClass}`}>{value}</p>
    </div>
  );
}
