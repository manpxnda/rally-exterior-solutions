import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * OFFICIAL RALLY BRAND ASSETS (2026-09 repositioning)
 * ----------------------------------------------------------------------------
 * The wordmark and icon are the supplied logo files in /public/brand — not a
 * code recreation. Only transparent padding was trimmed and the files were
 * downscaled for the web; the artwork itself is untouched.
 *
 *   /brand/icon.png                  sun-over-water icon (coral + teal)
 *   /brand/logo-color.png            "RALLY Exterior Solutions" — coral/teal, for light backgrounds
 *   /brand/logo-white.png            "RALLY Exterior Solutions" — white, for dark backgrounds
 *   /brand/logo-lighting-color.png   "RALLY Exterior Lighting" — coral/teal + teal descriptor
 *   /brand/logo-lighting-white.png   "RALLY Exterior Lighting" — all white (descriptor stays white)
 *
 * Brand rule: when the lockup includes the words "Exterior Lighting", those
 * words stay WHITE (only the supplied white file is used on dark backgrounds).
 *
 * NOTE (2026-09-11): both supplied "Exterior Lighting" files contain faint
 * remnants of the "Exterior Solutions" text above the descriptor (export
 * artifact). They are kept here but NOT used until a clean export is supplied.
 */

const ASSETS = {
  solutions: {
    dark: "/brand/logo-color.png",
    light: "/brand/logo-white.png",
    // trimmed pixel size of the supplied files (keeps aspect ratio exact)
    width: 1200,
    height: 417,
    alt: "Rally Exterior Solutions",
  },
  lighting: {
    dark: "/brand/logo-lighting-color.png",
    light: "/brand/logo-lighting-white.png",
    width: 1200,
    height: 455,
    alt: "Rally Exterior Solutions — Exterior Lighting",
  },
} as const;

/** The sun-over-water brand icon (official file). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/icon.png"
      alt={site.name}
      width={512}
      height={492}
      className={cn("h-10 w-auto", className)}
    />
  );
}

/**
 * Wordmark logo (official file), linked to the homepage.
 *  - tone="dark"  → color wordmark for white/light backgrounds (header)
 *  - tone="light" → white wordmark for navy backgrounds (footer)
 *  - variant="lighting" → the "Exterior Lighting" lockup
 */
export function Logo({
  className,
  tone = "dark",
  variant = "solutions",
  priority,
}: {
  className?: string;
  tone?: "dark" | "light";
  variant?: "solutions" | "lighting";
  priority?: boolean;
}) {
  const asset = ASSETS[variant];
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={tone === "light" ? asset.light : asset.dark}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={cn(
          "w-auto",
          variant === "lighting" ? "h-12 sm:h-14" : "h-9 sm:h-10"
        )}
      />
    </Link>
  );
}
