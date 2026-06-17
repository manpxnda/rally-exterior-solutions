"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { trackCallClick, trackTextClick } from "@/lib/analytics";
import { Icon } from "@/components/ui/Icon";

/**
 * Sticky bottom action bar on mobile — keeps "Call", "Text", and "Free Quote"
 * one thumb-tap away at all times. Hidden on desktop. The estimate stays the
 * gold primary; call + text give lower-friction paths for people who won't
 * fill out a form.
 */
export function MobileCTABar() {
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
          href="/contact"
          className="inline-flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-gold-400 px-2 py-2.5 text-xs font-bold text-ink-900 shadow-cta"
        >
          <Icon name="calendar" className="h-5 w-5" />
          Free Quote
        </Link>
      </div>
    </div>
  );
}
