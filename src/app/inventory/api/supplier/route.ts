import { NextResponse } from "next/server";
import { blobConfigured } from "@/lib/inventoryStore";
import { MINLEON_ORIGIN, NotShopifyError, parseStoreOrigin, readLatestSnapshot, refreshSnapshot } from "@/lib/supplierCatalog";

/**
 * /inventory/api/supplier — live supplier catalog for the inventory app.
 * Sits under /inventory so the same Basic Auth gate (middleware.ts) protects it.
 *
 *   GET  ?store=<origin>  → the newest stored catalog snapshot for that store
 *                           (fetches + stores one on first use). Defaults to
 *                           Minleon when no store is given.
 *   POST { action: "refresh", store } → re-fetch now (throttled to once per
 *          10 minutes; the daily cron at /api/cron/supplier-catalogs does this
 *          automatically for every connected store)
 *
 * A store that is not Shopify-based answers 422 { notShopify: true }.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const noStore = { "Cache-Control": "private, no-store" };
const REFRESH_MIN_INTERVAL_MS = 10 * 60 * 1000;

function badStore() {
  return NextResponse.json({ ok: false, error: "Enter the store's web address, e.g. shop.example.com." }, { status: 422, headers: noStore });
}

function failed(err: unknown, what: string) {
  if (err instanceof NotShopifyError) {
    return NextResponse.json({ ok: false, notShopify: true, error: err.message }, { status: 422, headers: noStore });
  }
  console.error(`[supplier] ${what} failed`, err);
  return NextResponse.json({ ok: false, error: `Could not ${what} the supplier catalog.` }, { status: 502, headers: noStore });
}

export async function GET(req: Request) {
  if (!blobConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud storage is not configured." }, { status: 503, headers: noStore });
  }
  const raw = new URL(req.url).searchParams.get("store");
  const origin = parseStoreOrigin(raw || MINLEON_ORIGIN);
  if (!origin) return badStore();
  try {
    let snapshot = await readLatestSnapshot(origin);
    let fresh = false;
    if (!snapshot) {
      snapshot = await refreshSnapshot(origin);
      fresh = true;
    }
    return NextResponse.json({ ok: true, fresh, ...snapshot }, { headers: noStore });
  } catch (err) {
    return failed(err, "load");
  }
}

export async function POST(req: Request) {
  if (!blobConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud storage is not configured." }, { status: 503, headers: noStore });
  }
  let body: { action?: string; store?: string } = {};
  try {
    body = (await req.json()) as { action?: string; store?: string };
  } catch {
    /* empty body is fine */
  }
  if (body.action !== "refresh") {
    return NextResponse.json({ ok: false, error: 'Expected { action: "refresh" }.' }, { status: 422, headers: noStore });
  }
  const origin = parseStoreOrigin(body.store || MINLEON_ORIGIN);
  if (!origin) return badStore();
  try {
    const latest = await readLatestSnapshot(origin);
    if (latest && Date.now() - latest.fetchedAt < REFRESH_MIN_INTERVAL_MS) {
      return NextResponse.json({ ok: true, throttled: true, ...latest }, { headers: noStore });
    }
    const snapshot = await refreshSnapshot(origin);
    return NextResponse.json({ ok: true, fresh: true, ...snapshot }, { headers: noStore });
  } catch (err) {
    return failed(err, "refresh");
  }
}
