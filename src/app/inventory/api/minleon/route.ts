import { NextResponse } from "next/server";
import { minleonConfigured, readLatestSnapshot, refreshMinleonSnapshot } from "@/lib/minleon";

/**
 * /inventory/api/minleon — live Minleon catalog for the inventory app.
 * Sits under /inventory so the same Basic Auth gate (middleware.ts) protects it.
 *
 *   GET  → the newest stored catalog snapshot (fetches + stores one on first use)
 *   POST { action: "refresh" } → re-fetch now (throttled to once per 10 minutes;
 *          the daily cron at /api/cron/minleon-catalog does this automatically)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const noStore = { "Cache-Control": "private, no-store" };
const REFRESH_MIN_INTERVAL_MS = 10 * 60 * 1000;

export async function GET() {
  if (!minleonConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud storage is not configured." }, { status: 503, headers: noStore });
  }
  try {
    let snapshot = await readLatestSnapshot();
    let fresh = false;
    if (!snapshot) {
      snapshot = await refreshMinleonSnapshot();
      fresh = true;
    }
    return NextResponse.json({ ok: true, fresh, ...snapshot }, { headers: noStore });
  } catch (err) {
    console.error("[minleon] read failed", err);
    return NextResponse.json({ ok: false, error: "Could not load the Minleon catalog." }, { status: 502, headers: noStore });
  }
}

export async function POST(req: Request) {
  if (!minleonConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud storage is not configured." }, { status: 503, headers: noStore });
  }
  let body: { action?: string } = {};
  try {
    body = (await req.json()) as { action?: string };
  } catch {
    /* empty body is fine */
  }
  if (body.action !== "refresh") {
    return NextResponse.json({ ok: false, error: 'Expected { action: "refresh" }.' }, { status: 422, headers: noStore });
  }
  try {
    const latest = await readLatestSnapshot();
    if (latest && Date.now() - latest.fetchedAt < REFRESH_MIN_INTERVAL_MS) {
      return NextResponse.json({ ok: true, throttled: true, ...latest }, { headers: noStore });
    }
    const snapshot = await refreshMinleonSnapshot();
    return NextResponse.json({ ok: true, fresh: true, ...snapshot }, { headers: noStore });
  } catch (err) {
    console.error("[minleon] refresh failed", err);
    return NextResponse.json({ ok: false, error: "Minleon refresh failed." }, { status: 502, headers: noStore });
  }
}
