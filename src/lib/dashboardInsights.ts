/**
 * Dashboard insights — turns raw Search Console numbers into (a) a KPI summary
 * with trends and (b) a prioritized "what to do next" action list. Pure
 * functions, no fetching, so they're easy to reason about and test.
 */
import type {
  Ranking,
  RankingsResult,
  PagePerformanceResult,
  IndexResult,
} from "./searchConsole";

export const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

export type Match = { row: Ranking | null; type: "exact" | "partial" | "none" };

/** Best Search Console query matching a hand-picked target keyword. */
export function matchTarget(target: string, rows: Ranking[]): Match {
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

/** Impressions-weighted average position (lower = better). */
function weightedAvgPosition(rows: Ranking[]): number {
  const total = rows.reduce((s, r) => s + r.impressions, 0);
  if (!total) return 0;
  return rows.reduce((s, r) => s + r.position * r.impressions, 0) / total;
}

export type Metric = { value: number; prev: number | null; delta: number | null };

export type Kpis = {
  configured: boolean;
  clicks: Metric;
  impressions: Metric;
  avgPosition: Metric; // delta is improvement (prev - cur), so + = better
  top3: number;
  top10: number;
  rankingKeywords: number;
  pagesIndexed: { indexed: number; total: number } | null;
};

export function summarizeKpis(
  current: RankingsResult,
  previous: RankingsResult,
  index: IndexResult
): Kpis {
  const rows = current.rows;
  const prevRows = previous.configured ? previous.rows : [];
  const hasPrev = prevRows.length > 0;

  const sumClicks = (rs: Ranking[]) => rs.reduce((s, r) => s + r.clicks, 0);
  const sumImpr = (rs: Ranking[]) => rs.reduce((s, r) => s + r.impressions, 0);

  const curClicks = sumClicks(rows);
  const prevClicks = sumClicks(prevRows);
  const curImpr = sumImpr(rows);
  const prevImpr = sumImpr(prevRows);
  const curPos = weightedAvgPosition(rows);
  const prevPos = weightedAvgPosition(prevRows);

  const pagesIndexed =
    index.configured && !index.error
      ? { indexed: index.rows.filter((r) => r.indexed).length, total: index.rows.length }
      : null;

  return {
    configured: current.configured,
    clicks: { value: curClicks, prev: hasPrev ? prevClicks : null, delta: hasPrev ? curClicks - prevClicks : null },
    impressions: { value: curImpr, prev: hasPrev ? prevImpr : null, delta: hasPrev ? curImpr - prevImpr : null },
    avgPosition: { value: curPos, prev: hasPrev ? prevPos : null, delta: hasPrev && prevPos ? prevPos - curPos : null },
    top3: rows.filter((r) => r.position <= 3.5).length,
    top10: rows.filter((r) => r.position <= 10.5).length,
    rankingKeywords: rows.length,
    pagesIndexed,
  };
}

export type ActionCategory = "Indexing" | "Quick win" | "CTR" | "Declining" | "Content gap";

export type ActionItem = {
  id: string;
  category: ActionCategory;
  tone: "red" | "amber" | "sky";
  title: string;
  detail: string;
  priority: number;
};

/** Rough click-through expectation by average position (used to flag laggards). */
function expectedCtr(pos: number): number {
  if (pos <= 1.5) return 0.28;
  if (pos <= 2.5) return 0.15;
  if (pos <= 3.5) return 0.1;
  if (pos <= 5) return 0.06;
  if (pos <= 7) return 0.04;
  if (pos <= 10) return 0.025;
  return 0.01;
}

export function buildActionItems(input: {
  current: RankingsResult;
  previous: RankingsResult;
  pages: PagePerformanceResult;
  index: IndexResult;
  targets: string[];
}): ActionItem[] {
  const { current, previous, index, targets } = input;
  const items: ActionItem[] = [];

  // 1) Pages Google hasn't indexed — they can't rank at all. Highest priority.
  if (index.configured && !index.error) {
    for (const r of index.rows) {
      if (!r.indexed) {
        items.push({
          id: `index:${r.path}`,
          category: "Indexing",
          tone: "red",
          title: `Request indexing for ${r.path}`,
          detail: `Google hasn't indexed this page (${r.coverageState}). It can't rank until it's indexed — paste the URL into Search Console and click "Request Indexing".`,
          priority: 10000 + 1, // always at the very top
        });
      }
    }
  }

  // 2) Striking distance — ranking #4–15 with real impressions = one good push
  //    from page 1 / the top 3. The biggest, fastest SEO wins.
  for (const r of current.rows) {
    if (r.position > 3.5 && r.position <= 15 && r.impressions >= 10) {
      items.push({
        id: `strike:${r.query}`,
        category: "Quick win",
        tone: "amber",
        title: `Push “${r.query}” toward the top 3 (now ~#${r.position.toFixed(1)})`,
        detail: `${r.impressions.toLocaleString()} impressions, ${r.clicks} clicks in 28 days — you're on the edge of page 1. Work this phrase into a page title/H2 + a paragraph, and add a GBP post or two.`,
        priority: 2000 + r.impressions,
      });
    }
  }

  // 3) CTR laggards — good position but clicks well below expectation = the
  //    title/description isn't compelling enough.
  for (const r of current.rows) {
    if (r.position <= 10 && r.impressions >= 30) {
      const exp = expectedCtr(r.position);
      if (r.ctr < 0.5 * exp) {
        items.push({
          id: `ctr:${r.query}`,
          category: "CTR",
          tone: "sky",
          title: `Sharpen the title/description for “${r.query}”`,
          detail: `Ranks ~#${r.position.toFixed(1)} with ${r.impressions.toLocaleString()} impressions but only ${(r.ctr * 100).toFixed(1)}% click through. A clearer, benefit-led page title could win more of that traffic with no ranking change.`,
          priority: 1000 + r.impressions * (exp - r.ctr) * 200,
        });
      }
    }
  }

  // 4) Declining — slipped vs the prior 28 days. Worth a look.
  if (previous.configured && previous.rows.length) {
    const prevByQuery = new Map(previous.rows.map((r) => [norm(r.query), r]));
    for (const r of current.rows) {
      const p = prevByQuery.get(norm(r.query));
      if (p && r.impressions >= 10) {
        const drop = r.position - p.position; // positive = worse
        if (drop >= 3) {
          items.push({
            id: `drop:${r.query}`,
            category: "Declining",
            tone: "red",
            title: `“${r.query}” slipped from #${p.position.toFixed(1)} to #${r.position.toFixed(1)}`,
            detail: `Down ${drop.toFixed(1)} spots vs the prior 28 days (${r.impressions.toLocaleString()} impressions). Check that the matching page still loads, still targets the phrase, and hasn't lost internal links.`,
            priority: 3000 + r.impressions,
          });
        }
      }
    }
  }

  // 5) Content gaps — target keywords not surfacing at all yet (one summary item).
  const gaps = targets.filter((t) => {
    const m = matchTarget(t, current.rows);
    return !m.row || m.row.impressions === 0;
  });
  if (gaps.length) {
    items.push({
      id: "gap:summary",
      category: "Content gap",
      tone: "sky",
      title: `${gaps.length} target keyword${gaps.length === 1 ? "" : "s"} aren't getting impressions yet`,
      detail: `e.g. ${gaps.slice(0, 3).map((g) => `“${g}”`).join(", ")}. Google isn't surfacing you for these — they need a dedicated page/section, internal links, and Google Business Profile posts. Full list in "Target keywords" below.`,
      priority: 500,
    });
  }

  return items.sort((a, b) => b.priority - a.priority);
}
