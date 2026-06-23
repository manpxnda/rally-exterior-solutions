import type { PagePerformanceResult } from "@/lib/searchConsole";

/** Which pages actually earn search traffic (top by clicks, from Search Console). */
export function PagePerformancePanel({ result }: { result: PagePerformanceResult }) {
  const { configured, rows, error } = result;
  if (!configured || error || rows.length === 0) return null;

  const top = rows.slice(0, 15);

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900">Top pages</h2>
        <span className="text-xs text-ink-400">by search clicks · last 28 days</span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-400">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Page</th>
                <th className="px-3 py-2.5 text-right font-semibold">Clicks</th>
                <th className="px-3 py-2.5 text-right font-semibold">Impr.</th>
                <th className="px-3 py-2.5 text-right font-semibold">CTR</th>
                <th className="px-4 py-2.5 text-right font-semibold">Pos.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {top.map((r) => (
                <tr key={r.page} className="hover:bg-ink-50/60">
                  <td className="max-w-[16rem] truncate px-4 py-2.5 font-medium text-ink-800">
                    {r.path}
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-ink-800">
                    {r.clicks.toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5 text-right text-ink-500">
                    {r.impressions.toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5 text-right text-ink-500">
                    {(r.ctr * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-2.5 text-right">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Your search-traffic workhorses. A page with lots of impressions but few
        clicks (low CTR) is a title/description to rewrite; a strong page is a
        model to copy on weaker ones.
      </p>
    </section>
  );
}
