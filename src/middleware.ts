import { NextRequest, NextResponse } from "next/server";

/**
 * Protects the private /dashboard with HTTP Basic Auth.
 * Credentials come from Vercel env: DASHBOARD_USER + DASHBOARD_PASSWORD.
 * Fails closed (503) if they aren't configured.
 */
export function middleware(req: NextRequest) {
  const USER = process.env.DASHBOARD_USER;
  const PASS = process.env.DASHBOARD_PASSWORD;

  if (!USER || !PASS) {
    return new NextResponse("Dashboard is not configured.", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === USER && p === PASS) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Rally Owner Dashboard"' },
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
