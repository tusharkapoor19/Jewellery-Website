import { CartResponse } from "../types/cart";

const BASE_URL = "http://localhost:5005/cart";

class CartService {

    private getHeaders() {

        const token = localStorage.getItem("token");

        return {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        };

    }

    async getCart(): Promise<CartResponse> {

        const response = await fetch(

            `${BASE_URL}/get`,

            {

                method: "GET",

                headers: this.getHeaders()

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to fetch cart"

            );

        }

        return data.cart;

    }

        async addToCart(

            productId: string,

            quantity: number = 1,
            size: string = ""

        ) {

        const response = await fetch(

            `${BASE_URL}/add/${productId}`,

            {

                method: "POST",

                headers: this.getHeaders(),

                body: JSON.stringify({

                    quantity,
                    size

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to add product"

            );

        }

        return data;

    }

   async updateQuantity(

    productId: string,

    quantity: number,

    size: string = ""

) {

        const response = await fetch(

            `${BASE_URL}/update/${productId}`,

            {

                method: "PATCH",

                headers: this.getHeaders(),

                body: JSON.stringify({

                    quantity,
                    size

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to update cart"

            );

        }

        return data;

    }

    async removeFromCart(

        productId: string,
          size: string = ""

    ) {

       const response = await fetch(

    `${BASE_URL}/remove/${productId}`,

    {

        method: "DELETE",

        headers: this.getHeaders(),

        body: JSON.stringify({

            size

        })

    }

);

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to remove product"

            );

        }

        return data;

    }

}

export default new CartService();