import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark } from "@/components/layout/Logo";
import { getSearchRankings } from "@/lib/searchConsole";
import { RankingsPanel } from "@/components/dashboard/RankingsPanel";
import { TargetKeywordsPanel } from "@/components/dashboard/TargetKeywordsPanel";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  // Private internal page — never index.
  robots: { index: false, follow: false, nocache: true },
};

// Pulls live Search Console data per load — never cache.
export const dynamic = "force-dynamic";

type Tool = {
  title: string;
  desc: string;
  href: string;
  icon: IconName;
  tone: "coral" | "teal" | "navy";
};

const tools: Tool[] = [
  {
    title: "Google Analytics",
    desc: "Traffic, sources & conversions",
    href: "https://analytics.google.com/",
    icon: "bolt",
    tone: "coral",
  },
  {
    title: "Search Console",
    desc: "Search rankings, clicks & indexing",
    href: "https://search.google.com/search-console",
    icon: "star",
    tone: "teal",
  },
  {
    title: "Microsoft Clarity",
    desc: "Heatmaps & session recordings",
    href: "https://clarity.microsoft.com/",
    icon: "image",
    tone: "navy",
  },
  {
    title: "Vercel Analytics",
    desc: "Live traffic & page speed",
    href: "https://vercel.com/manpxndas-projects/rally-exterior-solutions/analytics",
    icon: "layers",
    tone: "coral",
  },
  {
    title: "Lead Email Logs",
    desc: "Resend — every lead sent & delivered",
    href: "https://resend.com/emails",
    icon: "mail",
    tone: "teal",
  },
  {
    title: "Lead Inbox (info@)",
    desc: "Your incoming estimate requests",
    href: "https://outlook.office.com/mail/",
    icon: "calendar",
    tone: "navy",
  },
  {
    title: "Vercel Project",
    desc: "Hosting, deploys & settings",
    href: "https://vercel.com/manpxndas-projects/rally-exterior-solutions",
    icon: "sparkle",
    tone: "coral",
  },
  {
    title: "Website Code",
    desc: "GitHub repository & history",
    href: "https://github.com/manpxnda/rally-exterior-solutions",
    icon: "shield",
    tone: "teal",
  },
];

const toneClass: Record<Tool["tone"], string> = {
  coral: "bg-gold-100 text-gold-700",
  teal: "bg-sky-100 text-sky-600",
  navy: "bg-ink-900 text-gold-300",
};

export default async function DashboardPage() {
  const lookerUrl = process.env.NEXT_PUBLIC_LOOKER_EMBED_URL;

  // One set of GSC calls feeds both panels: current 28 days + prior 28 (trend).
  const current = await getSearchRankings(28, 1000, 0);
  const previous = current.configured
    ? await getSearchRankings(28, 1000, 28)
    : current;

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Header */}
      <header className="border-b border-ink-100 bg-white">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" />
            <div>
              <p className="font-display text-lg font-extrabold leading-none text-ink-900">
                Owner Dashboard
              </p>
              <p className="text-xs text-ink-400">Rally Exterior Solutions</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-ink-500 hover:text-ink-900"
          >
            View site →
          </Link>
        </Container>
      </header>

      <Container className="py-10">
        {/* Target keywords (owner-picked) + all-queries (Search Console) */}
        <TargetKeywordsPanel current={current} previous={previous} />
        <RankingsPanel result={current} />

        {/* Combined analytics report */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">
            Live analytics
          </h2>
          {lookerUrl ? (
            <iframe
              title="Rally analytics report"
              src={lookerUrl}
              className="h-[72vh] w-full rounded-2xl border border-ink-100 bg-white shadow-card"
              allowFullScreen
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Icon name="bolt" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-ink-900">
                Connect your combined report
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
                A Looker Studio report (Google Analytics + Search Console in one
                view) will appear here. Create it free at{" "}
                <a
                  href="https://lookerstudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink-900 underline"
                >
                  lookerstudio.google.com
                </a>{" "}
                — then it gets embedded here.
              </p>
            </div>
          )}
        </section>

        {/* Quick-launch tools */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">
            All your tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClass[t.tone]}`}
                >
                  <Icon name={t.icon} className="h-6 w-6" />
                </span>
                <p className="mt-4 flex items-center gap-1 font-bold text-ink-900">
                  {t.title}
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-900"
                  />
                </p>
                <p className="mt-1 text-sm text-ink-500">{t.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-ink-400">
          Private dashboard · not indexed · {new Date().getFullYear()} Rally
          Exterior Solutions
        </p>
      </Container>
    </div>
  );
}
