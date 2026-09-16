import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth for private areas:
 *   /dashboard  → DASHBOARD_USER + DASHBOARD_PASSWORD
 *   /inventory  → INVENTORY_USER + INVENTORY_PASSWORD (falls back to the
 *                 dashboard credentials when not set)
 * Fails closed (503) if no credentials are configured for the area.
 */
export function middleware(req: NextRequest) {
  const isInventory = req.nextUrl.pathname.startsWith("/inventory");

  const USER = isInventory
    ? process.env.INVENTORY_USER || process.env.DASHBOARD_USER
    : process.env.DASHBOARD_USER;
  const PASS = isInventory
    ? process.env.INVENTORY_PASSWORD || process.env.DASHBOARD_PASSWORD
    : process.env.DASHBOARD_PASSWORD;

  if (!USER || !PASS) {
    return new NextResponse(
      isInventory ? "Inventory is not configured." : "Dashboard is not configured.",
      { status: 503 }
    );
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === USER && p === PASS) {
        const res = NextResponse.next();
        // Never let the private app be cached by shared caches or indexed.
        res.headers.set("Cache-Control", "private, no-store");
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${isInventory ? "Rally Inventory" : "Rally Owner Dashboard"}"`,
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/inventory", "/inventory/:path*"],
};
