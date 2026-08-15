import { ANALYTICS_API_BASE } from "../config";
import { apiRequest } from "./client";

export interface TopProduct {
  productID: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface TopCustomer {
  userID: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
}

export interface RevenueByMetal {
  gold: number;
  silver: number;
  platinum: number;
  other: number;
}

// Matches analytics-services/src/service/analytics_svc.js
export interface MonthlyAnalytics {
  month: string; // "YYYY-MM"
  totalOrders: number;
  totalRevenue: number;
  revenueByMetal: RevenueByMetal;
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
}

interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: MonthlyAnalytics;
}

// GET /summary?month=YYYY-MM - protected by authMiddleware + adminMiddleware
export const fetchMonthlyAnalytics = async (
  month: string
): Promise<MonthlyAnalytics> => {
  const data = await apiRequest<AnalyticsResponse>(
    `${ANALYTICS_API_BASE}/summary?month=${encodeURIComponent(month)}`
  );
  return data.data;
};
