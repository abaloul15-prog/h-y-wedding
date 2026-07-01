import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This is a private, invitation-only site. Every response is stamped
 * with headers that discourage indexing and archiving, on top of the
 * static robots.txt disallow rule.
 */
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
