import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BrandMark } from "@/components/layout/Logo";
import {
  getSearchRankings,
  getPagePerformance,
  getIndexStatus,
} from "@/lib/searchConsole";
import { summarizeKpis, buildActionItems } from "@/lib/dashboardInsights";
import { targetKeywords } from "@/data/targetKeywords";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { ActionItemsPanel } from "@/components/dashboard/ActionItemsPanel";
import { RankingsPanel } from "@/components/dashboard/RankingsPanel";
import { TargetKeywordsPanel } from "@/components/dashboard/TargetKeywordsPanel";
import { PagePerformancePanel } from "@/components/dashboard/PagePerformancePanel";
import { IndexStatusPanel, KEY_PATHS } from "@/components/dashboard/IndexStatusPanel";

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
    desc: "Request indexing, full reports",
    href: "https://search.google.com/search-console",
    icon: "star",
    tone: "teal",
  },
  {
    title: "Google Ads",
    desc: "Campaigns, spend & conversions",
    href: "https://ads.google.com/",
    icon: "tag",
    tone: "navy",
  },
  {
    title: "Business Profile",
    desc: "Reviews, posts & Google Maps",
    href: "https://business.google.com/",
    icon: "pin",
    tone: "coral",
  },
  {
    title: "Microsoft Clarity",
    desc: "Heatmaps & session recordings",
    href: "https://clarity.microsoft.com/",
    icon: "image",
    tone: "teal",
  },
  {
    title: "Review QR Card",
    desc: "Printable → your Google review link",
    href: "/review-card",
    icon: "star",
    tone: "navy",
  },
  {
    title: "Lead Email Logs",
    desc: "Resend — every lead sent & delivered",
    href: "https://resend.com/emails",
    icon: "mail",
    tone: "coral",
  },
  {
    title: "Vercel Project",
    desc: "Hosting, deploys & analytics",
    href: "https://vercel.com/manpxndas-projects/rally-exterior-solutions",
    icon: "layers",
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

  // One parallel batch of Search Console calls feeds every panel below:
  // current 28 days + prior 28 (for trends) + page performance + index status.
  const [current, previous, pages, index] = await Promise.all([
    getSearchRankings(28, 1000, 0),
    getSearchRankings(28, 1000, 28),
    getPagePerformance(28, 500, 0),
    getIndexStatus(KEY_PATHS),
  ]);

  const kpis = summarizeKpis(current, previous, index);
  const actions = buildActionItems({
    current,
    previous,
    pages,
    index,
    targets: targetKeywords,
  });

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
        <div className="mb-8 flex items-center gap-2 text-xs text-ink-400">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Live from Google Search Console
          {current.range && (
            <>
              {" · "}
              {current.range.start} → {current.range.end}
            </>
          )}
          {" · "}Google data lags ~2 days. Refresh the page for the latest.
        </div>

        {/* 1. Top-line KPIs (vs prior period) */}
        <OverviewPanel kpis={kpis} />

        {/* 2. The to-do list — what to update, ranked by impact */}
        <ActionItemsPanel items={actions} configured={current.configured} />

        {/* 3. Supporting detail */}
        <IndexStatusPanel result={index} />
        <PagePerformancePanel result={pages} />
        <TargetKeywordsPanel current={current} previous={previous} />
        <RankingsPanel result={current} />

        {/* Optional deep-dive report (only if a Looker URL is configured) */}
        {lookerUrl && (
          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-ink-900">
              Deep-dive analytics
            </h2>
            <iframe
              title="Rally analytics report"
              src={lookerUrl}
              className="h-[72vh] w-full rounded-2xl border border-ink-100 bg-white shadow-card"
              allowFullScreen
            />
          </section>
        )}

        {/* Quick-launch tools */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-ink-900">
            Your tools
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
