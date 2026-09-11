"use client";

import { useState } from "react";
import Link from "next/link";
import { beforeAfters, showcase } from "@/data/gallery";
import { getService } from "@/data/services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";

/**
 * Gallery filters — lighting first (2026 repositioning).
 * "Cleaning" keeps every legacy before/after pair reachable; it's just no
 * longer the default view.
 */
export type GalleryFilter =
  | "lighting"
  | "permanent-lighting"
  | "holiday-lighting"
  | "landscape-lighting"
  | "cleaning";

const tabs: { key: GalleryFilter; label: string }[] = [
  { key: "lighting", label: "All Lighting" },
  { key: "permanent-lighting", label: "Permanent" },
  { key: "holiday-lighting", label: "Christmas" },
  { key: "landscape-lighting", label: "Landscape" },
  { key: "cleaning", label: "Exterior Cleaning" },
];

function matches(serviceSlug: string, filter: GalleryFilter) {
  const category = getService(serviceSlug)?.category;
  if (filter === "lighting") return category === "lighting";
  if (filter === "cleaning") return category === "cleaning";
  return serviceSlug === filter;
}

export function GalleryGrid({ initial = "lighting" }: { initial?: GalleryFilter }) {
  const [filter, setFilter] = useState<GalleryFilter>(initial);

  const bas = beforeAfters.filter((b) => matches(b.service, filter));
  const shows = showcase.filter((s) => matches(s.service, filter));
  const empty = bas.length === 0 && shows.length === 0;

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filter">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={filter === t.key}
            onClick={() => setFilter(t.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              filter === t.key
                ? "bg-ink-900 text-white"
                : "border border-ink-200 bg-white text-ink-700 hover:border-ink-900",
              t.key === "cleaning" && filter !== t.key && "text-ink-500"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Showcase (finished lighting projects) */}
      {shows.length > 0 && (
        <>
          <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-gold-600">
            Finished Rally projects
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shows.map((item) => {
              const service = getService(item.service);
              return (
                <figure key={item.id} className="overflow-hidden rounded-2xl shadow-card">
                  <MediaFrame
                    src={item.src}
                    alt={item.title}
                    label={item.title}
                    icon={service?.icon ?? "image"}
                    aspect="photo"
                    rounded="rounded-none"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <figcaption className="bg-white px-4 py-3">
                    <p className="text-sm font-semibold text-ink-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-ink-500">{service?.shortName}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </>
      )}

      {/* Before / after sliders (exterior cleaning) */}
      {bas.length > 0 && (
        <>
          <h2 className={cn("mb-6 text-center text-sm font-bold uppercase tracking-wider text-gold-600", shows.length > 0 && "mt-16")}>
            Before &amp; After — drag to compare
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bas.map((item) => {
              const service = getService(item.service);
              return (
                <figure key={item.id}>
                  <BeforeAfter
                    before={item.before}
                    after={item.after}
                    beforeAlt={`${item.title} before`}
                    afterAlt={`${item.title} after`}
                  />
                  <figcaption className="mt-3">
                    <p className="font-semibold text-ink-900">{item.title}</p>
                    <p className="text-sm text-ink-500">
                      {service?.shortName} · {item.location}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </>
      )}

      {/* Empty state (e.g. landscape lighting photos not added yet) */}
      {empty && (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-ink-200 bg-ink-50 p-8 text-center">
          <p className="font-semibold text-ink-900">Photos are on the way.</p>
          <p className="mt-2 text-sm text-ink-500">
            We&apos;re documenting recent projects now. Want to see examples for
            your home in the meantime?{" "}
            <Link href="/contact" className="font-semibold text-ink-900 underline-offset-2 hover:underline">
              Just ask.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
