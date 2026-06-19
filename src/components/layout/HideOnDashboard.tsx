"use client";

import { usePathname } from "next/navigation";

/** Routes that render without the shared marketing chrome (header/footer/etc.). */
const BARE_ROUTES = ["/dashboard", "/lp", "/review-card"];

/**
 * Hides marketing chrome on routes that need a focused, distraction-free shell:
 * the private /dashboard and paid-traffic landing pages under /lp.
 */
export function HideOnDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && BARE_ROUTES.some((r) => pathname.startsWith(r))) return null;
  return <>{children}</>;
}
