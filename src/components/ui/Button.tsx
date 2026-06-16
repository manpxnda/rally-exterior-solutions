"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold-400 disabled:opacity-60 disabled:pointer-events-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-ink-900 hover:bg-gold-300 shadow-cta hover:-translate-y-0.5",
  secondary: "bg-ink-900 text-white hover:bg-ink-700 shadow-card",
  outline:
    "border-2 border-ink-200 text-ink-900 hover:border-ink-900 hover:bg-ink-50",
  white: "bg-white text-ink-900 hover:bg-ink-50 shadow-card hover:-translate-y-0.5",
  ghost: "text-ink-700 hover:text-ink-900 hover:bg-ink-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
  type?: never;
  external?: boolean;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  type?: "button" | "submit";
  external?: never;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    fullWidth,
    onClick,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          onClick={onClick}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    // tel: / mailto: links must be plain anchors, not the Next router.
    if (props.href.startsWith("tel:") || props.href.startsWith("mailto:")) {
      return (
        <a href={props.href} onClick={onClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
