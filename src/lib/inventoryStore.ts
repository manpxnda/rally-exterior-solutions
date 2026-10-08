import { Redis } from "@upstash/redis";

/**
 * Inventory state storage — Upstash Redis (shared by /inventory/api, the
 * supplier catalog module and the catalog cron).
 *
 * History: 2026-09-16 → 2026-10-07 this lived in Vercel Blob as immutable
 * versioned JSON files. The app polls every 45 s and each poll needed a
 * `list()` call, which Vercel counts as an "advanced operation"; the Hobby
 * plan includes 2,000 a month, so one open tab exhausted the allowance in a
 * day and Vercel suspended the store for 30 days (2026-10-07). Redis has no
 * such per-call class: a poll is one GET, a save is one SET + a small history
 * push. The Upstash free tier allows 500k commands a month.
 *
 * Keys (prefix configurable for tests via REDIS_KEY_PREFIX, default "rally:"):
 *   <p>inventory:latest     JSON InventoryDoc — the current state
 *   <p>inventory:history    LIST of the previous InventoryDocs (newest first,
 *                           capped at KEEP_VERSIONS) — a safety net only
 *   <p>catalog:<host>       JSON CatalogSnapshot per supplier store
 */
export const KEY_PREFIX = process.env.REDIS_KEY_PREFIX || "rally:";
export const KEEP_VERSIONS = 10;

export type InventoryDoc = {
  updatedAt: number;
  device?: string;
  savedAt?: string;
  state: unknown;
};

let client: Redis | null = null;

export function redisConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export function redis(): Redis {
  if (!client) {
    client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
      // Values are stored as plain JSON strings and parsed by us, so the
      // client must not try to deserialise them itself.
      automaticDeserialization: false,
    });
  }
  return client;
}

export const inventoryKey = () => `${KEY_PREFIX}inventory:latest`;
export const historyKey = () => `${KEY_PREFIX}inventory:history`;
export const catalogKey = (host: string) => `${KEY_PREFIX}catalog:${host}`;

export async function readJson<T>(key: string): Promise<T | null> {
  const raw = await redis().get<string>(key);
  if (raw == null || raw === "") return null;
  try {
    const doc = typeof raw === "string" ? JSON.parse(raw) : raw;
    return doc && typeof doc === "object" ? (doc as T) : null;
  } catch {
    return null;
  }
}

export async function readLatestInventory(): Promise<InventoryDoc | null> {
  return readJson<InventoryDoc>(inventoryKey());
}

/**
 * Writes the new current state and pushes the previous one onto the history
 * list (trimmed). Returns nothing; callers do the conflict check first.
 */
export async function writeInventory(doc: InventoryDoc, previous: InventoryDoc | null): Promise<void> {
  const r = redis();
  const payload = JSON.stringify(doc);
  if (previous) {
    const p = r.pipeline();
    p.set(inventoryKey(), payload);
    p.lpush(historyKey(), JSON.stringify(previous));
    p.ltrim(historyKey(), 0, KEEP_VERSIONS - 2);
    await p.exec();
  } else {
    await r.set(inventoryKey(), payload);
  }
}

/**
 * Supplier store origins configured in the inventory app (per division,
 * e.g. Minleon for permanent lighting; CLC USA + S4 Lights for Christmas).
 */
export function supplierOriginsIn(state: unknown): string[] {
  const out = new Set<string>();
  type Sup = { store?: unknown; stores?: unknown };
  const s = state as { divisions?: Record<string, { supplier?: Sup }>; supplier?: Sup } | null;
  if (!s || typeof s !== "object") return [];
  const divs = s.divisions && typeof s.divisions === "object" ? Object.values(s.divisions) : [s];
  for (const d of divs) {
    const sup = d && typeof d === "object" ? d.supplier : null;
    if (!sup) continue;
    const list = Array.isArray(sup.stores) ? sup.stores : [sup.store];
    for (const store of list) if (typeof store === "string" && store) out.add(store);
  }
  return [...out];
}
