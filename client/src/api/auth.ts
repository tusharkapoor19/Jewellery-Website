import { AUTH_API_BASE } from "../config";
import { apiRequest } from "./client";

interface LoginResponse {
  message: string;
  token: string;
  name: string;
}

/**
 * Decodes a JWT payload without verifying the signature.
 * This is only used client-side to read `role` for UI purposes
 * (e.g. showing a friendly error if a non-admin account logs in).
 * The backend is the source of truth for authorization - adminMiddleware
 * on each service re-checks role on every request.
 */
export const decodeJwtPayload = (
  token: string
): { id?: string; role?: string; exp?: number } | null => {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
};

export const login = (email: string, password: string) =>
  apiRequest<LoginResponse>(`${AUTH_API_BASE}/login`, {
    method: "POST",
    body: { email, password },
    auth: false,
  });
