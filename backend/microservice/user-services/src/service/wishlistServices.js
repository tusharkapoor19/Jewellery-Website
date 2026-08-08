const Wishlist = require("../models/wishlist.js");
const Product = require("../models/product.js");

const addProductToWishlist = async (userId, productId) => {

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {

        wishlist = await Wishlist.create({
            userId,
            items: []
        });

    }

    const exists = wishlist.items.some(
        (item) => item.productId === productId
    );

    if (exists) {

        throw new Error("Product already exists in wishlist");

    }

    wishlist.items.push({
        productId
    });

    await wishlist.save();

    return wishlist;

};

const removeProductFromWishlist = async (userId, productId) => {

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {

        throw new Error("Wishlist not found");

    }

    wishlist.items = wishlist.items.filter(
        (item) => item.productId !== productId
    );

    await wishlist.save();

    return wishlist;

};

const getWishlist = async (userId) => {

    const wishlist = await Wishlist.findOne({ userId });

    console.log("USER ID:", userId);
    console.log("WISHLIST:", wishlist);

    if (!wishlist) {
        return [];
    }

    const wishlistItems = [];

    for (const item of wishlist.items) {

        console.log("Searching Product:", item.productId);

        const product = await Product.findOne({
            productID: item.productId
        });

        console.log("FOUND:", product);

        if (product) {

            wishlistItems.push({
                productId: product.productID,
                name: product.name,
                category: product.category,
                image: product.image,
                weight: product.weight,
                price: product.price
            });

        }

    }

    return wishlistItems;
};

module.exports= {
    addProductToWishlist,
    removeProductFromWishlist,
    getWishlist
};