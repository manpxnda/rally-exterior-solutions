import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "white" | "muted" | "ink" | "gradient";

const toneClass: Record<Tone, string> = {
  white: "bg-white text-ink-900",
  muted: "bg-ink-50 text-ink-900",
  ink: "bg-ink-900 text-white",
  gradient: "bg-gradient-to-b from-ink-900 to-ink-800 text-white",
};

export function Section({
  children,
  tone = "white",
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", toneClass[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-wider",
            isLight ? "text-gold-300" : "text-gold-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight sm:text-4xl",
          isLight ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            isLight ? "text-ink-100" : "text-ink-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
