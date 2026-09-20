import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenEdge } from "@/lib/mission/auth-edge";
import { SESSION_COOKIE, SESSION_SECRET } from "@/lib/mission/constants";

const PUBLIC_ADMIN = ["/admin/login"];

function isProtectedApi(pathname: string): boolean {
  const prefixes = [
    "/api/mission",
    "/api/applications",
    "/api/recruiters",
    "/api/activities",
    "/api/goals",
    "/api/finances",
    "/api/rv",
    "/api/export",
    "/api/import",
    "/api/interviews",
  ];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isApi = isProtectedApi(pathname);
  if (!isAdmin && !isApi) return NextResponse.next();

  if (PUBLIC_ADMIN.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionTokenEdge(token, SESSION_SECRET);

  if (!authed) {
    if (isApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
