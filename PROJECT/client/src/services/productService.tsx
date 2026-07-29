import { Product } from "../types";

const BASE_URL = "http://localhost:5002/product";

class ProductService {

    async getAllProducts(): Promise<Product[]> {

        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        return data.products.products;
    }

    async getProductById(productID: string): Promise<Product> {

        const response = await fetch(`${BASE_URL}/${productID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        return data.product;
    }

    async getProductsByCollection(collection: string): Promise<Product[]> {

        const response = await fetch(
            `${BASE_URL}?collection=${encodeURIComponent(collection)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch collection");
        }

        const data = await response.json();

        return data.products.products;
    }

    async getProductsByCategory(category: string): Promise<Product[]> {

        const response = await fetch(
            `${BASE_URL}?category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch category");
        }

        const data = await response.json();

        return data.products.products;
    }

    async getProductsByMetal(metal: string): Promise<Product[]> {

        const response = await fetch(
            `${BASE_URL}?metal=${encodeURIComponent(metal)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch metal");
        }

        const data = await response.json();

        return data.products.products;
    }

    async searchProducts(keyword: string): Promise<Product[]> {

        const response = await fetch(
            `${BASE_URL}/search?name=${encodeURIComponent(keyword)}`
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const data = await response.json();

        return data.products.products;
    }

}

export default new ProductService();