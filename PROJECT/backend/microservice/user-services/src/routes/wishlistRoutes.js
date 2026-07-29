import express from "express";
import wishlistController from "../controller/wishlistController.js";
import authMidd from "../middleware/authMidd.js";

const router = express.Router();

router.post(
    "/add",
    authMidd,
    wishlistController.addProductToWishlist
);

router.delete(
    "/remove",
    authMidd,
    wishlistController.removeProductFromWishlist
);

router.get(
    "/get",
    authMidd,
    wishlistController.getWishlist
);

export default router;