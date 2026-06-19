import { getIndexStatus } from "@/lib/searchConsole";
import { getServiceSlugs } from "@/data/services";
import { Icon } from "@/components/ui/Icon";

// Pages we care most about getting indexed: core + every service page.
const KEY_PATHS = [
  "/",
  "/services",
  ...getServiceSlugs().map((s) => `/services/${s}`),
  "/locations",
  "/contact",
];

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
  } catch {
    return "—";
  }
}

export async function IndexStatusPanel() {
  const { configured, rows, error } = await getIndexStatus(KEY_PATHS);

  // RankingsPanel already renders the "connect Search Console" card.
  if (!configured) return null;

  if (error) {
    const permission = error.includes("403");
    return (
      <section className="mb-10">
        <Heading />
        <div className="rounded-2xl border border-ink-100 bg-white p-6 text-sm text-ink-600 shadow-card">
          {permission ? (
            <>
              <p className="font-semibold text-ink-900">One quick permission bump needed.</p>
              <p className="mt-1.5">
                Index status uses Google&apos;s URL Inspection API, which needs the service account
                to be a <strong>Full</strong> user (it&apos;s currently &ldquo;Restricted&rdquo;). In
                Search Console → <em>Settings → Users and permissions</em>, change{" "}
                <code className="rounded bg-ink-100 px-1">rally-gsc-reader@…</code> from Restricted to{" "}
                <strong>Full</strong>. Then this panel will show which pages Google has indexed.
              </p>
            </>
          ) : (
            <>Couldn&apos;t load index status ({error}).</>
          )}
        </div>
      </section>
    );
  }

  const indexed = rows.filter((r) => r.indexed).length;

  return (
    <section className="mb-10">
      <Heading />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Pages checked" value={String(rows.length)} />
        <Stat label="Indexed" value={String(indexed)} tone="green" />
        <Stat label="Not yet indexed" value={String(rows.length - indexed)} tone="amber" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Page</th>
              <th className="px-3 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 text-right font-semibold">Last crawl</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((r) => (
              <tr key={r.path} className="hover:bg-ink-50/60">
                <td className="px-4 py-2.5 font-medium text-ink-800">{r.path}</td>
                <td className="px-3 py-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${r.indexed ? "bg-green-500" : "bg-amber-500"}`}
                    />
                    <span className={r.indexed ? "text-green-700" : "text-amber-700"}>
                      {r.coverageState}
                    </span>
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-ink-500">{fmtDate(r.lastCrawl)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-400">
        Not indexed yet? In Search Console, paste the URL in the top search bar → <strong>Request
        Indexing</strong>. New domains take days–weeks; requesting speeds it up (~10–20 URLs/day limit).
      </p>
    </section>
  );
}

function Heading() {
  return (
    <h2 className="mb-4 font-display text-xl font-bold text-ink-900">
      Google index status
    </h2>
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
