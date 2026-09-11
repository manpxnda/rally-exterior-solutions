"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * "One system. Every season." — click a scene, the home changes.
 * REAL PHOTOS ONLY. The first three scenes are the same home; "Party" is a
 * different real install. There is no real red/green Christmas-scene photo
 * yet — add one here as soon as it exists (see ITEMS REQUIRING APPROVAL).
 */
const SCENES = [
  {
    key: "everyday",
    label: "Everyday",
    src: "/images/lighting/permanent-warm-white.jpg",
    alt: "Home with warm white permanent lighting along the rooflines",
    caption: "Warm architectural white, every night, on a schedule.",
  },
  {
    key: "pure-white",
    label: "Pure White",
    src: "/images/lighting/permanent-pure-white.jpg",
    alt: "The same home with crisp pure white lighting along the rooflines",
    caption: "Crisp white for a cleaner, cooler look — one tap.",
  },
  {
    key: "gameday",
    label: "Game Day",
    src: "/images/lighting/permanent-independence.jpg",
    alt: "The same home with red, white, and blue lights along the rooflines",
    caption: "Your team's colors, from the driveway to the peak.",
  },
  {
    key: "party",
    label: "Party",
    src: "/images/lighting/permanent-forward-facing.jpg",
    alt: "Brick ranch home at dusk with a rainbow of colors along the roofline",
    caption: "Any color, any pattern, whenever there's a reason.",
  },
] as const;

type SceneKey = (typeof SCENES)[number]["key"];

export function SceneSelector() {
  const [active, setActive] = useState<SceneKey>("everyday");
  const current = SCENES.find((s) => s.key === active) ?? SCENES[0];

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % SCENES.length;
    if (e.key === "ArrowLeft") next = (i - 1 + SCENES.length) % SCENES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SCENES.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(SCENES[next].key);
      (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose a lighting scene"
        className="mb-5 flex w-full gap-1 rounded-full bg-white/10 p-1 sm:inline-flex sm:w-auto"
      >
        {SCENES.map((s, i) => {
          const on = s.key === active;
          return (
            <button
              key={s.key}
              id={`scene-tab-${s.key}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="scene-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(s.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex-1 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:px-5",
                on ? "bg-white text-ink-900" : "text-ink-100 hover:text-white"
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        id="scene-panel"
        role="tabpanel"
        aria-labelledby={`scene-tab-${current.key}`}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 shadow-cardHover sm:aspect-[16/10]"
      >
        {SCENES.map((s) => (
          <Image
            key={s.key}
            src={s.src}
            alt={s.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={cn(
              "object-cover transition-opacity duration-500 motion-reduce:transition-none",
              s.key === active ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={s.key !== active}
          />
        ))}
        <p
          aria-live="polite"
          className="absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)] rounded-lg bg-ink-900/80 px-4 py-2.5 text-sm text-white backdrop-blur sm:bottom-5 sm:left-5"
        >
          <span className="font-bold text-sky-300">{current.label}.</span>{" "}
          {current.caption}
        </p>
      </div>
    </div>
  );
}
