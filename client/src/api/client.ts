import { TOKEN_STORAGE_KEY } from "../config";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const getToken = (): string | null =>
  localStorage.getItem(TOKEN_STORAGE_KEY);

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean; // attach Authorization header, defaults to true
}

/**
 * Thin fetch wrapper shared by every service client.
 * - Attaches the admin's JWT as a Bearer token (all admin routes require it).
 * - Every service's errorMiddleware responds with { success:false, message },
 *   so we surface `message` consistently as ApiError.
 * - A 401 means the token is missing/expired: we clear it so the app falls
 *   back to the login screen instead of looping on failed requests.
 */
export async function apiRequest<T>(
  url: string,
  { method = "GET", body, auth = true }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    // no JSON body (e.g. network-level failure) - fall through
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}
