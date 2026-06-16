import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export type Crumb = { name: string; href: string };

/** Compact inner-page hero with breadcrumb, used across non-home pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="glow-gold pointer-events-none absolute -top-32 right-10 h-[28rem] w-[28rem]" />
      <Container className="relative py-12 sm:py-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-300">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-ink-500">/</span>}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-ink-100">{c.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-300">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-ink-200">
              {description}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function InlineCheck({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-ink-100">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
      {children}
    </span>
  );
}
