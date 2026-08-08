import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";

import addressService from "../services/addressService";

import {
    Address,
    AddressContextType
} from "../types/address";

const AddressContext =
    createContext<AddressContextType | null>(null);

interface Props {

    children: ReactNode;

}

export const AddressProvider = ({

    children

}: Props) => {

    const [

        addresses,

        setAddresses

    ] = useState<Address[]>([]);

    const [

        loading,

        setLoading

    ] = useState(false);

    const refreshAddresses = async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setAddresses([]);

            return;

        }

        try {

            setLoading(true);

            const data =
                await addressService.getAddresses();

            setAddresses(data);

        }

        catch (error) {

            console.error(error);

            setAddresses([]);

        }

        finally {

            setLoading(false);

        }

    };

    const addAddress = async (

    address: Omit<
        Address,
        "_id" |
        "userId" |
        "createdAt" |
        "updatedAt"
    >

) => {

        await addressService.addAddress(

            address

        );

        await refreshAddresses();

    };

  const updateAddress = async (

    addressId: string,

    address: Partial<Address>

) => {

        await addressService.updateAddress(

            addressId,

            address

        );

        await refreshAddresses();

    };

    const deleteAddress = async (

    addressId: string

) => {
        await addressService.deleteAddress(

            addressId

        );

        await refreshAddresses();

    };

  const setDefaultAddress = async (

    addressId: string

) => {

        await addressService.setDefaultAddress(

            addressId

        );

        await refreshAddresses();

    };

    useEffect(() => {

        refreshAddresses();

    }, []);

    return (

        <AddressContext.Provider

            value={{

                addresses,

                loading,

                refreshAddresses,

                addAddress,

                updateAddress,

                deleteAddress,

                setDefaultAddress

            }}

        >

            {children}

        </AddressContext.Provider>

    );

};

export const useAddress = () => {

    const context =

        useContext(AddressContext);

    if (!context) {

        throw new Error(

            "useAddress must be used inside AddressProvider"

        );

    }

    return context;

};