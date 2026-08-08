import { ORDER_API_BASE } from "../config";
import { apiRequest, ApiError } from "./client";

export interface ApiOrderProduct {
  productID: string;
  name: string;
  price: number;
  quantity: number;
}

export type ApiOrderStatus =
  | "Pending"
  | "Payment Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out For Delivery"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

// Matches order-services/src/models/orders.js
export interface ApiOrder {
  _id: string;
  orderID: string;
  userID: string;
  products: ApiOrderProduct[];
  shippingAddress?: {
    fullName?: string;
    phone?: string;
  };
  totalAmount: number;
  orderStatus: ApiOrderStatus;
  createdAt: string;
}

interface GetAllOrdersResponse {
  success: boolean;
  message: string;
  allorder: {
    totalorder: number;
    allorders: ApiOrder[];
  };
}

interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  result: ApiOrder;
}

// GET / - protected by authMiddleware + adminMiddleware
export const fetchOrders = async (): Promise<ApiOrder[]> => {
  try {
    const data = await apiRequest<GetAllOrdersResponse>(`${ORDER_API_BASE}/`);
    return data.allorder.allorders;
  } catch (error) {
    // order-services throws a 404 "no orders found" instead of returning []
    if (error instanceof ApiError && error.status === 404) {
      return [];
    }
    throw error;
  }
};

// Only these statuses are accepted by order_svc.updateOrderStatus
export type AdminOrderAction = "Confirmed" | "Cancelled";

// PATCH /:orderID/status - protected by authMiddleware + adminMiddleware
export const updateOrderStatus = async (
  orderID: string,
  status: AdminOrderAction
): Promise<ApiOrder> => {
  const data = await apiRequest<UpdateOrderStatusResponse>(
    `${ORDER_API_BASE}/${orderID}/status`,
    {
      method: "PATCH",
      body: { status },
    }
  );
  return data.result;
};
