const express = require ("express");
const wishlistController = require ("../controller/wishlistController.js");
const authMidd = require ("../middleware/authMidd.js");

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

module.exports=router;