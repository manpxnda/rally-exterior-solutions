import { NextResponse } from "next/server";
import { minleonConfigured, refreshMinleonSnapshot } from "@/lib/minleon";

/**
 * Daily Vercel Cron (see vercel.json): refresh the stored Minleon catalog
 * snapshot so the inventory app's retail prices / availability stay current.
 *
 * Vercel calls this with `Authorization: Bearer <CRON_SECRET>` when the
 * CRON_SECRET env var is set. Anything else is rejected — this path is public
 * (it is outside the Basic-Auth-protected /inventory tree).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!minleonConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud storage is not configured." }, { status: 503 });
  }
  try {
    const snap = await refreshMinleonSnapshot();
    return NextResponse.json({
      ok: true,
      fetchedAt: snap.fetchedAt,
      products: snap.productCount,
      variants: snap.variantCount,
      changes: snap.changes.length,
    });
  } catch (err) {
    console.error("[minleon cron] failed", err);
    return NextResponse.json({ ok: false, error: "Refresh failed." }, { status: 502 });
  }
}
