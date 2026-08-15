import { ApiOrder, ApiOrderStatus } from "./orders";
import { ApiProduct } from "./products";
import { ApiUser } from "./users";
import { ApiOffer } from "./offers";
import { Customer, Offer, OrderItem, OrderStatus, Product, ProductCategory } from "../types/types";
import { PRODUCT_IMAGE_BASE } from "../config";

const placeholderImage =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23F1E9DC'/%3E%3Cpath d='M60 20 L95 50 L60 100 L25 50 Z' fill='%23C7A24A'/%3E%3C/svg%3E";

const resolveImageUrl = (path?: string): string => {
  if (!path) return placeholderImage;
  if (/^https?:\/\//i.test(path)) return path; // already a full URL (e.g. Cloudinary) — leave as-is
  return `${PRODUCT_IMAGE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
};

export const productToUi = (product: ApiProduct): Product => ({
  id: product.productID,
  name: product.name,
  category: product.category as ProductCategory,
  collection: product.collection,
  metal: product.metal,
  description: product.description,
  price: product.price,
  weight: product.weight,
  stock: product.stock,
  material: product.metal,
  image: product.image || placeholderImage,
  certification: product.certification,
  createdAt: product.createdAt,
});

// order-services only has "Pending" / "Confirmed" / "Shipped" / "Delivered" /
// "Cancelled" as valid statuses to set (see updateOrderStatus's validStatus
// list). "Payment Pending" / "Packed" / "Out For Delivery" / "Refunded" exist
// in the schema for other flows (payments, logistics) but aren't reachable
// from this dashboard's Approve/Reject actions.
const statusToUi = (status: ApiOrderStatus): OrderStatus => {
  if (status === "Pending" || status === "Payment Pending") return "pending";
  if (status === "Cancelled" || status === "Refunded") return "rejected";
  return "approved"; // Confirmed, Packed, Shipped, Out For Delivery, Delivered
};

export const orderToUi = (order: ApiOrder): OrderItem => {
  const [firstItem] = order.products;
  const totalQuantity = order.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return {
    id: order.orderID,
    orderCode: order.orderID,
    customerName: order.shippingAddress?.fullName || "Unknown customer",
    customerPhone: order.shippingAddress?.phone || "—",
    productName: firstItem ? firstItem.name : "Unknown item",
    productImage: placeholderImage,
    category: "",
    quantity: totalQuantity,
    price: order.totalAmount / (totalQuantity || 1),
    orderedAt: order.createdAt,
    status: statusToUi(order.orderStatus),
    extraItemsCount: Math.max(order.products.length - 1, 0),
  };
};

export const userToUi = (user: ApiUser): Customer => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || "—",
  role: user.role,
});

export const offerToUi = (offer: ApiOffer): Offer => ({
  id: offer._id,
  code: offer.code,
  description: offer.description,
  discountType: offer.discountType,
  discountValue: offer.discountValue,
  minCartValue: offer.minCartValue,
  isActive: offer.isActive,
  createdAt: offer.createdAt,
});
