import { Product } from "../types/product";

const WISHLIST_KEY = "wishlist";

export const getWishlist = (): Product[] => {

    return JSON.parse(

        localStorage.getItem(WISHLIST_KEY) || "[]"

    );

};

export const saveWishlist = (

    wishlist: Product[]

) => {

    localStorage.setItem(

        WISHLIST_KEY,

        JSON.stringify(wishlist)

    );

};

export const isInWishlist = (

    productID: string

) => {

    return getWishlist().some(

        item => item.productID === productID

    );

};

export const addToWishlist = (

    product: Product

) => {

    const wishlist = getWishlist();

    const exists = wishlist.find(

        item => item.productID === product.productID

    );

    if (exists) return false;

    wishlist.push(product);

    saveWishlist(wishlist);

    return true;

};

export const removeFromWishlist = (

    productID: string

) => {

    const wishlist = getWishlist().filter(

        item => item.productID !== productID

    );

    saveWishlist(wishlist);

};

export const clearWishlist = () => {

    saveWishlist([]);

};

export const getWishlistCount = () => {

    return getWishlist().length;

};