import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Wordmark logo. Replace the mark/SVG with the real brand logo when available
 * (drop an SVG/PNG in /public and swap this component's contents).
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} — home`}
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-900" aria-hidden="true">
          {/* simple light-burst mark */}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M18.4 5.6l-2 2M7.6 16.4l-2 2" />
            <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
          </g>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight",
            isLight ? "text-white" : "text-ink-900"
          )}
        >
          Rally
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.18em]",
            isLight ? "text-ink-200" : "text-ink-400"
          )}
        >
          Exterior Solutions
        </span>
      </span>
    </Link>
  );
}
