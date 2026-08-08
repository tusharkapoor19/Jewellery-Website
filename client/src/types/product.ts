export interface Product {
  _id: string;
  productID: string;

  name: string;
  description: string;

  price: number;
  weight: number;
  stock: number;

  category: string;
  collection: string;
  metal: string;

  image: string;
  images?: string[];

  certification?: string;

  createdAt?: string;
  updatedAt?: string;
}