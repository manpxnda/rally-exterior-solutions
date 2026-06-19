/**
 * Google Search Console — Search Analytics client.
 * ----------------------------------------------------------------------------
 * Pulls the exact queries the site ranks for (query, avg position, clicks,
 * impressions, CTR) using a Google **service account** — no external deps, just
 * a manually-signed RS256 JWT + fetch. Used ONLY server-side by the private
 * /dashboard, so the key is never exposed.
 *
 * Setup (see docs/SEARCH-CONSOLE-API.md). Vercel env:
 *   GSC_CLIENT_EMAIL  — service account email
 *   GSC_PRIVATE_KEY   — service account private key (PEM; \n-escaped is fine)
 *   GSC_SITE_URL      — "https://rallyexteriorsolutions.com/"  (URL-prefix property)
 *                       or "sc-domain:rallyexteriorsolutions.com" (domain property)
 */
import crypto from "crypto";

export type Ranking = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number;
};

export type RankingsResult = {
  configured: boolean;
  rows: Ranking[];
  range: { start: string; end: string } | null;
  error?: string;
};

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(email: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );
  const signingInput = `${header}.${claims}`;
  const signature = base64url(
    crypto.createSign("RSA-SHA256").update(signingInput).sign(privateKey)
  );
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("no access_token");
  return json.access_token;
}

const fmt = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Top queries the site ranks for over a `days` window.
 * `offsetDays` shifts the window into the past (e.g. 28 = the prior 28-day
 * period) so we can compute trends.
 */
export async function getSearchRankings(
  days = 28,
  rowLimit = 100,
  offsetDays = 0
): Promise<RankingsResult> {
  // Defensive: strip wrapping quotes + whitespace that often sneak in on paste.
  const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, "").trim();
  const email = clean(process.env.GSC_CLIENT_EMAIL);
  const rawKey = process.env.GSC_PRIVATE_KEY;
  const siteUrl = clean(process.env.GSC_SITE_URL);
  if (!email || !rawKey || !siteUrl) {
    return { configured: false, rows: [], range: null };
  }
  const privateKey = (clean(rawKey) ?? "").replace(/\\n/g, "\n");

  try {
    const token = await getAccessToken(email, privateKey);
    const end = new Date();
    end.setDate(end.getDate() - offsetDays);
    const start = new Date(end);
    start.setDate(start.getDate() - days);

    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
        siteUrl
      )}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: fmt(start),
          endDate: fmt(end),
          dimensions: ["query"],
          rowLimit,
        }),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return { configured: true, rows: [], range: null, error: `GSC ${res.status}` };
    }
    const json = (await res.json()) as {
      rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
    };
    const rows: Ranking[] = (json.rows ?? [])
      .map((r) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      }))
      .sort((a, b) => b.impressions - a.impressions);

    return { configured: true, rows, range: { start: fmt(start), end: fmt(end) } };
  } catch (e) {
    return { configured: true, rows: [], range: null, error: e instanceof Error ? e.message : "error" };
  }
}
