import { PRODUCT_API_BASE } from "../config";
import { apiRequest } from "./client";

// Matches product-services/src/models/products.js exactly.
export interface ApiProduct {
  _id?: string;
  productID: string;
  category: string;
  collection: string;
  metal: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  image?: string;
  images?: string[];
  certification?: string;
  createdAt: string;
}

export interface NewProductPayload {
  name: string;
  category: string;
  collection: string;
  metal: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  image?: string;
  images?: string[];
  certification?: string;
}

interface GetProductsResponse {
  message: string;
  products: {
    totalproducts: number;
    products: ApiProduct[];
  };
}

interface AddProductResponse {
  message: string;
  product: ApiProduct;
}

// GET / - public route, but we're already authenticated as admin so it's fine either way
export const fetchProducts = async (): Promise<ApiProduct[]> => {
  const data = await apiRequest<GetProductsResponse>(`${PRODUCT_API_BASE}/`);
  return data.products.products;
};

// Reads the file directly in the browser and returns a base64 data URL.
// Used as a fallback so a product photo is never lost even if the
// /upload-image route on the backend is unavailable or misbehaves.
const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });

export const uploadProductImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("hiranya_admin_token");

  try {
    const response = await fetch(`${PRODUCT_API_BASE}/upload-image`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData, // no Content-Type header — browser sets the multipart boundary
    });

    // If the backend didn't return JSON (e.g. an HTML error page), don't
    // call response.json() — that's what throws "Unexpected token '<'".
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return await readFileAsDataURL(file);
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Image upload failed");
    }
    return data.url; // backend returns the hosted URL
  } catch {
    // Network error, backend down, or bad response — fall back to a local
    // data URL so the admin can still preview + save the photo.
    return readFileAsDataURL(file);
  }
};

// POST /add - protected by authMiddleware + adminMiddleware
export const addProduct = async (
  payload: NewProductPayload
): Promise<ApiProduct> => {
  // Backend model field is "productID", not "productId" — rename before sending.
  const data = await apiRequest<AddProductResponse>(
    `${PRODUCT_API_BASE}/add`,
    {
      method: "POST",
      body: payload,
    }
  );
  return data.product;
};
