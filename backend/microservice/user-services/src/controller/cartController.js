const cartService = require("../service/cartService.js");

const addProductToCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const productId = req.params.productId;

        const { quantity = 1, size = "" } = req.body;

const cart = await cartService.addProductToCart(
    userId,
    productId,
    quantity,
    size
);

        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    }

    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const updateCartQuantity = async (req, res) => {

    try {

        const userId = req.user.id;

        const productId = req.params.productId;

        const { quantity } = req.body;

        if (quantity === undefined) {

            return res.status(400).json({
                success: false,
                message: "Quantity is required"
            });

        }

        const cart = await cartService.updateCartQuantity(
            userId,
            productId,
            quantity
        );

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            cart
        });

    }

    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const removeProductFromCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const productId = req.params.productId;

       
const { size = "" } = req.body;

const cart = await cartService.removeProductFromCart(
    userId,
    productId,
    size
);
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart
        });

    }

    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const clearCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cart = await cartService.clearCart(userId);

        return res.status(200).json({
            success: true,
            message: "Cart cleared",
            cart
        });

    }

    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

const getCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cart = await cartService.getCart(userId);

        return res.status(200).json({
            success: true,
            cart
        });

    }

    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports= {

    addProductToCart,

    updateCartQuantity,

    removeProductFromCart,

    clearCart,

    getCart

};