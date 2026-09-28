import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import {
  INVENTORY_PREFIX,
  blobConfigured,
  fetchBlobJson,
  listInventoryVersions,
  readLatestInventory,
  type InventoryDoc,
} from "@/lib/inventoryStore";

/**
 * INVENTORY CLOUD SYNC — /inventory/api
 * ----------------------------------------------------------------------------
 * Mirrors the inventory app's whole state to Vercel Blob (store
 * "rally-inventory", access: private — never publicly reachable). Lives under
 * /inventory so the same Basic Auth gate in middleware.ts protects it and the
 * browser reuses the credentials it already sent for the app page.
 *
 * Storage model: IMMUTABLE VERSIONS, never overwrites (see lib/inventoryStore).
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

const KEEP_VERSIONS = 10;
const MAX_BYTES = 4 * 1024 * 1024; // state is ~100 KB; generous ceiling

const noStore = { "Cache-Control": "private, no-store" };

export async function GET() {
  if (!blobConfigured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503, headers: noStore });
  }
  try {
    const latest = await readLatestInventory();
    const doc = latest?.doc;
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
  if (!blobConfigured()) {
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
  const payload = JSON.stringify(doc);
  if (payload.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "State too large." }, { status: 413, headers: noStore });
  }

  try {
    const versions = await listInventoryVersions();
    const newest = versions[0];

    // Guard 1: a device with a stale copy must not overwrite newer edits from another device.
    if (newest && newest.updatedAt > updatedAt) {
      const current = await fetchBlobJson<InventoryDoc>(newest.url);
      return NextResponse.json(
        { ok: false, conflict: true, updatedAt: newest.updatedAt, device: current?.device ?? null, state: current?.state ?? null },
        { status: 409, headers: noStore }
      );
    }

    // Guard 2: an app tab still running the pre-division version (flat state)
    // must not write over a newer, division-shaped document. Hand it the
    // current copy so it stores the new shape locally; a reload fixes the tab.
    if (newest && !hasDivisions(doc.state)) {
      const current = await fetchBlobJson<InventoryDoc>(newest.url);
      if (current && hasDivisions(current.state)) {
        return NextResponse.json(
          {
            ok: false,
            conflict: true,
            outdated: true,
            error: "This inventory tab is out of date — reload the page.",
            updatedAt: Math.max(newest.updatedAt, updatedAt),
            device: current.device ?? null,
            state: current.state,
          },
          { status: 409, headers: noStore }
        );
      }
    }

    await put(`${INVENTORY_PREFIX}state-${updatedAt}.json`, payload, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true, // same-millisecond resave from the same device
      contentType: "application/json",
    });

    // Prune old versions (best effort; never fails the save).
    const stale = versions.slice(KEEP_VERSIONS - 1).map((v) => v.url);
    if (stale.length) del(stale).catch((e) => console.error("[inventory] prune failed", e));

    return NextResponse.json({ ok: true, updatedAt }, { headers: noStore });
  } catch (err) {
    console.error("[inventory] write failed", err);
    return NextResponse.json({ ok: false, error: "Write failed." }, { status: 500, headers: noStore });
  }
}
