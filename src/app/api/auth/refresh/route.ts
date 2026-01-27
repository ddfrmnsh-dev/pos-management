import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendFetch, safeJson } from "@/lib/backend";
import { ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions, refreshCookieOptions } from "@/lib/cookie.client";

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const r = await backendFetch("/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (!r.ok) {
    const err = await safeJson(r);
    const res = NextResponse.json({ error: err?.error ?? "Refresh failed" }, { status: r.status });
    // refresh gagal → bersihin cookie
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    return res;
  }

  const data = await r.json();
  const res = NextResponse.json({ ok: true });

  res.cookies.set(ACCESS_COOKIE, data.accessToken, accessCookieOptions);
  if (data.refreshToken) {
    res.cookies.set(REFRESH_COOKIE, data.refreshToken, refreshCookieOptions);
  }

  return res;
}
