import { del, list, put } from "@vercel/blob";

/**
 * MINLEON CATALOG SYNC (server side)
 * ----------------------------------------------------------------------------
 * Rally buys its permanent-lighting product from Minleon's Shopify store
 * (minleonpermanentlighting.com). This module pulls the store's PUBLIC catalog
 * (products.json — a documented, crawl-allowed Shopify endpoint) once a day,
 * normalises it to a compact shape, and keeps versioned snapshots in the
 * private Vercel Blob store so the inventory app can show live retail prices
 * and availability, and flag what moved since the previous snapshot.
 *
 * Rally's EXCLUSIVE (logged-in) pricing cannot be read server-side: Minleon's
 * login is Shopify's passwordless customer-account flow (one-time email code),
 * so there is no credential a cron job could hold. Those prices are captured
 * by the "Sync my Minleon prices" bookmarklet inside the inventory app, run by
 * Jason in a browser where he is already logged in. See public/inventory/index.html.
 *
 * Snapshots:  <prefix>catalog-<fetchedAt>.json   (newest wins; old ones pruned)
 */

export const MINLEON_ORIGIN = "https://minleonpermanentlighting.com";
const PREFIX = process.env.MINLEON_BLOB_PREFIX || "minleon/";
const VERSION_RE = /catalog-(\d+)\.json$/;
const KEEP_VERSIONS = 14; // two weeks of daily snapshots
const USER_AGENT = "RallyInventoryBot/1.0 (+https://rallyexteriorsolutions.com; info@rallyexteriorsolutions.com)";

export type MinleonVariant = {
  id: number;
  title: string;
  sku: string | null;
  price: number; // USD
  compareAt: number | null;
  available: boolean;
};

export type MinleonProduct = {
  id: number;
  handle: string;
  title: string;
  type: string | null;
  variants: MinleonVariant[];
};

export type PriceChange = {
  vid: number;
  handle: string;
  product: string;
  variant: string;
  from: number | null; // null = variant did not exist in the previous snapshot
  to: number | null; // null = variant disappeared
  availableFrom?: boolean;
  availableTo?: boolean;
};

export type CatalogSnapshot = {
  fetchedAt: number;
  source: string;
  productCount: number;
  variantCount: number;
  products: MinleonProduct[];
  /** Differences vs the snapshot before this one (prices + availability). */
  changes: PriceChange[];
  previousFetchedAt: number | null;
};

type Version = { pathname: string; url: string; fetchedAt: number };

export function minleonConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/* ------------------------------------------------------------------------ */
/* Fetch + normalise                                                         */
/* ------------------------------------------------------------------------ */

type RawVariant = {
  id: number;
  title: string;
  sku: string | null;
  price: string;
  compare_at_price: string | null;
  available: boolean;
};
type RawProduct = { id: number; handle: string; title: string; product_type?: string; variants: RawVariant[] };

function money(s: string | null | undefined): number | null {
  if (s == null || s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

/** Pulls every page of /products.json (Shopify caps a page at 250 products). */
export async function fetchMinleonCatalog(): Promise<MinleonProduct[]> {
  const products: MinleonProduct[] = [];
  for (let page = 1; page <= 8; page++) {
    const res = await fetch(`${MINLEON_ORIGIN}/products.json?limit=250&page=${page}`, {
      headers: { "user-agent": USER_AGENT, accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Minleon products.json page ${page} → HTTP ${res.status}`);
    const data = (await res.json()) as { products?: RawProduct[] };
    const batch = Array.isArray(data.products) ? data.products : [];
    for (const p of batch) {
      products.push({
        id: p.id,
        handle: p.handle,
        title: p.title,
        type: p.product_type || null,
        variants: (p.variants || []).map((v) => ({
          id: v.id,
          title: v.title,
          sku: v.sku || null,
          price: money(v.price) ?? 0,
          compareAt: money(v.compare_at_price),
          available: Boolean(v.available),
        })),
      });
    }
    if (batch.length < 250) break;
  }
  if (!products.length) throw new Error("Minleon catalog came back empty");
  return products;
}

export function diffCatalogs(prev: MinleonProduct[] | null, next: MinleonProduct[]): PriceChange[] {
  if (!prev) return [];
  const before = new Map<number, { p: MinleonProduct; v: MinleonVariant }>();
  for (const p of prev) for (const v of p.variants) before.set(v.id, { p, v });
  const changes: PriceChange[] = [];
  const seen = new Set<number>();
  for (const p of next) {
    for (const v of p.variants) {
      seen.add(v.id);
      const old = before.get(v.id);
      if (!old) {
        changes.push({ vid: v.id, handle: p.handle, product: p.title, variant: v.title, from: null, to: v.price, availableTo: v.available });
      } else if (old.v.price !== v.price || old.v.available !== v.available) {
        changes.push({
          vid: v.id,
          handle: p.handle,
          product: p.title,
          variant: v.title,
          from: old.v.price,
          to: v.price,
          availableFrom: old.v.available,
          availableTo: v.available,
        });
      }
    }
  }
  for (const [vid, { p, v }] of before) {
    if (!seen.has(vid)) changes.push({ vid, handle: p.handle, product: p.title, variant: v.title, from: v.price, to: null, availableFrom: v.available });
  }
  return changes;
}

/* ------------------------------------------------------------------------ */
/* Blob storage (immutable versions, same pattern as the inventory state)    */
/* ------------------------------------------------------------------------ */

async function listVersions(): Promise<Version[]> {
  const { blobs } = await list({ prefix: `${PREFIX}catalog-`, limit: 1000 });
  return blobs
    .map((b) => ({ pathname: b.pathname, url: b.url, fetchedAt: Number((b.pathname.match(VERSION_RE) || [])[1] || 0) }))
    .filter((v) => v.fetchedAt > 0)
    .sort((a, b) => b.fetchedAt - a.fetchedAt);
}

async function fetchDoc<T>(url: string): Promise<T | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    if (res.ok) {
      const text = await res.text();
      if (!text) return null;
      return JSON.parse(text) as T;
    }
    if (res.status !== 404) throw new Error(`Blob read failed (${res.status})`);
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
}

export async function readLatestSnapshot(): Promise<CatalogSnapshot | null> {
  const versions = await listVersions();
  for (const v of versions.slice(0, 3)) {
    const doc = await fetchDoc<CatalogSnapshot>(v.url);
    if (doc && Array.isArray(doc.products)) return doc;
  }
  return null;
}

/**
 * Fetches the live catalog, diffs it against the newest stored snapshot, and
 * stores the result as a new version. Returns the new snapshot.
 */
export async function refreshMinleonSnapshot(): Promise<CatalogSnapshot> {
  const [products, previous] = await Promise.all([fetchMinleonCatalog(), readLatestSnapshot()]);
  const fetchedAt = Date.now();
  const snapshot: CatalogSnapshot = {
    fetchedAt,
    source: `${MINLEON_ORIGIN}/products.json`,
    productCount: products.length,
    variantCount: products.reduce((n, p) => n + p.variants.length, 0),
    products,
    changes: diffCatalogs(previous?.products ?? null, products),
    previousFetchedAt: previous?.fetchedAt ?? null,
  };
  await put(`${PREFIX}catalog-${fetchedAt}.json`, JSON.stringify(snapshot), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  // Prune (best effort).
  try {
    const versions = await listVersions();
    const stale = versions.slice(KEEP_VERSIONS).map((v) => v.url);
    if (stale.length) await del(stale);
  } catch (e) {
    console.error("[minleon] prune failed", e);
  }
  return snapshot;
}
