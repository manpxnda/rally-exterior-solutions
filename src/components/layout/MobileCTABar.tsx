"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { trackCallClick } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";

/**
 * Sticky bottom action bar on mobile — keeps "Call" and "Free Estimate"
 * one thumb-tap away at all times. Hidden on desktop.
 */
export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={site.phoneHref}
          onClick={() => trackCallClick("mobile_bar")}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-200 px-4 py-3 text-sm font-bold text-ink-900"
        >
          <Icon name="phone" className="h-5 w-5" />
          Call Now
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-4 py-3 text-sm font-bold text-ink-900 shadow-cta"
        >
          <Icon name="calendar" className="h-5 w-5" />
          Free Estimate
        </Link>
      </div>
    </div>
  );
}
