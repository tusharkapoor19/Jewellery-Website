import { OFFER_API_BASE } from "../config";
import { apiRequest } from "./client";

// Matches offer-services/src/models/Offer.js
export interface ApiOffer {
  _id: string;
  code: string;
  description: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minCartValue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewOfferPayload {
  code: string;
  description: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minCartValue: number;
  isActive?: boolean;
}

export type UpdateOfferPayload = Partial<NewOfferPayload>;

interface OfferResponse {
  success: boolean;
  message: string;
  data: ApiOffer;
}

interface OfferListResponse {
  success: boolean;
  message: string;
  data: ApiOffer[];
}

// GET /offers/active - public, only offers the admin has switched on.
// Used by the storefront's Offers page and the Cart's coupon list.
export const fetchActiveOffers = async (): Promise<ApiOffer[]> => {
  const data = await apiRequest<OfferListResponse>(`${OFFER_API_BASE}/active`, {
    auth: false,
  });
  return data.data;
};

// GET /offers - admin only, every offer (active + inactive).
export const fetchAllOffers = async (): Promise<ApiOffer[]> => {
  const data = await apiRequest<OfferListResponse>(`${OFFER_API_BASE}/`);
  return data.data;
};

// POST /offers - admin only.
export const addOffer = async (payload: NewOfferPayload): Promise<ApiOffer> => {
  const data = await apiRequest<OfferResponse>(`${OFFER_API_BASE}/`, {
    method: "POST",
    body: payload,
  });
  return data.data;
};

// PATCH /offers/:id - admin only.
export const updateOffer = async (
  id: string,
  payload: UpdateOfferPayload
): Promise<ApiOffer> => {
  const data = await apiRequest<OfferResponse>(`${OFFER_API_BASE}/${id}`, {
    method: "PATCH",
    body: payload,
  });
  return data.data;
};

// DELETE /offers/:id - admin only.
export const deleteOffer = async (id: string): Promise<void> => {
  await apiRequest<OfferResponse>(`${OFFER_API_BASE}/${id}`, {
    method: "DELETE",
  });
};

// POST /offers/validate - public. Authoritative check performed when a
// customer applies a coupon code in the cart: confirms the code exists,
// is active, and the cart meets its minimum value, then returns the
// current offer so pricing can be recalculated from live admin data.
export const validateOffer = async (
  code: string,
  cartValue: number
): Promise<ApiOffer> => {
  const data = await apiRequest<OfferResponse>(`${OFFER_API_BASE}/validate`, {
    method: "POST",
    body: { code, cartValue },
    auth: false,
  });
  return data.data;
};
