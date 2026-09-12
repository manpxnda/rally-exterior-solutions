"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showcase } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * CHRISTMAS GALLERY — 1 large + 3 small, with a simple lightbox.
 * Pulls real Rally Christmas installs from data/gallery.ts (`showcase`).
 * `label` is the look a homeowner would ask for ("Pick your look").
 */
const PICKS: { id: string; label: string }[] = [
  { id: "xmas-multicolor", label: "Full Displays" },
  { id: "xmas-cool-white", label: "Rooflines" },
  { id: "xmas-white", label: "Trees & Bushes" },
  { id: "xmas-warm-white-brick", label: "Warm White" },
];

const items = PICKS.map((p) => {
  const s = showcase.find((x) => x.id === p.id);
  return s && s.src ? { ...s, src: s.src, label: p.label } : null;
}).filter((x): x is NonNullable<typeof x> => Boolean(x));

export function ChristmasGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    returnTo.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const current = open !== null ? items[open] : null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-600">
              Christmas Gallery
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Choose your display.
            </h2>
          </div>
          <p className="max-w-sm text-lg text-ink-500">
            Rooflines, trees, bushes, and full displays — every home here was
            installed by Rally. Professional displays generally start at $1,500.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {items[0] && (
            <Tile item={items[0]} onOpen={(el) => { returnTo.current = el; setOpen(0); }} className="aspect-[16/10] lg:aspect-[5/4]" priorityLabel />
          )}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {items.slice(1, 3).map((item, i) => (
                <Tile key={item.id} item={item} onOpen={(el) => { returnTo.current = el; setOpen(i + 1); }} className="aspect-[4/3]" />
              ))}
            </div>
            {items[3] && (
              <Tile item={items[3]} onOpen={(el) => { returnTo.current = el; setOpen(3); }} className="aspect-[16/9] lg:flex-1 lg:aspect-auto lg:min-h-[160px]" />
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-ink-500 sm:text-left">
          <Link href="/gallery" className="font-semibold text-ink-900 underline-offset-4 hover:underline">
            See the full lighting gallery →
          </Link>
        </p>
      </Container>

      {/* Lightbox */}
      {current && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 bg-ink-900/92" />
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
          </button>
          <figure className="relative z-[5] w-full max-w-5xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink-800 shadow-cardHover">
              <Image src={current.src} alt={current.title} fill sizes="(max-width: 1100px) 100vw, 1100px" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink-100">
              {current.title} <span className="text-ink-400">· {current.label}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setOpen((i) => (i === null ? i : (i + 1) % items.length))}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <Icon name="arrowRight" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}

function Tile({
  item,
  onOpen,
  className,
  priorityLabel,
}: {
  item: (typeof items)[number];
  onOpen: (el: HTMLElement) => void;
  className?: string;
  priorityLabel?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-ink-900 text-left shadow-card transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${item.title} — open photo`}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
      <span
        className={cn(
          "absolute bottom-3 left-3 rounded-md bg-ink-900/80 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur",
          priorityLabel && "sm:text-xs"
        )}
      >
        {item.label}
      </span>
    </button>
  );
}
