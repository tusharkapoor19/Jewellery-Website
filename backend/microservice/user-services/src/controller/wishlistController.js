const wishlistService = require("../service/wishlistServices.js");

const addProductToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const wishlist = await wishlistService.addProductToWishlist(
            userId,
            productId
        );

        return res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const removeProductFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const wishlist = await wishlistService.removeProductFromWishlist(
            userId,
            productId
        );

        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const wishlist = await wishlistService.getWishlist(userId);

        return res.status(200).json({
            success: true,
            wishlist
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={
    addProductToWishlist,
    removeProductFromWishlist,
    getWishlist
};