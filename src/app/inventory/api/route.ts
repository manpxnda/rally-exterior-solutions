import { NextResponse } from "next/server";
import { readLatestInventory, redisConfigured, writeInventory, type InventoryDoc } from "@/lib/inventoryStore";

/**
 * INVENTORY CLOUD SYNC — /inventory/api
 * ----------------------------------------------------------------------------
 * Mirrors the inventory app's whole state to Upstash Redis (see
 * lib/inventoryStore.ts for the key layout and why it moved off Vercel Blob).
 * Lives under /inventory so the same Basic Auth gate in middleware.ts protects
 * it and the browser reuses the credentials it already sent for the app page.
 *
 *   GET  → { ok, updatedAt, device, savedAt, state | null }
 *   PUT  { updatedAt, device, state } → { ok, updatedAt }
 *          409 + current document if the cloud copy is newer than the
 *          client's last-known version (last-write-wins with a guard), or if
 *          an out-of-date app tab tries to write the pre-division state shape
 *          over a newer one (the tab must be reloaded).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 900 * 1024; // state is ~155 KB; Upstash caps a request at 1 MB

const noStore = { "Cache-Control": "private, no-store" };

export async function GET() {
  if (!redisConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503, headers: noStore });
  }
  try {
    const doc = await readLatestInventory();
    return NextResponse.json(
      {
        ok: true,
        updatedAt: doc?.updatedAt ?? 0,
        device: doc?.device ?? null,
        savedAt: doc?.savedAt ?? null,
        state: doc?.state ?? null,
      },
      { headers: noStore }
    );
  } catch (err) {
    console.error("[inventory] read failed", err);
    return NextResponse.json({ ok: false, error: "Read failed." }, { status: 500, headers: noStore });
  }
}

function hasDivisions(state: unknown) {
  return Boolean(state && typeof state === "object" && (state as { divisions?: unknown }).divisions);
}

export async function PUT(req: Request) {
  if (!redisConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503, headers: noStore });
  }

  let body: Partial<InventoryDoc>;
  try {
    body = (await req.json()) as Partial<InventoryDoc>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400, headers: noStore });
  }

  const updatedAt = Math.floor(Number(body.updatedAt));
  if (!body.state || typeof body.state !== "object" || !Number.isFinite(updatedAt) || updatedAt <= 0) {
    return NextResponse.json({ ok: false, error: "Expected { updatedAt, state }." }, { status: 422, headers: noStore });
  }

  const doc: InventoryDoc = {
    updatedAt,
    device: typeof body.device === "string" ? body.device.slice(0, 40) : undefined,
    savedAt: new Date().toISOString(),
    state: body.state,
  };
  if (JSON.stringify(doc).length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "State too large." }, { status: 413, headers: noStore });
  }

  try {
    const current = await readLatestInventory();

    // Guard 1: a device with a stale copy must not overwrite newer edits from another device.
    if (current && current.updatedAt > updatedAt) {
      return NextResponse.json(
        { ok: false, conflict: true, updatedAt: current.updatedAt, device: current.device ?? null, state: current.state },
        { status: 409, headers: noStore }
      );
    }

    // Guard 2: an app tab still running the pre-division version (flat state)
    // must not write over a newer, division-shaped document.
    if (current && !hasDivisions(doc.state) && hasDivisions(current.state)) {
      return NextResponse.json(
        {
          ok: false,
          conflict: true,
          outdated: true,
          error: "This inventory tab is out of date — reload the page.",
          updatedAt: Math.max(current.updatedAt, updatedAt),
          device: current.device ?? null,
          state: current.state,
        },
        { status: 409, headers: noStore }
      );
    }

    // Same-millisecond resave from the same device: replace, don't duplicate history.
    const previous = current && current.updatedAt !== updatedAt ? current : null;
    await writeInventory(doc, previous);
    return NextResponse.json({ ok: true, updatedAt }, { headers: noStore });
  } catch (err) {
    console.error("[inventory] write failed", err);
    return NextResponse.json({ ok: false, error: "Write failed." }, { status: 500, headers: noStore });
  }
}
