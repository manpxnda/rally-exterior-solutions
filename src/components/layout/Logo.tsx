import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Brand mark — Rally's sun-over-water icon, recreated as scalable SVG so it
 * stays crisp at any size and works on light or dark backgrounds (it carries
 * its own cream circle). To use the exact uploaded asset instead, drop it at
 * /public/brand/icon.svg and swap <BrandMark/> for <Image src="/brand/icon.svg" .../>.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="Rally Exterior Solutions"
    >
      <defs>
        <clipPath id="rally-circle">
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="32" fill="#FAF0D7" />
      <g clipPath="url(#rally-circle)">
        {/* sun */}
        <circle cx="32" cy="30" r="9" fill="#EA6F61" />
        {/* rays */}
        <g
          stroke="#EA6F61"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <line x1="32" y1="18" x2="32" y2="14" />
          <line x1="38" y1="19.6" x2="40" y2="16.1" />
          <line x1="26" y1="19.6" x2="24" y2="16.1" />
          <line x1="42.4" y1="24" x2="45.9" y2="22" />
          <line x1="21.6" y1="24" x2="18.1" y2="22" />
          <line x1="44" y1="30" x2="48" y2="30" />
          <line x1="20" y1="30" x2="16" y2="30" />
        </g>
        {/* upper wave */}
        <path
          d="M7 44 Q19.5 39 32 44 T57 44"
          fill="none"
          stroke="#39ABA8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* lower wave (fills the base) */}
        <path
          d="M-2 51 Q16 46 32 51 T66 51 L66 66 L-2 66 Z"
          fill="#39ABA8"
        />
      </g>
    </svg>
  );
}

/**
 * Wordmark logo. Recreated with the brand slab-serif to match the printed logo.
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
      <BrandMark className="h-10 w-10 shrink-0 transition-transform group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold uppercase leading-none tracking-tight",
            isLight ? "text-white" : "text-ink-900"
          )}
        >
          Rally
        </span>
        <span
          className={cn(
            "mt-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em]",
            isLight ? "text-ink-200" : "text-ink-400"
          )}
        >
          Exterior Solutions
        </span>
      </span>
    </Link>
  );
}
