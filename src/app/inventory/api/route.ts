import { NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";

/**
 * INVENTORY CLOUD SYNC — /inventory/api
 * ----------------------------------------------------------------------------
 * Mirrors the inventory app's whole state to Vercel Blob (store
 * "rally-inventory", access: private — never publicly reachable). Lives under
 * /inventory so the same Basic Auth gate in middleware.ts protects it and the
 * browser reuses the credentials it already sent for the app page.
 *
 * Storage model: IMMUTABLE VERSIONS, never overwrites. Each save is written as
 *   <prefix>state-<updatedAt>.json
 * so the newest version is found with the (consistent) list API and its
 * content URL never changes underneath a cache. Old versions are pruned.
 *
 *   GET  → { ok, updatedAt, device, savedAt, state | null }
 *   PUT  { updatedAt, device, state } → { ok, updatedAt }
 *          409 + current document if the cloud copy is newer than the
 *          client's last-known version (last-write-wins with a guard).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PREFIX = process.env.INVENTORY_BLOB_PREFIX || "inventory/";
const VERSION_RE = /state-(\d+)\.json$/;
const KEEP_VERSIONS = 10;
const MAX_BYTES = 4 * 1024 * 1024; // state is ~100 KB; generous ceiling

type Doc = {
  updatedAt: number;
  device?: string;
  savedAt?: string;
  state: unknown;
};

type Version = { pathname: string; url: string; updatedAt: number };

const noStore = { "Cache-Control": "private, no-store" };

function configured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Newest first. */
async function listVersions(): Promise<Version[]> {
  const { blobs } = await list({ prefix: `${PREFIX}state-`, limit: 1000 });
  return blobs
    .map((b) => ({ pathname: b.pathname, url: b.url, updatedAt: Number((b.pathname.match(VERSION_RE) || [])[1] || 0) }))
    .filter((v) => v.updatedAt > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Read a version's content (private URL + RW token). Retries a transient 404. */
async function fetchDoc(url: string): Promise<Doc | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    if (res.ok) {
      const text = await res.text();
      if (!text) return null;
      const doc = JSON.parse(text) as Doc;
      return doc && typeof doc === "object" ? doc : null;
    }
    if (res.status !== 404) throw new Error(`Blob read failed (${res.status})`);
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
}

async function readLatest(): Promise<{ doc: Doc; version: Version } | null> {
  const versions = await listVersions();
  for (const version of versions.slice(0, 3)) {
    const doc = await fetchDoc(version.url);
    if (doc) return { doc, version };
  }
  return null;
}

export async function GET() {
  if (!configured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503, headers: noStore });
  }
  try {
    const latest = await readLatest();
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

export async function PUT(req: Request) {
  if (!configured()) {
    return NextResponse.json({ ok: false, error: "Cloud sync is not configured." }, { status: 503, headers: noStore });
  }

  let body: Partial<Doc>;
  try {
    body = (await req.json()) as Partial<Doc>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400, headers: noStore });
  }

  const updatedAt = Math.floor(Number(body.updatedAt));
  if (!body.state || typeof body.state !== "object" || !Number.isFinite(updatedAt) || updatedAt <= 0) {
    return NextResponse.json({ ok: false, error: "Expected { updatedAt, state }." }, { status: 422, headers: noStore });
  }

  const doc: Doc = {
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
    // Guard: a device with a stale copy must not overwrite newer edits from another device.
    const versions = await listVersions();
    const newest = versions[0];
    if (newest && newest.updatedAt > updatedAt) {
      const current = await fetchDoc(newest.url);
      return NextResponse.json(
        {
          ok: false,
          conflict: true,
          updatedAt: newest.updatedAt,
          device: current?.device ?? null,
          state: current?.state ?? null,
        },
        { status: 409, headers: noStore }
      );
    }

    await put(`${PREFIX}state-${updatedAt}.json`, payload, {
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
