import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { BrandMark } from "@/components/layout/Logo";
import { Stars } from "@/components/ui/Stars";

export const metadata: Metadata = {
  title: "Review Card",
  // Internal print asset — keep out of search.
  robots: { index: false, follow: false },
};

/**
 * Printable "leave us a review" card. Scan the QR (→ /review → Google review
 * page) or read the short link. Print it (⌘/Ctrl+P) for leave-behinds, or
 * screenshot the QR to text past customers.
 */
export default function ReviewCardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 p-6 print:bg-white print:p-0">
      <div className="w-full max-w-sm rounded-3xl border-2 border-ink-100 bg-white p-8 text-center shadow-card print:border print:shadow-none">
        <BrandMark className="mx-auto h-14 w-14" />
        <p className="mt-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
          {site.name}
        </p>

        <div className="mt-4 flex justify-center">
          <Stars rating={5} size="h-6 w-6" />
        </div>

        <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink-900">
          Love how it turned out?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          A quick review means the world to a local business — it takes about 30
          seconds. Just scan:
        </p>

        <div className="mx-auto mt-6 w-fit rounded-2xl border border-ink-100 bg-white p-3">
          <Image
            src="/review-qr.png"
            alt="Scan to leave Rally a Google review"
            width={220}
            height={220}
            className="h-[220px] w-[220px]"
          />
        </div>

        <p className="mt-3 text-sm font-bold text-ink-900">
          rallyexteriorsolutions.com/review
        </p>
        <p className="mt-4 text-xs text-ink-400">
          Thank you! — The Rally Team · {site.phoneDisplay}
        </p>
      </div>

      {/* on-screen only */}
      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-ink-400 print:hidden">
        Tip: press ⌘/Ctrl+P to print, or screenshot the QR to text past customers.
      </p>
    </div>
  );
}
