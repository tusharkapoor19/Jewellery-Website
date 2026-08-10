const Cart = require ("../models/cart.js");
const Product = require("../models/product.js");
const { fetchLiveRates, computeMetalPrice } = require("../utils/liveRates.js");

const addProductToCart = async (userId, productId, quantity = 1, size = "") => {

    const product = await Product.findOne({
        productID: productId
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
    throw new Error("Quantity must be greater than 0");
}
if (quantity > product.stock) {

    throw new Error(
        "Requested quantity exceeds available stock"
    );

}

    const rates = await fetchLiveRates();
    const price = computeMetalPrice(product.metal, product.weight, rates);

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

    (item) =>

        String(item.productId) === String(productId) &&
String(item.size || "").trim() === String(size || "").trim()
);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

       cart.items.push({

    productId,

    quantity,

    size

});

    }

    cart.totalValue += price * quantity;

    if (cart.totalValue < 0) {
        cart.totalValue = 0;
    }

    await cart.save();

    return cart;

};
const updateCartQuantity = async (
    userId,
    productId,
    quantity,
    size = ""
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

    if (!cart) {
        throw new Error("Cart not found");
    }

  const cartItem = cart.items.find(
    (item) =>
        String(item.productId).trim() === String(productId).trim() &&
        String(item.size || "").trim() === String(size || "").trim()
);

    if (!cartItem) {
        throw new Error(
            "Product not found in cart"
        );
    }

    const rates = await fetchLiveRates();
    const price = computeMetalPrice(product.metal, product.weight, rates);

    if (quantity < 1) {

        cart.totalValue -=
            price * cartItem.quantity;

      cart.items = cart.items.filter(
    (item) =>
        !(
            String(item.productId).trim() === String(productId).trim() &&
            String(item.size || "").trim() === String(size || "").trim()
        )
);

    }

    else {

        const quantityDifference =
            quantity - cartItem.quantity;

        cartItem.quantity = quantity;

        cart.totalValue +=
            price *
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

    productId,

    size = ""

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
    (item) =>
        String(item.productId).trim() === String(productId).trim() &&
        String(item.size || "").trim() === String(size || "").trim()
);

    if (!cartItem) {
        throw new Error(
            "Product not found in cart"
        );
    }

    const rates = await fetchLiveRates();
    const price = computeMetalPrice(product.metal, product.weight, rates);

    cart.totalValue -=
        price * cartItem.quantity;

    if (cart.totalValue < 0) {
        cart.totalValue = 0;
    }

   cart.items = cart.items.filter(

(item)=>

!(

item.productId===productId &&

item.size===size

)

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

    const rates = await fetchLiveRates();

    const cartItems = cart.items.map((item) => {

        const product = products.find(
            (p) => p.productID === item.productId
        );

        if (!product) return null;

        const price = computeMetalPrice(product.metal, product.weight, rates);

return {

    productId: product.productID,

    name: product.name,

    category: product.category,

    metal: product.metal,

    image: product.image,

    weight: product.weight,

    price,

    quantity: item.quantity,

    size: item.size,

    value: price * item.quantity

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