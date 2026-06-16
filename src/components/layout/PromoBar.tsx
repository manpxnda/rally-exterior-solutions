import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/** Slim seasonal urgency bar. Toggle via site.offer.promo.active. */
export function PromoBar() {
  if (!site.offer.promo.active) return null;
  return (
    <div className="bg-ink-900 text-white">
      <div className="container flex items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-xs sm:text-sm">
        <Icon name="sparkle" className="hidden h-4 w-4 text-gold-300 sm:block" />
        <span className="text-ink-100">{site.offer.promo.text}</span>
        <Link
          href="/contact"
          className="font-semibold text-gold-300 underline-offset-2 hover:underline"
        >
          {site.offer.promo.cta} →
        </Link>
      </div>
    </div>
  );
}
