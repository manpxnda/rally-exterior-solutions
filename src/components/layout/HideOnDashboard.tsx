"use client";

import { usePathname } from "next/navigation";

/** Hides marketing chrome (header/footer/etc.) on the private /dashboard. */
export function HideOnDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <>{children}</>;
}
