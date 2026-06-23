/**
 * Google Search Console — Search Analytics + URL Inspection client.
 * ----------------------------------------------------------------------------
 * Pulls the exact queries/pages the site ranks for (query, avg position, clicks,
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

export type PageRow = {
  page: string; // full URL
  path: string; // path only, for display
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type PagePerformanceResult = {
  configured: boolean;
  rows: PageRow[];
  range: { start: string; end: string } | null;
  error?: string;
};

const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://rallyexteriorsolutions.com";

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/** Strip wrapping quotes + whitespace that often sneak in on paste. */
const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, "").trim();

type Creds = { email: string; privateKey: string; siteUrl: string };

/** Load + sanitize the service-account credentials, or null if not configured. */
function loadCreds(): Creds | null {
  const email = clean(process.env.GSC_CLIENT_EMAIL);
  const rawKey = process.env.GSC_PRIVATE_KEY;
  const siteUrl = clean(process.env.GSC_SITE_URL);
  if (!email || !rawKey || !siteUrl) return null;
  const privateKey = (clean(rawKey) ?? "").replace(/\\n/g, "\n");
  return { email, privateKey, siteUrl };
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

type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type RawResult = {
  configured: boolean;
  rows: GscRow[];
  range: { start: string; end: string } | null;
  error?: string;
};

/**
 * Core Search Analytics query. `offsetDays` shifts the window into the past
 * (e.g. 28 = the prior 28-day period) so callers can compute trends.
 */
async function querySearchAnalytics(
  dimensions: string[],
  days: number,
  rowLimit: number,
  offsetDays: number
): Promise<RawResult> {
  const creds = loadCreds();
  if (!creds) return { configured: false, rows: [], range: null };

  try {
    const token = await getAccessToken(creds.email, creds.privateKey);
    const end = new Date();
    end.setDate(end.getDate() - offsetDays);
    const start = new Date(end);
    start.setDate(start.getDate() - days);

    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
        creds.siteUrl
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
          dimensions,
          rowLimit,
        }),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return { configured: true, rows: [], range: null, error: `GSC ${res.status}` };
    }
    const json = (await res.json()) as { rows?: GscRow[] };
    return {
      configured: true,
      rows: json.rows ?? [],
      range: { start: fmt(start), end: fmt(end) },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    // Surface the email actually loaded so credential mismatches are obvious.
    return { configured: true, rows: [], range: null, error: `${msg} [using email=${creds.email}]` };
  }
}

/** Top queries the site ranks for over a `days` window (sorted by impressions). */
export async function getSearchRankings(
  days = 28,
  rowLimit = 100,
  offsetDays = 0
): Promise<RankingsResult> {
  const raw = await querySearchAnalytics(["query"], days, rowLimit, offsetDays);
  const rows: Ranking[] = raw.rows
    .map((r) => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }))
    .sort((a, b) => b.impressions - a.impressions);
  return { configured: raw.configured, rows, range: raw.range, error: raw.error };
}

/** Top landing pages by clicks over a `days` window. */
export async function getPagePerformance(
  days = 28,
  rowLimit = 500,
  offsetDays = 0
): Promise<PagePerformanceResult> {
  const raw = await querySearchAnalytics(["page"], days, rowLimit, offsetDays);
  const rows: PageRow[] = raw.rows
    .map((r) => {
      const page = r.keys[0];
      const path = page.replace(SITE_BASE, "").replace(/^https?:\/\/[^/]+/, "") || "/";
      return {
        page,
        path,
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      };
    })
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  return { configured: raw.configured, rows, range: raw.range, error: raw.error };
}

export type IndexStatus = {
  path: string;
  url: string;
  verdict: string; // PASS = indexed
  coverageState: string; // human-readable, e.g. "Submitted and indexed"
  lastCrawl: string | null;
  indexed: boolean;
};

export type IndexResult = {
  configured: boolean;
  rows: IndexStatus[];
  error?: string;
};

/**
 * Per-URL Google index status via the URL Inspection API.
 * NOTE: this endpoint requires the service account to be a FULL/owner user on
 * the property (not "Restricted"); a 403 means it needs upgraded permission.
 */
export async function getIndexStatus(paths: string[]): Promise<IndexResult> {
  const creds = loadCreds();
  if (!creds) return { configured: false, rows: [] };

  try {
    const token = await getAccessToken(creds.email, creds.privateKey);
    const rows = await Promise.all(
      paths.map(async (path) => {
        const url = `${SITE_BASE}${path}`;
        const res = await fetch(
          "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ inspectionUrl: url, siteUrl: creds.siteUrl, languageCode: "en-US" }),
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error(`${res.status}`);
        const json = (await res.json()) as {
          inspectionResult?: {
            indexStatusResult?: { verdict?: string; coverageState?: string; lastCrawlTime?: string };
          };
        };
        const r = json.inspectionResult?.indexStatusResult ?? {};
        const verdict = r.verdict ?? "VERDICT_UNSPECIFIED";
        return {
          path,
          url,
          verdict,
          coverageState: r.coverageState ?? "Unknown to Google",
          lastCrawl: r.lastCrawlTime ?? null,
          indexed: verdict === "PASS",
        } as IndexStatus;
      })
    );
    return { configured: true, rows };
  } catch (e) {
    return { configured: true, rows: [], error: e instanceof Error ? e.message : "error" };
  }
}
