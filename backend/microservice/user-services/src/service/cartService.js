const Cart = require("../models/cart.js");
const Product = require("../models/product.js");

const {
    fetchLiveRates,
    computeMetalPrice
} = require("../utils/liveRates.js");


/* =========================================================
   HELPERS
========================================================= */

const normalizeSize = (size = "") => {
    return String(size || "").trim();
};

const normalizeProductId = (productId) => {
    return String(productId || "").trim();
};


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

const addProductToCart = async (
    userId,
    productId,
    quantity = 1,
    size = ""
) => {

    const normalizedProductId =
        normalizeProductId(productId);

    const normalizedSize =
        normalizeSize(size);


    const product = await Product.findOne({
        productID: normalizedProductId
    });


    if (!product) {
        throw new Error("Product not found");
    }


    if (product.stock <= 0) {

        throw new Error(
            "Product is out of stock"
        );

    }


    if (quantity <= 0) {

        throw new Error(
            "Quantity must be greater than 0"
        );

    }


    if (quantity > product.stock) {

        throw new Error(
            "Requested quantity exceeds available stock"
        );

    }


    const rates =
        await fetchLiveRates();


    const price =
        computeMetalPrice(
            product.metal,
            product.weight,
            rates
        );


    let cart =
        await Cart.findOne({
            userId
        });


    if (!cart) {

        cart = new Cart({

            userId,

            items: [],

            totalValue: 0

        });

    }


    const existingProduct =
        cart.items.find(
            (item) =>

                normalizeProductId(
                    item.productId
                ) === normalizedProductId

                &&

                normalizeSize(
                    item.size
                ) === normalizedSize
        );


    if (existingProduct) {

        const newQuantity =
            existingProduct.quantity +
            quantity;


        if (newQuantity > product.stock) {

            throw new Error(
                "Requested quantity exceeds available stock"
            );

        }


        existingProduct.quantity =
            newQuantity;

    }

    else {

        cart.items.push({

            productId:
                normalizedProductId,

            quantity,

            size:
                normalizedSize

        });

    }


    /*
     * Recalculate total from current cart
     * instead of blindly adding to old total.
     */

    cart.totalValue = 0;


    for (const item of cart.items) {

        const itemProduct =
            await Product.findOne({
                productID:
                    normalizeProductId(
                        item.productId
                    )
            });


        if (!itemProduct) continue;


        const itemPrice =
            computeMetalPrice(
                itemProduct.metal,
                itemProduct.weight,
                rates
            );


        cart.totalValue +=
            itemPrice *
            item.quantity;

    }


    await cart.save();


    return cart;

};


/* =========================================================
   UPDATE CART QUANTITY
========================================================= */

const updateCartQuantity = async (
    userId,
    productId,
    quantity,
    size = ""
) => {

    const normalizedProductId =
        normalizeProductId(productId);

    const normalizedSize =
        normalizeSize(size);


    const product =
        await Product.findOne({
            productID:
                normalizedProductId
        });


    if (!product) {

        throw new Error(
            "Product not found"
        );

    }


    const cart =
        await Cart.findOne({
            userId
        });


    if (!cart) {

        throw new Error(
            "Cart not found"
        );

    }


    if (quantity < 1) {

        throw new Error(
            "Quantity must be at least 1"
        );

    }


    if (quantity > product.stock) {

        throw new Error(
            "Requested quantity exceeds available stock"
        );

    }


    const cartItem =
        cart.items.find(
            (item) =>

                normalizeProductId(
                    item.productId
                ) === normalizedProductId

                &&

                normalizeSize(
                    item.size
                ) === normalizedSize
        );


    if (!cartItem) {

        throw new Error(
            "Product not found in cart"
        );

    }


    /*
     * Simply update quantity.
     */

    cartItem.quantity =
        quantity;


    /*
     * Recalculate complete cart value.
     */

    const rates =
        await fetchLiveRates();


    let totalValue = 0;


    for (const item of cart.items) {

        const itemProduct =
            await Product.findOne({
                productID:
                    normalizeProductId(
                        item.productId
                    )
            });


        if (!itemProduct) continue;


        const price =
            computeMetalPrice(
                itemProduct.metal,
                itemProduct.weight,
                rates
            );


        totalValue +=
            price *
            item.quantity;

    }


    cart.totalValue =
        Math.max(
            0,
            totalValue
        );


    await cart.save();


    return cart;

};


/* =========================================================
   REMOVE PRODUCT FROM CART
========================================================= */

const removeProductFromCart = async (
    userId,
    productId,
    size = ""
) => {

    const normalizedProductId =
        normalizeProductId(productId);

    const normalizedSize =
        normalizeSize(size);


    const cart =
        await Cart.findOne({
            userId
        });


    if (!cart) {

        throw new Error(
            "Cart not found"
        );

    }


    const cartItem =
        cart.items.find(
            (item) =>

                normalizeProductId(
                    item.productId
                ) === normalizedProductId

                &&

                normalizeSize(
                    item.size
                ) === normalizedSize
        );


    if (!cartItem) {

        throw new Error(
            "Product not found in cart"
        );

    }


    /*
     * IMPORTANT:
     * Use the SAME normalized comparison
     * while removing.
     */

    cart.items =
        cart.items.filter(
            (item) =>

                !(
                    normalizeProductId(
                        item.productId
                    ) === normalizedProductId

                    &&

                    normalizeSize(
                        item.size
                    ) === normalizedSize
                )
        );


    /*
     * Recalculate complete cart value.
     */

    const rates =
        await fetchLiveRates();


    let totalValue = 0;


    for (const item of cart.items) {

        const product =
            await Product.findOne({
                productID:
                    normalizeProductId(
                        item.productId
                    )
            });


        if (!product) continue;


        const price =
            computeMetalPrice(
                product.metal,
                product.weight,
                rates
            );


        totalValue +=
            price *
            item.quantity;

    }


    cart.totalValue =
        Math.max(
            0,
            totalValue
        );


    await cart.save();


    return cart;

};


/* =========================================================
   GET CART
========================================================= */

const getCart = async (
    userId
) => {

    const cart =
        await Cart.findOne({
            userId
        });


    if (!cart) {

        return {

            cartItems: [],

            cartValue: 0

        };

    }


    const productIds =
        cart.items.map(
            (item) =>
                normalizeProductId(
                    item.productId
                )
        );


    const products =
        await Product.find({

            productID: {
                $in: productIds
            }

        });


    const rates =
        await fetchLiveRates();


    const cartItems =
        cart.items
            .map(
                (item) => {

                    const product =
                        products.find(
                            (p) =>

                                normalizeProductId(
                                    p.productID
                                ) ===

                                normalizeProductId(
                                    item.productId
                                )
                        );


                    /*
                     * Product was deleted from catalogue.
                     * Don't crash the whole cart.
                     */

                    if (!product) {

                        return null;

                    }


                    const price =
                        computeMetalPrice(
                            product.metal,
                            product.weight,
                            rates
                        );


                    return {

                        productId:
                            product.productID,

                        name:
                            product.name,

                        category:
                            product.category,

                        metal:
                            product.metal,

                        image:
                            product.image,

                        weight:
                            product.weight,

                        price,

                        quantity:
                            item.quantity,

                        size:
                            item.size || "",

                        value:
                            price *
                            item.quantity

                    };

                }
            )
            .filter(Boolean);


    /*
     * Always calculate cart value
     * from actual current products.
     */

    const cartValue =
        cartItems.reduce(
            (total, item) =>

                total +
                item.value,

            0
        );


    return {

        cartItems,

        cartValue

    };

};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    addProductToCart,

    updateCartQuantity,

    removeProductFromCart,

    getCart

};