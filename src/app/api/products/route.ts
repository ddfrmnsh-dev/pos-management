import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendFetch, safeJson } from "@/lib/backend";
import { ACCESS_COOKIE } from "@/lib/cookie.client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = searchParams.get("page");

  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;

  const r = await backendFetch(
    `/api/products?q=${encodeURIComponent(q ?? "")}&page=${encodeURIComponent(page ?? "1")}`,
    {
      headers: access ? { Authorization: `Bearer ${access}` } : {},
    },
  );

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Failed" }, { status: r.status });
  }

  const data = await r.json();
  return NextResponse.json({ data });
}

// export async function POST(req: Request) {
//     const body = await req.json();

//     const jar = await cookies();
//     const access = jar.get(ACCESS_COOKIE)?.value;

//     if (!access) {
//         return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
//     }

//     const r = await backendFetch("/api/products", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${access}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body),
//     });

//     if (!r.ok) {
//         const err = await safeJson(r);
//         return NextResponse.json({ error: err?.error ?? "Create failed" }, { status: r.status });
//     }

//     const data = await r.json();
//     return NextResponse.json({ data }, { status: 201 });
// }

export async function POST(req: Request) {
  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;

  if (!access) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  // ⬇️ PENTING: pakai formData
  const formData = await req.formData();

  console.log("keys:", Array.from(formData.keys()));
  console.log("values:", Array.from(formData.values()));
  const r = await backendFetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      // ❌ JANGAN set Content-Type manual
    },
    body: formData, // forward langsung
  });

  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json({ error: text || "Create failed" }, { status: r.status });
  }

  const data = await r.json();
  return NextResponse.json({ data }, { status: 201 });
}
