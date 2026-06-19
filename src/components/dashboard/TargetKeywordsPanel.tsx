import { targetKeywords } from "@/data/targetKeywords";
import type { RankingsResult, Ranking } from "@/lib/searchConsole";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

type Match = { row: Ranking | null; type: "exact" | "partial" | "none" };

function matchTarget(target: string, rows: Ranking[]): Match {
  const t = norm(target);
  const exact = rows.find((r) => norm(r.query) === t);
  if (exact) return { row: exact, type: "exact" };
  const words = t.split(" ").filter((w) => w.length > 2);
  const partials = rows.filter((r) => {
    const q = norm(r.query);
    return words.length > 0 && words.every((w) => q.includes(w));
  });
  if (partials.length) {
    partials.sort((a, b) => a.position - b.position);
    return { row: partials[0], type: "partial" };
  }
  return { row: null, type: "none" };
}

/**
 * Tracks the owner's hand-picked target keywords: current avg position + 28-day
 * trend vs the prior period. `previous` may be unconfigured/empty — trend just
 * hides in that case.
 */
export function TargetKeywordsPanel({
  current,
  previous,
}: {
  current: RankingsResult;
  previous: RankingsResult;
}) {
  // The all-queries panel already renders the "connect" / error states.
  if (!current.configured || current.rows.length === 0) return null;

  const items = targetKeywords.map((target) => {
    const m = matchTarget(target, current.rows);
    const pm = matchTarget(target, previous.rows);
    const pos = m.row?.position ?? null;
    const prevPos = pm.row?.position ?? null;
    const delta = pos != null && prevPos != null ? prevPos - pos : null; // + = moved up
    return {
      target,
      pos,
      delta,
      type: m.type,
      matched: m.row?.query,
      impressions: m.row?.impressions ?? 0,
      clicks: m.row?.clicks ?? 0,
    };
  });

  const ranking = items.filter((i) => i.pos != null).length;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-ink-900">Target keywords</h2>
        <span className="text-xs text-ink-400">
          {ranking}/{items.length} getting impressions · trend vs prior 28 days
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Target keyword</th>
              <th className="px-3 py-2.5 text-right font-semibold">Position</th>
              <th className="px-3 py-2.5 text-right font-semibold">Trend</th>
              <th className="px-4 py-2.5 text-right font-semibold">Impr.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {items.map((i) => (
              <tr key={i.target} className="hover:bg-ink-50/60">
                <td className="px-4 py-2.5">
                  <span className="font-medium text-ink-800">{i.target}</span>
                  {i.type === "partial" && i.matched && (
                    <span className="mt-0.5 block text-xs text-ink-400">≈ {i.matched}</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right">
                  {i.pos != null ? (
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-bold ${
                        i.pos <= 3.5
                          ? "bg-green-100 text-green-700"
                          : i.pos <= 10.5
                            ? "bg-amber-100 text-amber-700"
                            : "bg-ink-100 text-ink-500"
                      }`}
                    >
                      {i.pos.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-xs text-ink-300">not ranking yet</span>
                  )}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <Trend delta={i.delta} />
                </td>
                <td className="px-4 py-2.5 text-right text-ink-500">
                  {i.impressions.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Edit this list in <strong>src/data/targetKeywords.ts</strong>. Position is the 28-day average
        (lower = better); ▲ means you moved up vs the prior 28 days. &ldquo;≈&rdquo; = closest query
        Google has data for. Phrases with no impressions yet aren&apos;t surfacing you — prime targets
        for content + GBP.
      </p>
    </section>
  );
}

function Trend({ delta }: { delta: number | null }) {
  if (delta == null) return <span className="text-xs text-ink-300">—</span>;
  if (delta > 0.5)
    return <span className="text-xs font-bold text-green-700">▲ {delta.toFixed(1)}</span>;
  if (delta < -0.5)
    return <span className="text-xs font-bold text-red-600">▼ {Math.abs(delta).toFixed(1)}</span>;
  return <span className="text-xs font-semibold text-ink-400">— flat</span>;
}
