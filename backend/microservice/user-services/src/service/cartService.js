const Cart = require ("../models/cart.js");
const Product = require("../models/product.js");

const addProductToCart = async (userId, productId, quantity = 1) => {

    const product = await Product.findOne({
        productID: productId
    });

    if (!product) {
        throw new Error("Product not found");
    }
    if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
}

    let cart = await Cart.findOne({
        userId
    });

    if (!cart) {

        cart = new Cart({
            userId,
            items: [],
            totalValue: 0
        });

    }

    const existingProduct = cart.items.find(
        (item) => item.productId === productId
    );

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.items.push({
            productId,
            quantity
        });

    }

    cart.totalValue += product.price * quantity;

    if (cart.totalValue < 0) {
        cart.totalValue = 0;
    }

    await cart.save();

    return cart;

};
const updateCartQuantity = async (
    userId,
    productId,
    quantity
) => {

    const product = await Product.findOne({
        productID: productId
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const cart = await Cart.findOne({
        userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const cartItem = cart.items.find(
        (item) => item.productId === productId
    );

    if (!cartItem) {
        throw new Error(
            "Product not found in cart"
        );
    }

    if (quantity < 1) {

        cart.totalValue -=
            product.price * cartItem.quantity;

        cart.items = cart.items.filter(
            (item) =>
                item.productId !== productId
        );

    }

    else {

        const quantityDifference =
            quantity - cartItem.quantity;

        cartItem.quantity = quantity;

        cart.totalValue +=
            product.price *
            quantityDifference;

    }

    if (cart.totalValue < 0) {

        cart.totalValue = 0;

    }

    await cart.save();

    return cart;

};
const removeProductFromCart = async (
    userId,
    productId
) => {

    const product = await Product.findOne({
        productID: productId
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const cart = await Cart.findOne({
        userId
    });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const cartItem = cart.items.find(
        (item) => item.productId === productId
    );

    if (!cartItem) {
        throw new Error(
            "Product not found in cart"
        );
    }

    cart.totalValue -=
        product.price * cartItem.quantity;

    if (cart.totalValue < 0) {
        cart.totalValue = 0;
    }

    cart.items = cart.items.filter(
        (item) =>
            item.productId !== productId
    );

    await cart.save();

    return cart;

};
const getCart = async (userId) => {

    const cart = await Cart.findOne({
        userId
    });

    if (!cart) {

        return {
            cartItems: [],
            cartValue: 0
        };

    }

    const productIds = cart.items.map(
        (item) => item.productId
    );

    const products = await Product.find({
        productID: {
            $in: productIds
        }
    });

    const cartItems = cart.items.map((item) => {

        const product = products.find(
            (p) => p.productID === item.productId
        );

        if (!product) return null;

        return {

            productId: product.productID,

            name: product.name,

            category: product.category,

            image: product.image,

            weight: product.weight,

            price: product.price,

            quantity: item.quantity,

            value: product.price * item.quantity

        };

    }).filter(Boolean);

    const cartValue = cartItems.reduce(

    (total, item) => total + item.value,

    0

);

return {

    cartItems,

    cartValue

};

};

module.exports= {

    addProductToCart,

    updateCartQuantity,

    removeProductFromCart,

    getCart

};