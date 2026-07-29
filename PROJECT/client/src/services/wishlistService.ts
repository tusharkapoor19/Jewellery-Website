import { WishlistItem } from "../types/wishlist";

const BASE_URL = "http://localhost:5005/wishlist";

class WishlistService {

    private getHeaders() {

        const token = localStorage.getItem("token");

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };

    }

    async getWishlist(): Promise<WishlistItem[]> {

        const response = await fetch(`${BASE_URL}/get`, {
            method: "GET",
            headers: this.getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch wishlist");
        }

        return data.wishlist;

    }

    async addToWishlist(productId: string) {

        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({
                productId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add product");
        }

        return data;

    }

    async removeFromWishlist(productId: string) {

        const response = await fetch(`${BASE_URL}/remove`, {
            method: "DELETE",
            headers: this.getHeaders(),
            body: JSON.stringify({
                productId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to remove product");
        }

        return data;

    }

}

export default new WishlistService();