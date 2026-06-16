"use client";

import { useState } from "react";
import { beforeAfters, showcase } from "@/data/gallery";
import { getService } from "@/data/services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";

type Filter = "all" | "lighting" | "cleaning";

const tabs: { key: Filter; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "lighting", label: "Lighting" },
  { key: "cleaning", label: "Cleaning" },
];

function matches(serviceSlug: string, filter: Filter) {
  if (filter === "all") return true;
  return getService(serviceSlug)?.category === filter;
}

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const bas = beforeAfters.filter((b) => matches(b.service, filter));
  const shows = showcase.filter((s) => matches(s.service, filter));

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              filter === t.key
                ? "bg-ink-900 text-white"
                : "border border-ink-200 bg-white text-ink-700 hover:border-ink-900"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Before / after sliders */}
      {bas.length > 0 && (
        <>
          <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-gold-600">
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

      {/* Showcase */}
      {shows.length > 0 && (
        <>
          <h2 className="mb-6 mt-16 text-center text-sm font-bold uppercase tracking-wider text-gold-600">
            Finished Projects
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
                    aspect="square"
                    rounded="rounded-none"
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
    </div>
  );
}
