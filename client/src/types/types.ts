export type OrderStatus = "pending" | "approved" | "rejected";

export interface OrderItem {
  id: string; // backend orderID (e.g. "ORD001") - used for the status update API call
  orderCode: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  productImage: string;
  category: string;
  quantity: number;
  price: number;
  orderedAt: string;
  status: OrderStatus;
  extraItemsCount: number; // orders can contain multiple products; this is "+N more"
}

export type ProductCategory =
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bangles"
  | "Bracelets"
  | "Pendants";

export interface Product {
  id: string; // backend productID (e.g. "PRD001")
  name: string;
  category: ProductCategory;
  collection: string;
  metal: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  material: string; // display-friendly summary, derived from metal
  image: string;
  certification?: string;
  createdAt: string;
}

export type UserRole = "customer" | "admin";

export interface Customer {
  id: string; // backend Mongo _id
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}