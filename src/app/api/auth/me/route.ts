import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendFetch, safeJson } from "@/lib/backend";
import { ACCESS_COOKIE } from "@/lib/cookie.client";

export async function GET() {
  const jar = await cookies();
  const accessToken = jar.get(ACCESS_COOKIE)?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const r = await backendFetch("/api/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Unauthenticated" }, { status: r.status });
  }

  const user = await r.json();
  return NextResponse.json({ data: user });
}
