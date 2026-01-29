export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL!;
// export const BACKEND_BASE_URL = "http://127.0.0.1:8080";

export async function backendFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  let body: any = init.body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body && typeof body === "object" && !(body instanceof ArrayBuffer)) {
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  } else {
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  return fetch(`${BACKEND_BASE_URL}${path}`, {
    ...init,
    headers,
    body,
  });
}

export async function safeJson(r: Response) {
  try {
    return await r.json();
  } catch {
    return null;
  }
}
