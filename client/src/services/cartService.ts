import { CartResponse } from "../types/cart";

const BASE_URL = "http://localhost:5005/cart";

class CartService {

    /* =====================================================
       HEADERS
    ===================================================== */

    private getHeaders() {

        const token =
            localStorage.getItem("token");

        return {
            "Content-Type": "application/json",

            Authorization:
                `Bearer ${token}`
        };

    }


    /* =====================================================
       GET CART
    ===================================================== */

    async getCart(): Promise<CartResponse> {

        const response = await fetch(
            `${BASE_URL}/get`,
            {
                method: "GET",

                headers: this.getHeaders(),

                /*
                 * IMPORTANT:
                 * Always fetch latest cart from backend.
                 * Prevent browser from returning cached data.
                 */
                cache: "no-store"
            }
        );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to fetch cart"
            );

        }

        /*
         * Backend response:
         *
         * {
         *   success: true,
         *   cart: {
         *      cartItems: [],
         *      cartValue: ...
         *   }
         * }
         */

        return data.cart;

    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    async addToCart(

        productId: string,

        quantity: number = 1,

        size: string = ""

    ) {

        const response =
            await fetch(

                `${BASE_URL}/add/${productId}`,

                {
                    method: "POST",

                    headers:
                        this.getHeaders(),

                    body:
                        JSON.stringify({

                            quantity,

                            size

                        })

                }

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.message ||
                "Failed to add product"

            );

        }


        return data;

    }


    /* =====================================================
       UPDATE QUANTITY
    ===================================================== */

    async updateQuantity(

        productId: string,

        quantity: number,

        size: string = ""

    ) {

        const response =
            await fetch(

                `${BASE_URL}/update/${productId}`,

                {

                    method: "PATCH",

                    headers:
                        this.getHeaders(),

                    body:
                        JSON.stringify({

                            quantity,

                            size

                        })

                }

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.message ||
                "Failed to update cart"

            );

        }


        return data;

    }


    /* =====================================================
       REMOVE FROM CART
    ===================================================== */

    async removeFromCart(

        productId: string,

        size: string = ""

    ) {

        const response =
            await fetch(

                `${BASE_URL}/remove/${productId}`,

                {

                    method: "DELETE",

                    headers:
                        this.getHeaders(),

                    body:
                        JSON.stringify({

                            size

                        })

                }

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.message ||
                "Failed to remove product"

            );

        }


        return data;

    }


    /* =====================================================
       CLEAR CART
       Called after an order has been successfully placed
       and paid for, so purchased items don't linger in
       the cart.
    ===================================================== */

    async clearCart() {

        const response =
            await fetch(

                `${BASE_URL}/clear`,

                {

                    method: "DELETE",

                    headers:
                        this.getHeaders()

                }

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(

                data.message ||
                "Failed to clear cart"

            );

        }


        return data;

    }

}


export default new CartService();