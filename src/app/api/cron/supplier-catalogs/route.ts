import { NextResponse } from "next/server";
import { redisConfigured, readLatestInventory, supplierOriginsIn } from "@/lib/inventoryStore";
import { MINLEON_ORIGIN, NotShopifyError, hostOf, parseStoreOrigin, refreshSnapshot } from "@/lib/supplierCatalog";

/**
 * Daily Vercel Cron (see vercel.json): refresh the stored catalog snapshot of
 * every supplier store connected in the inventory app (Minleon for permanent
 * lighting, plus whatever is connected for Christmas lighting), so the app's
 * list prices / availability stay current.
 *
 * Vercel calls this with `Authorization: Bearer <CRON_SECRET>` when the
 * CRON_SECRET env var is set. Anything else is rejected — this path is public
 * (it is outside the Basic-Auth-protected /inventory tree).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!redisConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503 });
  }

  const origins = new Set<string>([MINLEON_ORIGIN]);
  try {
    const latest = await readLatestInventory();
    for (const o of supplierOriginsIn(latest?.state)) {
      const parsed = parseStoreOrigin(o);
      if (parsed) origins.add(parsed);
    }
  } catch (err) {
    console.error("[supplier cron] could not read inventory state", err);
  }

  const results: Record<string, { ok: boolean; products?: number; variants?: number; changes?: number; error?: string }> = {};
  for (const origin of origins) {
    try {
      const snap = await refreshSnapshot(origin);
      results[hostOf(origin)] = { ok: true, products: snap.productCount, variants: snap.variantCount, changes: snap.changes.length };
    } catch (err) {
      const msg = err instanceof NotShopifyError ? err.message : "Refresh failed.";
      console.error(`[supplier cron] ${hostOf(origin)} failed`, err);
      results[hostOf(origin)] = { ok: false, error: msg };
    }
  }
  const allOk = Object.values(results).every((r) => r.ok);
  return NextResponse.json({ ok: allOk, refreshedAt: Date.now(), stores: results }, { status: allOk ? 200 : 502 });
}
