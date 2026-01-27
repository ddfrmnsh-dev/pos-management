import { NextRequest, NextResponse } from "next/server";

import { ACCESS_COOKIE } from "@/lib/cookie.client";

const PUBLIC_PATHS = ["/auth/v1/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const access = req.cookies.get(ACCESS_COOKIE)?.value;
  const isLoggedIn = Boolean(access);

  // belum login → semua page private redirect ke /auth/v1/login
  if (!isLoggedIn && !PUBLIC_PATHS.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/v1/login";
    return NextResponse.redirect(url);
  }

  // sudah login → dilarang buka /auth/v1/login
  if (isLoggedIn && pathname === "/auth/v1/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
