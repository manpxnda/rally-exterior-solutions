"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Global "Start My Project" CTA → a three-way chooser, so the header button
 * serves every lighting service without funneling everyone into one generic
 * estimate form. Legacy services stay reachable via the quiet link at the end.
 */
const OPTIONS = [
  {
    eyebrow: "Permanent lighting",
    label: "Design My Home",
    sub: "A design consultation at your home. Projects generally start at $3,500.",
    href: "/design-consultation",
    icon: "lighting" as const,
    tone: "bg-ink-900 text-sky-300",
  },
  {
    eyebrow: "Christmas lighting",
    label: "Get My Christmas Quote",
    sub: "Often quoted remotely. Packages generally start at $1,500.",
    href: "/christmas-quote",
    icon: "snowflake" as const,
    tone: "bg-gold-400 text-ink-900",
  },
  {
    eyebrow: "Landscape lighting",
    label: "Start My Project",
    sub: "Trees, walkways, patios, and entertaining spaces.",
    href: "/contact?service=landscape-lighting",
    icon: "sparkle" as const,
    tone: "bg-sky-50 text-sky-600",
  },
];

export function ProjectChooser({
  label = "Start My Project",
  size = "sm",
  variant = "primary",
  className,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Portal target exists only on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    (triggerRef.current?.querySelector("button") as HTMLElement | null)?.focus();
  }

  return (
    <>
      <div ref={triggerRef} className={cn("inline-flex", className)}>
        <Button type="button" size={size} variant={variant} onClick={() => setOpen(true)} className="whitespace-nowrap">
          {label}
        </Button>
      </div>

      {/* Rendered through a portal so the sticky/blurred header can never
          become the containing block of the fixed overlay. */}
      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-chooser-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-ink-900/70 backdrop-blur-[2px]"
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 text-ink-900 shadow-cardHover sm:p-7">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50 hover:text-ink-900"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            <p className="text-xs font-bold uppercase tracking-wider text-sky-600">Start my project</p>
            <h2 id="project-chooser-title" className="mt-1 font-display text-2xl font-bold">
              What are you interested in?
            </h2>

            <ul className="mt-5 space-y-3">
              {OPTIONS.map((o, i) => (
                <li key={o.href}>
                  <Link
                    ref={i === 0 ? firstRef : undefined}
                    href={o.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  >
                    <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", o.tone)}>
                      <Icon name={o.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-400">{o.eyebrow}</span>
                      <span className="block font-display text-lg font-bold leading-tight text-ink-900">{o.label}</span>
                      <span className="block text-sm text-ink-500">{o.sub}</span>
                    </span>
                    <Icon name="arrowRight" className="h-5 w-5 shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-900" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-center text-xs text-ink-400">
              Something else — pressure washing, house or roof washing, concrete?{" "}
              <Link href="/contact" onClick={() => setOpen(false)} className="font-semibold text-ink-600 underline-offset-2 hover:underline">
                Use the general form
              </Link>
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
