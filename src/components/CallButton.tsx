"use client";

import { site } from "@/lib/site";
import { trackCallClick, trackTextClick } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Phone CTA that fires call-click tracking (GA4 + Meta). */
export function CallButton({
  source = "site",
  variant = "secondary",
  size = "md",
  className,
  label,
  fullWidth,
}: {
  source?: string;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  fullWidth?: boolean;
}) {
  return (
    <Button
      href={site.phoneHref}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      onClick={() => trackCallClick(source)}
    >
      <Icon name="phone" className="h-5 w-5" />
      {label ?? `Call ${site.phoneDisplay}`}
    </Button>
  );
}

/** Text/SMS CTA that fires text-click tracking. Pre-fills the message. */
export function TextButton({
  source = "site",
  variant = "outline",
  size = "md",
  className,
  label,
  fullWidth,
}: {
  source?: string;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  fullWidth?: boolean;
}) {
  return (
    <Button
      href={site.smsHref}
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      onClick={() => trackTextClick(source)}
    >
      <Icon name="chat" className="h-5 w-5" />
      {label ?? "Text Us"}
    </Button>
  );
}

/** Inline text phone link with tracking (for headers/footers). */
export function CallLink({
  source = "site",
  className,
  children,
}: {
  source?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={site.phoneHref}
      onClick={() => trackCallClick(source)}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {children ?? (
        <>
          <Icon name="phone" className="h-4 w-4" />
          {site.phoneDisplay}
        </>
      )}
    </a>
  );
}

/** Inline text/SMS link with tracking. */
export function TextLink({
  source = "site",
  className,
  children,
}: {
  source?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={site.smsHref}
      onClick={() => trackTextClick(source)}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {children ?? (
        <>
          <Icon name="chat" className="h-4 w-4" />
          Text us
        </>
      )}
    </a>
  );
}
