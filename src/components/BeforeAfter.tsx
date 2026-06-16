"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Draggable before/after comparison slider.
 * Works with mouse, touch, and keyboard (accessible slider).
 * If images are missing, on-brand "before/after" placeholders render so the
 * proof section is fully demonstrable before real photos are dropped in.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
}: {
  before?: string;
  after?: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-ink-800 shadow-card",
        className
      )}
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* AFTER (base layer) */}
      <Layer src={after} alt={afterAlt} label="After" tone="after" />

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Layer src={before} alt={beforeAlt} label="Before" tone="before" />
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink-900 shadow-cardHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
        >
          <Icon name="arrowRight" className="h-4 w-4 -rotate-180" />
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Layer({
  src,
  alt,
  label,
  tone,
}: {
  src?: string;
  alt: string;
  label: string;
  tone: "before" | "after";
}) {
  return (
    <div className="absolute inset-0">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
          draggable={false}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center",
            tone === "before"
              ? "bg-gradient-to-br from-ink-600 to-ink-800"
              : "bg-gradient-to-br from-sky-500 to-ink-700"
          )}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>
      )}
      <span
        className={cn(
          "absolute top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white",
          tone === "before" ? "left-3 bg-ink-900/70" : "right-3 bg-gold-500/90"
        )}
      >
        {label}
      </span>
    </div>
  );
}
