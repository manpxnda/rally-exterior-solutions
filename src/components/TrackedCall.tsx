"use client";

import { site } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";

/**
 * A fully style-able phone link that fires call tracking. Use when CallButton's
 * Button styling doesn't fit (e.g. custom hero/sticky-bar buttons on landing pages).
 */
export function TrackedCall({
  source = "site",
  className,
  children,
}: {
  source?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={site.phoneHref}
      onClick={() => trackCallClick(source)}
      className={className}
    >
      {children}
    </a>
  );
}
