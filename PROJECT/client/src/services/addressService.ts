import { Address } from "../types/address";

const BASE_URL = "http://localhost:5005/address";

class AddressService {

    private getHeaders() {

        const token = localStorage.getItem("token");

        return {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

        };

    }

    async getAddresses(): Promise<Address[]> {

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

                "Failed to fetch addresses"

            );

        }

        return data.addresses;

    }

    async addAddress(

        address: Omit<
            Address,
            "_id" |
            "userId" |
            "createdAt" |
            "updatedAt"
        >

    ) {

        const response = await fetch(

            `${BASE_URL}/add`,

            {

                method: "POST",

                headers: this.getHeaders(),

                body: JSON.stringify(address)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to add address"

            );

        }

        return data;

    }

    async updateAddress(

        addressId: string,

        address: Partial<Address>

    ) {

        const response = await fetch(

            `${BASE_URL}/update/${addressId}`,

            {

                method: "PATCH",

                headers: this.getHeaders(),

                body: JSON.stringify(address)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to update address"

            );

        }

        return data;

    }

    async deleteAddress(

        addressId: string

    ) {

        const response = await fetch(

            `${BASE_URL}/delete/${addressId}`,

            {

                method: "DELETE",

                headers: this.getHeaders()

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to delete address"

            );

        }

        return data;

    }

    async setDefaultAddress(

        addressId: string

    ) {

        const response = await fetch(

            `${BASE_URL}/default/${addressId}`,

            {

                method: "PATCH",

                headers: this.getHeaders()

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to set default address"

            );

        }

        return data;

    }

}

export default new AddressService();