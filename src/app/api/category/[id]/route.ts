import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { backendFetch, safeJson } from "@/lib/backend";
import { ACCESS_COOKIE } from "@/lib/cookie.client";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;

  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;
  if (!access) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const r = await backendFetch(`/api/category/${encodeURIComponent(id)}`, {
    headers: access ? { Authorization: `Bearer ${access}` } : {},
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Not found" }, { status: r.status });
  }
  const data = await r.json();
  return NextResponse.json({ data });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();

  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;
  if (!access) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const r = await backendFetch(`/api/category/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Update failed" }, { status: r.status });
  }

  const data = await r.json();
  return NextResponse.json({ data });
}

export async function PATCH(req: Request, { params }: Ctx) {
  // kalau backend Go kamu support PATCH partial update
  const { id } = await params;
  const body = await req.json();

  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;
  if (!access) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const r = await backendFetch(`/api/category/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${access}` },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Patch failed" }, { status: r.status });
  }

  const data = await r.json();
  return NextResponse.json({ data });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;

  const jar = await cookies();
  const access = jar.get(ACCESS_COOKIE)?.value;
  if (!access) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  const r = await backendFetch(`/api/category/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${access}` },
  });

  if (!r.ok) {
    const err = await safeJson(r);
    return NextResponse.json({ error: err?.error ?? "Delete failed" }, { status: r.status });
  }

  return NextResponse.json({ ok: true });
}
