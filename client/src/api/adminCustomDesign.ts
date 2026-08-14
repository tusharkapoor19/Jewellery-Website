// Admin-side API client for the Custom Design tab in the main admin
// dashboard. This talks to the SAME custom-design-services backend the
// customer-facing design flow uses (port 5006) - there is no separate
// admin-custom-design service or login. Every request below carries the
// same admin Bearer token (see api/client.ts) already used by the
// Pending Orders / Catalogue / Customers tabs.
import { CUSTOM_DESIGN_API_BASE } from "../config";
import { apiRequest } from "./client";
import type { ChatMessage, CustomDesignRecord } from "../types";

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface DesignsPage {
  designs: CustomDesignRecord[];
  pagination: { total: number; page: number; limit: number; pages: number };
}

export interface DesignSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const fetchAdminDesigns = async (params: {
  orderStatus?: string;
  email?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<DesignsPage> => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const qs = query.toString();
  const res = await apiRequest<ApiEnvelope<DesignsPage>>(
    `${CUSTOM_DESIGN_API_BASE}${qs ? `?${qs}` : ""}`
  );
  return res.data;
};

export const fetchAdminDesignSummary = async (): Promise<DesignSummary> => {
  const res = await apiRequest<ApiEnvelope<DesignSummary>>(
    `${CUSTOM_DESIGN_API_BASE}/stats/summary`
  );
  return res.data;
};

export const fetchAdminDesign = async (id: string): Promise<CustomDesignRecord> => {
  const res = await apiRequest<ApiEnvelope<CustomDesignRecord>>(
    `${CUSTOM_DESIGN_API_BASE}/${id}`
  );
  return res.data;
};

// Admin-only partial update (order status + note to customer). Protected on
// the backend by the same authMiddleware + adminMiddleware pair used by
// every other admin route (orders, products, customers).
export const updateAdminDesign = async (
  id: string,
  patch: Partial<Pick<CustomDesignRecord, "orderStatus" | "adminNotes">>
): Promise<CustomDesignRecord> => {
  const res = await apiRequest<ApiEnvelope<CustomDesignRecord>>(
    `${CUSTOM_DESIGN_API_BASE}/${id}`,
    { method: "PATCH", body: patch }
  );
  return res.data;
};

export const fetchAdminMessages = async (id: string): Promise<ChatMessage[]> => {
  const res = await apiRequest<ApiEnvelope<ChatMessage[]>>(
    `${CUSTOM_DESIGN_API_BASE}/${id}/messages`
  );
  return res.data;
};

// Admin reply - protected route (POST /:id/messages/admin), separate from
// the customer's public POST /:id/messages so a reply is always tagged
// sender: "admin".
export const sendAdminMessage = async (id: string, text: string): Promise<ChatMessage[]> => {
  const res = await apiRequest<ApiEnvelope<ChatMessage[]>>(
    `${CUSTOM_DESIGN_API_BASE}/${id}/messages/admin`,
    { method: "POST", body: { text } }
  );
  return res.data;
};
