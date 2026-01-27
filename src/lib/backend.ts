export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL!;
// export const BACKEND_BASE_URL = "http://127.0.0.1:8080";

export async function backendFetch(path: string, init?: RequestInit) {
  return fetch(`${BACKEND_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export async function safeJson(r: Response) {
  try {
    return await r.json();
  } catch {
    return null;
  }
}
