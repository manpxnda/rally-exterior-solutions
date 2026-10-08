import { catalogKey, readJson, redis } from "@/lib/inventoryStore";

/**
 * SUPPLIER CATALOG SYNC (server side)
 * ----------------------------------------------------------------------------
 * The inventory app shows live supplier prices next to Rally's stored costs.
 * Each inventory division has its own supplier store: Minleon
 * (minleonpermanentlighting.com) for permanent lighting, and whichever store
 * Jason connects for Christmas lighting. Any Shopify-based store works — its
 * PUBLIC catalog is the documented, crawl-allowed /products.json endpoint.
 *
 * Once a day (Vercel cron) and on demand, the catalog is pulled, normalised to
 * a compact shape, diffed against the previous snapshot, and stored as
 * versioned private blobs so the app can show list prices, availability and
 * what moved.
 *
 * Account (dealer) pricing cannot be read server-side: Shopify customer
 * logins are passwordless (one-time email code), so the app's bookmarklet
 * captures those prices from Jason's own logged-in browser instead.
 *
 * Storage: one JSON snapshot per store in Upstash Redis, key
 *   <REDIS_KEY_PREFIX>catalog:<bare host>   (see lib/inventoryStore.ts).
 * Each refresh diffs against the stored snapshot and replaces it.
 */

export const MINLEON_ORIGIN = "https://minleonpermanentlighting.com";
const USER_AGENT = "RallyInventoryBot/1.0 (+https://rallyexteriorsolutions.com; info@rallyexteriorsolutions.com)";

export class NotShopifyError extends Error {}

export type CatalogVariant = {
  id: number;
  title: string;
  sku: string | null;
  price: number; // USD
  compareAt: number | null;
  available: boolean;
};

export type CatalogProduct = {
  id: number;
  handle: string;
  title: string;
  type: string | null;
  variants: CatalogVariant[];
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
  store: string; // origin
  fetchedAt: number;
  source: string;
  productCount: number;
  variantCount: number;
  products: CatalogProduct[];
  /** Differences vs the snapshot before this one (prices + availability). */
  changes: PriceChange[];
  previousFetchedAt: number | null;
};

/* ------------------------------------------------------------------------ */
/* Store address validation                                                  */
/* ------------------------------------------------------------------------ */

/** "minleonpermanentlighting.com", "https://shop.example.com/collections/x" → "https://host". */
export function parseStoreOrigin(input: string | null | undefined): string | null {
  if (!input) return null;
  let s = String(input).trim();
  if (!s) return null;
  if (!/^[a-z]+:\/\//i.test(s)) s = "https://" + s;
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" || u.username || u.password) return null;
  const host = u.hostname.toLowerCase();
  if (!host.includes(".") || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.includes(":") || host.startsWith("[")) return null;
  return `https://${host}`;
}

export function hostOf(origin: string) {
  return origin.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

function keyFor(origin: string) {
  return catalogKey(hostOf(origin).replace(/^www\./, ""));
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
export async function fetchShopifyCatalog(origin: string): Promise<CatalogProduct[]> {
  const products: CatalogProduct[] = [];
  for (let page = 1; page <= 8; page++) {
    const res = await fetch(`${origin}/products.json?limit=250&page=${page}`, {
      headers: { "user-agent": USER_AGENT, accept: "application/json" },
      cache: "no-store",
      redirect: "follow",
    });
    if (!res.ok) {
      if (page === 1) throw new NotShopifyError(`${hostOf(origin)} did not return a product catalog (HTTP ${res.status}).`);
      break;
    }
    let data: { products?: RawProduct[] };
    try {
      data = (await res.json()) as { products?: RawProduct[] };
    } catch {
      throw new NotShopifyError(`${hostOf(origin)} did not return a product catalog.`);
    }
    if (!Array.isArray(data.products)) throw new NotShopifyError(`${hostOf(origin)} does not look like a Shopify store.`);
    const batch = data.products;
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
  if (!products.length) throw new NotShopifyError(`${hostOf(origin)} has an empty product catalog.`);
  return products;
}

export function diffCatalogs(prev: CatalogProduct[] | null, next: CatalogProduct[]): PriceChange[] {
  if (!prev) return [];
  const before = new Map<number, { p: CatalogProduct; v: CatalogVariant }>();
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
/* Storage                                                                   */
/* ------------------------------------------------------------------------ */

export async function readLatestSnapshot(origin: string): Promise<CatalogSnapshot | null> {
  const doc = await readJson<CatalogSnapshot>(keyFor(origin));
  if (doc && Array.isArray(doc.products)) return { ...doc, store: doc.store || origin };
  return null;
}

/**
 * Fetches the live catalog, diffs it against the stored snapshot, and
 * replaces it. Returns the new snapshot.
 */
export async function refreshSnapshot(origin: string): Promise<CatalogSnapshot> {
  const [products, previous] = await Promise.all([fetchShopifyCatalog(origin), readLatestSnapshot(origin)]);
  const fetchedAt = Date.now();
  const snapshot: CatalogSnapshot = {
    store: origin,
    fetchedAt,
    source: `${origin}/products.json`,
    productCount: products.length,
    variantCount: products.reduce((n, p) => n + p.variants.length, 0),
    products,
    changes: diffCatalogs(previous?.products ?? null, products).slice(0, 500),
    previousFetchedAt: previous?.fetchedAt ?? null,
  };
  await redis().set(keyFor(origin), JSON.stringify(snapshot));
  return snapshot;
}
