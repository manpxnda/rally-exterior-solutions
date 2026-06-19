"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  lightingTypes,
  facings,
  spacings,
  schemesFor,
  type LightingTypeId,
  type FacingId,
  type SpacingId,
} from "@/data/mockup";
import { getAttribution, trackLeadSubmit } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Pt = { x: number; y: number };
type Status = "idle" | "submitting" | "success" | "error";

const MAX_CANVAS_W = 900;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function LightingMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const pointsRef = useRef<Pt[]>([]);
  const dragRef = useRef<number | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [points, setPoints] = useState<Pt[]>([]);

  const [typeId, setTypeId] = useState<LightingTypeId>("permanent");
  const [facing, setFacing] = useState<FacingId>("downward");
  const [spacing, setSpacing] = useState<SpacingId>("12");
  const [schemeId, setSchemeId] = useState("warm-white");
  const [night, setNight] = useState(true);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const schemes = schemesFor(typeId);
  const scheme = schemes.find((s) => s.id === schemeId) ?? schemes[0];

  // keep refs in sync for pointer handlers
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  // when switching to a scheme not valid for the new type, reset it
  useEffect(() => {
    if (!schemes.find((s) => s.id === schemeId)) setSchemeId(schemes[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  /** Fit the canvas to the container and (re)scale existing points. */
  const fitCanvas = useCallback(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;
    const cw = Math.min(container.clientWidth, MAX_CANVAS_W);
    const ch = Math.round((cw * img.naturalHeight) / img.naturalWidth);
    setDims((prev) => {
      if (prev.w && prev.w !== cw) {
        const s = cw / prev.w;
        setPoints((pts) => pts.map((p) => ({ x: p.x * s, y: p.y * s })));
      }
      return { w: cw, h: ch };
    });
  }, []);

  /** Best-effort sky/silhouette roofline detection → seed adjustable points. */
  const detectRoofline = useCallback((img: HTMLImageElement, cw: number, ch: number): Pt[] => {
    try {
      const aw = 160;
      const ah = Math.max(1, Math.round((aw * img.naturalHeight) / img.naturalWidth));
      const off = document.createElement("canvas");
      off.width = aw;
      off.height = ah;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];
      octx.drawImage(img, 0, 0, aw, ah);
      const data = octx.getImageData(0, 0, aw, ah).data;
      const edges: (number | null)[] = [];
      for (let x = 0; x < aw; x++) {
        let sky = 0;
        let edge: number | null = null;
        for (let y = 0; y < ah; y++) {
          const i = (y * aw + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const bright = (r + g + b) / 765; // 0..1
          const isSky = bright > 0.5 && b >= r - 8;
          if (isSky) {
            sky++;
          } else if (sky >= 3) {
            edge = y; // first non-sky after a sky run = silhouette
            break;
          } else {
            sky = 0;
          }
        }
        edges.push(edge);
      }
      // sample ~12 evenly spaced detected columns
      const pts: Pt[] = [];
      const N = 12;
      for (let k = 0; k <= N; k++) {
        const ax = Math.round((k / N) * (aw - 1));
        // local median around ax for stability
        const win: number[] = [];
        for (let dx = -3; dx <= 3; dx++) {
          const e = edges[ax + dx];
          if (e != null) win.push(e);
        }
        if (win.length) {
          win.sort((a, b) => a - b);
          const my = win[Math.floor(win.length / 2)];
          pts.push({ x: (ax / (aw - 1)) * cw, y: (my / ah) * ch });
        }
      }
      // need a usable spread, else bail to fallback
      if (pts.length >= 5) return pts;
    } catch {
      /* fall through to fallback */
    }
    // Fallback: a generic gable guess across the upper third
    return [
      { x: cw * 0.12, y: ch * 0.5 },
      { x: cw * 0.5, y: ch * 0.32 },
      { x: cw * 0.88, y: ch * 0.5 },
    ];
  }, []);

  const onFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        const container = containerRef.current;
        const cw = Math.min(container?.clientWidth || MAX_CANVAS_W, MAX_CANVAS_W);
        const ch = Math.round((cw * img.naturalHeight) / img.naturalWidth);
        setDims({ w: cw, h: ch });
        setPoints(detectRoofline(img, cw, ch));
        setHasImage(true);
        setStatus("idle");
        URL.revokeObjectURL(url);
      };
      img.src = url;
    },
    [detectRoofline]
  );

  // Draw everything whenever inputs change
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !dims.w) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(dims.w * dpr);
    canvas.height = Math.round(dims.h * dpr);
    canvas.style.width = `${dims.w}px`;
    canvas.style.height = `${dims.h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // base photo
    ctx.clearRect(0, 0, dims.w, dims.h);
    ctx.drawImage(img, 0, 0, dims.w, dims.h);

    // dusk overlay so lights pop
    if (night) {
      const grad = ctx.createLinearGradient(0, 0, 0, dims.h);
      grad.addColorStop(0, "rgba(10,16,40,0.45)");
      grad.addColorStop(1, "rgba(6,10,28,0.68)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, dims.w, dims.h);
    }

    drawLights(ctx, points, {
      typeId,
      facing,
      spacing,
      colors: scheme?.colors ?? ["#FFE2B0"],
      night,
      cw: dims.w,
    });

    // editable handles
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#173D59";
      ctx.stroke();
    });
  }, [points, dims, typeId, facing, spacing, scheme, night]);

  // window resize
  useEffect(() => {
    if (!hasImage) return;
    const onResize = () => fitCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hasImage, fitCanvas]);

  // ---- pointer editing ----
  function posFromEvent(e: React.PointerEvent<HTMLCanvasElement>): Pt {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!hasImage) return;
    const pos = posFromEvent(e);
    const pts = pointsRef.current;
    let hit = -1;
    let best = 18;
    pts.forEach((p, i) => {
      const d = Math.hypot(p.x - pos.x, p.y - pos.y);
      if (d < best) {
        best = d;
        hit = i;
      }
    });
    e.currentTarget.setPointerCapture(e.pointerId);
    if (hit >= 0) {
      dragRef.current = hit;
    } else {
      // insert a new point, keeping left-to-right order
      setPoints((prev) => {
        const next = [...prev, pos].sort((a, b) => a.x - b.x);
        dragRef.current = next.findIndex((p) => p === pos);
        return next;
      });
    }
  }
  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (dragRef.current == null) return;
    const pos = posFromEvent(e);
    const idx = dragRef.current;
    setPoints((prev) =>
      prev.map((p, i) =>
        i === idx
          ? { x: Math.max(0, Math.min(dims.w, pos.x)), y: Math.max(0, Math.min(dims.h, pos.y)) }
          : p
      )
    );
  }
  function onPointerUp(e: React.PointerEvent<HTMLCanvasElement>) {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }

  function undoPoint() {
    setPoints((p) => p.slice(0, -1));
  }
  function clearPoints() {
    setPoints([]);
  }
  function redetect() {
    const img = imgRef.current;
    if (img && dims.w) setPoints(detectRoofline(img, dims.w, dims.h));
  }

  // ---- submit ----
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("company")) {
      setStatus("success");
      return;
    }
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!name || !phone) {
      setError("Please add your name and phone number.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");

    const canvas = canvasRef.current;
    const preview = canvas ? canvas.toDataURL("image/jpeg", 0.85) : "";
    const photo = imgRef.current ? compressImage(imgRef.current, 1400, 0.8) : "";

    const payload = {
      name,
      phone,
      email: String(fd.get("email") || "").trim(),
      address: String(fd.get("address") || "").trim(),
      notes: String(fd.get("notes") || "").trim(),
      lightingType: lightingTypes.find((t) => t.id === typeId)?.name ?? typeId,
      facing: typeId === "permanent" ? facings.find((f) => f.id === facing)?.name : "",
      spacing: spacings.find((s) => s.id === spacing)?.name ?? spacing,
      colorScheme: scheme?.name ?? schemeId,
      source: "lighting_mockup",
      submittedAt: new Date().toISOString(),
      attribution: getAttribution(),
      preview,
      photo,
    };

    try {
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      trackLeadSubmit({ service: "permanent-lighting", source: "lighting_mockup" });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please call us — we'll get your mockup started.");
      setStatus("error");
    }
  }

  function downloadPreview() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg", 0.9);
    a.download = "rally-lighting-mockup.jpg";
    a.click();
  }

  // ---------------- UI ----------------
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Canvas / uploader */}
      <div>
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
        >
          {!hasImage ? (
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gold-600 shadow-card">
                <Icon name="image" className="h-8 w-8" />
              </span>
              <span className="font-display text-xl font-bold text-ink-900">
                Upload a photo of your home
              </span>
              <span className="max-w-sm text-sm text-ink-500">
                Take it from across the street in good light. Drag &amp; drop, or
                tap to choose. Your photo stays private.
              </span>
              <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-ink-900 shadow-cta">
                <Icon name="image" className="h-4 w-4" /> Choose photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
              />
            </label>
          ) : (
            <canvas
              ref={canvasRef}
              className="block w-full touch-none select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          )}
        </div>

        {hasImage && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 inline-flex items-center gap-1.5 font-semibold text-ink-600">
              <Icon name="sparkle" className="h-4 w-4 text-gold-600" />
              Drag the dots to trace your roofline · tap to add
            </span>
            <button onClick={redetect} type="button" className="rounded-lg border border-ink-200 px-3 py-1.5 font-semibold text-ink-700 hover:bg-ink-50">
              Auto-detect
            </button>
            <button onClick={undoPoint} type="button" className="rounded-lg border border-ink-200 px-3 py-1.5 font-semibold text-ink-700 hover:bg-ink-50">
              Undo
            </button>
            <button onClick={clearPoints} type="button" className="rounded-lg border border-ink-200 px-3 py-1.5 font-semibold text-ink-700 hover:bg-ink-50">
              Clear
            </button>
            <button
              onClick={() => setNight((n) => !n)}
              type="button"
              className={cn(
                "ml-auto rounded-lg px-3 py-1.5 font-semibold",
                night ? "bg-ink-900 text-white" : "border border-ink-200 text-ink-700 hover:bg-ink-50"
              )}
            >
              {night ? "🌙 Night" : "☀ Day"}
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h3 className="font-display text-xl font-bold text-ink-900">Mockup request sent!</h3>
            <p className="text-ink-500">
              We&apos;ll create your custom lighting mockup and reach out with it
              plus a free quote — usually same-day.
            </p>
            <Button href="/services/permanent-lighting" variant="outline" className="mt-2">
              Learn about permanent lighting
            </Button>
          </div>
        ) : (
          <>
            <Choice
              label="1. Lighting type"
              options={lightingTypes}
              value={typeId}
              onChange={(v) => setTypeId(v as LightingTypeId)}
            />

            {typeId === "permanent" && (
              <Choice
                label="2. Facing direction"
                options={facings}
                value={facing}
                onChange={(v) => setFacing(v as FacingId)}
              />
            )}

            <Choice
              label={`${typeId === "permanent" ? "3" : "2"}. Bulb spacing`}
              options={spacings}
              value={spacing}
              onChange={(v) => setSpacing(v as SpacingId)}
            />

            {/* color schemes */}
            <p className="mb-2 mt-5 text-sm font-bold text-ink-900">
              {typeId === "permanent" ? "4" : "3"}. Color scheme
            </p>
            <div className="flex flex-wrap gap-2">
              {schemes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSchemeId(s.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold",
                    schemeId === s.id
                      ? "border-gold-400 bg-gold-50 text-ink-900"
                      : "border-ink-200 text-ink-600 hover:bg-ink-50"
                  )}
                >
                  <span className="flex">
                    {s.colors.map((c) => (
                      <span
                        key={c}
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                        style={{ background: c, marginLeft: -2 }}
                      />
                    ))}
                  </span>
                  {s.name}
                </button>
              ))}
            </div>

            {/* Request form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <input name="company" tabIndex={-1} autoComplete="off" />
              </div>
              <p className="text-sm font-bold text-ink-900">
                {typeId === "permanent" ? "5" : "4"}. Get your free pro mockup + quote
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input name="name" required placeholder="Full name *" className={inputCls} />
                <input name="phone" type="tel" required placeholder="Phone *" className={inputCls} />
              </div>
              <input name="email" type="email" placeholder="Email (optional)" className={inputCls} />
              <input name="address" placeholder="Street or city (optional)" className={inputCls} />
              <textarea name="notes" rows={2} placeholder="Anything else? (optional)" className={inputCls} />

              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
              )}

              <Button type="submit" fullWidth size="lg" className={status === "submitting" ? "pointer-events-none" : ""}>
                {status === "submitting" ? "Sending…" : "Send Me My Free Mockup"}
                {status !== "submitting" && <Icon name="arrowRight" className="h-5 w-5" />}
              </Button>
              <p className="text-center text-xs text-ink-400">
                We&apos;ll send a designer-made mockup + quote. No spam, no obligation.
              </p>
              {hasImage && (
                <button
                  type="button"
                  onClick={downloadPreview}
                  className="mx-auto block text-sm font-semibold text-ink-500 underline hover:text-ink-900"
                >
                  Download my preview
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40";

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; name: string; blurb: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="mb-2 text-sm font-bold text-ink-900">{label}</p>
      <div className="grid gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-xl border p-3 text-left transition-colors",
              value === o.id
                ? "border-gold-400 bg-gold-50"
                : "border-ink-200 hover:bg-ink-50"
            )}
          >
            <span className="block text-sm font-bold text-ink-900">{o.name}</span>
            <span className="block text-xs text-ink-500">{o.blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---- rendering helpers ----
function drawLights(
  ctx: CanvasRenderingContext2D,
  points: Pt[],
  cfg: {
    typeId: LightingTypeId;
    facing: FacingId;
    spacing: SpacingId;
    colors: string[];
    night: boolean;
    cw: number;
  }
) {
  if (points.length < 2) return;
  const gap = cfg.cw / (cfg.spacing === "6" ? 52 : 30);
  const isC9 = cfg.typeId === "christmas-c9";
  const glowR = (isC9 ? 16 : 12) * (cfg.night ? 1.25 : 0.85);
  const coreR = isC9 ? 4.5 : 3;

  let ci = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const segLen = Math.hypot(b.x - a.x, b.y - a.y);
    if (segLen < 1) continue;
    const dx = (b.x - a.x) / segLen;
    const dy = (b.y - a.y) / segLen;
    // downward normal
    let nx = -dy;
    let ny = dx;
    if (ny < 0) {
      nx = -nx;
      ny = -ny;
    }
    let dir = 0; // facing offset multiplier along downward normal
    if (cfg.typeId === "permanent") {
      dir = cfg.facing === "downward" ? 1 : cfg.facing === "inward" ? -1 : 0;
    } else {
      dir = 0.5; // C9 bulbs hang slightly below the line
    }
    for (let d = 0; d <= segLen; d += gap) {
      const px = a.x + dx * d;
      const py = a.y + dy * d;
      const ox = px + nx * dir * (isC9 ? 6 : 5);
      const oy = py + ny * dir * (isC9 ? 6 : 5);
      const color = cfg.colors[ci % cfg.colors.length];
      ci++;
      const [r, g, bl] = hexToRgb(color);

      // glow (additive)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, glowR);
      grad.addColorStop(0, `rgba(${r},${g},${bl},${cfg.night ? 0.95 : 0.6})`);
      grad.addColorStop(0.4, `rgba(${r},${g},${bl},${cfg.night ? 0.45 : 0.28})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ox, oy, glowR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // bulb core
      ctx.beginPath();
      if (isC9) {
        ctx.ellipse(ox, oy, coreR, coreR * 1.4, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(ox, oy, coreR, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgb(${Math.min(255, r + 90)},${Math.min(255, g + 90)},${Math.min(255, bl + 90)})`;
      ctx.fill();
    }
  }
}

function compressImage(img: HTMLImageElement, maxW: number, quality: number): string {
  const scale = Math.min(1, maxW / img.naturalWidth);
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(img, 0, 0, w, h);
  return c.toDataURL("image/jpeg", quality);
}
