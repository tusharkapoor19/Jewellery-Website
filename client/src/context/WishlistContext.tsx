import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";

import wishlistService from "../services/wishlistService";
import { WishlistItem } from "../types/wishlist";

interface WishlistContextType {

    wishlist: WishlistItem[];

    loading: boolean;

    wishlistCount: number;

    refreshWishlist: () => Promise<void>;

    isWishlisted: (productId: string) => boolean;

    addToWishlist: (productId: string) => Promise<void>;

    removeFromWishlist: (productId: string) => Promise<void>;

}

const WishlistContext = createContext<WishlistContextType | undefined>(
    undefined
);

export const WishlistProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    const [loading, setLoading] = useState(false);
    const refreshWishlist = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

        setWishlist([]);

        return;

    }

    try {

        setLoading(true);

        const data = await wishlistService.getWishlist();

console.log("Wishlist API Response:", data);

setWishlist(data);

        setWishlist(data);

    }

    catch (error) {

        console.error(error);

        setWishlist([]);

    }

    finally {

        setLoading(false);

    }

};
useEffect(() => {

    refreshWishlist();

}, []);
const isWishlisted = (productId: string) => {

    return wishlist.some(

        item => item.productId === productId

    );

};
const addToWishlist = async (
    productId: string
) => {

    await wishlistService.addToWishlist(
        productId
    );

    await refreshWishlist();

};
const removeFromWishlist = async (
    productId: string
) => {

    await wishlistService.removeFromWishlist(
        productId
    );

    await refreshWishlist();

};
return (

    <WishlistContext.Provider

        value={{

            wishlist,

            loading,

            wishlistCount: wishlist.length,

            refreshWishlist,

            isWishlisted,

            addToWishlist,

            removeFromWishlist

        }}

    >

        {children}

    </WishlistContext.Provider>

);

};

export const useWishlist = () => {

    const context = useContext(
        WishlistContext
    );

    if (!context) {

        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );

    }

    return context;

};
