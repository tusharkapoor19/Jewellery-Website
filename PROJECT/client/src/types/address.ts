export interface Address {

    _id: string;

    userId: string;

    fullName: string;

    phone: string;

    houseNumber: string;

    street: string;

    area: string;

    landmark: string;

    city: string;

    state: string;

    pincode: string;

    country: string;

    addressType: "Home" | "Office" | "Other";

    isDefault: boolean;

    createdAt: string;

    updatedAt: string;

}

export interface AddressContextType {

    addresses: Address[];

    loading: boolean;

    refreshAddresses: () => Promise<void>;

    addAddress: (
        data: Omit<
            Address,
            "_id" |
            "userId" |
            "createdAt" |
            "updatedAt"
        >
    ) => Promise<void>;

    updateAddress: (
        addressId: string,
        data: Partial<Address>
    ) => Promise<void>;

    deleteAddress: (
        addressId: string
    ) => Promise<void>;

    setDefaultAddress: (
        addressId: string
    ) => Promise<void>;

}