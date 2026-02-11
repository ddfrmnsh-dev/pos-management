// lib/normalizeProduct.ts
export function normalizeProduct(raw: any) {
  return {
    ...raw,
    groups: Array.isArray(raw?.groups) ? raw.groups : [],
    category_id: raw?.category_id ?? "",
    status: raw?.status ?? "active",
  };
}
