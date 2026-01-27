import { NextResponse } from "next/server";

import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";

import { backendFetch, safeJson } from "@/lib/backend";
import { ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions, refreshCookieOptions } from "@/lib/cookie.client";

export async function POST(req: Request) {
  const body = await req.json(); // { email, password }

  const r = await backendFetch("/api/users/_login", {
    method: "POST",
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Login failed" }, { status: r.status });
  }

  const data = await r.json();
  // console.log("[NEXT LOGIN] backend response:", data);

  // Balikin user aja, token masuk cookie HttpOnly
  const res = NextResponse.json({ data: data.data.email });

  console.log("access token:", data.data.access_token);
  console.log("refresh token:", data.data.refresh_token);

  res.cookies.set(ACCESS_COOKIE, data.data.access_token, accessCookieOptions);
  res.cookies.set(REFRESH_COOKIE, data.data.refresh_token, refreshCookieOptions);

  return res;
}

// export async function POST(req: Request) {
//     const body = await req.json();

//     console.log("[NEXT LOGIN] payload:", body);

//     const r = await backendFetch("/v1/users/_login", {
//         method: "POST",
//         body: JSON.stringify(body),
//     });

//     console.log("[NEXT LOGIN] backend status:", r.status);

//     if (!r.ok) {
//         const errText = await r.text();
//         console.log("[NEXT LOGIN] backend error body:", errText);
//         return NextResponse.json({ error: errText || "Login failed" }, { status: r.status });
//     }

// }
