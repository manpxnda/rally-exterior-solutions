"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { getJourneyForPath } from "@/lib/journeys";
import { trackCallClick, trackTextClick } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";

/**
 * Sticky bottom action bar on mobile — Call, Text, and a context-aware primary
 * action. The primary follows the page the visitor is on (Christmas page →
 * Christmas quote, house-washing page → house-washing estimate, homepage →
 * the service chooser), so the next screen always matches what they just read.
 */
export function MobileCTABar() {
  const pathname = usePathname() ?? "/";
  const journey = getJourneyForPath(pathname);
  const label =
    journey.category === "lighting"
      ? journey.slug === "holiday-lighting"
        ? "Christmas Quote"
        : journey.slug === "landscape-lighting"
          ? "Design Lighting"
          : "Design My Home"
      : journey.category === "cleaning"
        ? "Free Estimate"
        : "Get Started";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={site.phoneHref}
          onClick={() => trackCallClick("mobile_bar")}
          className="inline-flex flex-col items-center justify-center gap-0.5 rounded-2xl border-2 border-ink-200 px-2 py-2.5 text-xs font-bold text-ink-900"
        >
          <Icon name="phone" className="h-5 w-5" />
          Call
        </a>
        <a
          href={site.smsHref}
          onClick={() => trackTextClick("mobile_bar")}
          className="inline-flex flex-col items-center justify-center gap-0.5 rounded-2xl border-2 border-ink-200 px-2 py-2.5 text-xs font-bold text-ink-900"
        >
          <Icon name="chat" className="h-5 w-5" />
          Text
        </a>
        <Link
          href={journey.href}
          className="inline-flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-gold-400 px-2 py-2.5 text-xs font-bold text-ink-900 shadow-cta"
        >
          <Icon name={journey.slug === "holiday-lighting" ? "snowflake" : journey.category === "lighting" ? "lighting" : "calendar"} className="h-5 w-5" />
          {label}
        </Link>
      </div>
    </div>
  );
}
