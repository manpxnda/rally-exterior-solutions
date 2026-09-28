import { list } from "@vercel/blob";

/**
 * Inventory state storage (shared by /inventory/api and the supplier cron).
 *
 * The inventory app mirrors its whole state to the private Vercel Blob store
 * "rally-inventory" as IMMUTABLE versions: <prefix>state-<updatedAt>.json.
 * The newest version is found with the (consistent) list API; content URLs
 * never change underneath a cache. Old versions are pruned by the writer.
 */
export const INVENTORY_PREFIX = process.env.INVENTORY_BLOB_PREFIX || "inventory/";
const VERSION_RE = /state-(\d+)\.json$/;

export type InventoryDoc = {
  updatedAt: number;
  device?: string;
  savedAt?: string;
  state: unknown;
};

export type InventoryVersion = { pathname: string; url: string; updatedAt: number };

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Newest first. */
export async function listInventoryVersions(): Promise<InventoryVersion[]> {
  const { blobs } = await list({ prefix: `${INVENTORY_PREFIX}state-`, limit: 1000 });
  return blobs
    .map((b) => ({ pathname: b.pathname, url: b.url, updatedAt: Number((b.pathname.match(VERSION_RE) || [])[1] || 0) }))
    .filter((v) => v.updatedAt > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Read a private blob's JSON content (RW token). Retries a transient 404. */
export async function fetchBlobJson<T>(url: string): Promise<T | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    if (res.ok) {
      const text = await res.text();
      if (!text) return null;
      const doc = JSON.parse(text) as T;
      return doc && typeof doc === "object" ? doc : null;
    }
    if (res.status !== 404) throw new Error(`Blob read failed (${res.status})`);
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
}

export async function readLatestInventory(): Promise<{ doc: InventoryDoc; version: InventoryVersion } | null> {
  const versions = await listInventoryVersions();
  for (const version of versions.slice(0, 3)) {
    const doc = await fetchBlobJson<InventoryDoc>(version.url);
    if (doc) return { doc, version };
  }
  return null;
}

/**
 * Supplier store origins configured in the inventory app (one per division,
 * e.g. Minleon for permanent lighting, whatever Jason connects for Christmas).
 */
export function supplierOriginsIn(state: unknown): string[] {
  const out = new Set<string>();
  const s = state as { divisions?: Record<string, { supplier?: { store?: unknown } }>; supplier?: { store?: unknown } } | null;
  if (!s || typeof s !== "object") return [];
  const divs = s.divisions && typeof s.divisions === "object" ? Object.values(s.divisions) : [s];
  for (const d of divs) {
    const store = d && typeof d === "object" ? d.supplier?.store : null;
    if (typeof store === "string" && store) out.add(store);
  }
  return [...out];
}
