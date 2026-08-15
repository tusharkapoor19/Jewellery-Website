const express= require("express");
const cartController = require ("../controller/cartController.js")
const authMidd = require ("../middleware/authMidd.js");
const router = express.Router();



router.post(
    "/add/:productId",
    authMidd,
    cartController.addProductToCart
);

router.patch(
    "/update/:productId",
    authMidd,
    cartController.updateCartQuantity
);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Cart route working"
    });
});

// router.post(
//     "/add/:productId",
//     (req, res, next) => {
//         console.log("POST /cart/add HIT");
//         next();
//     },
//     authMidd,
//     cartController.addProductToCart
// );

router.delete(
    "/remove/:productId",
    authMidd,
    cartController.removeProductFromCart
);

router.delete(
    "/clear",
    authMidd,
    cartController.clearCart
);

router.get(
    "/get",
    authMidd,
    cartController.getCart
);

module.exports = router;


// console.log("THIS IS DEFINITELY THE CART ROUTES FILE");

// import express from "express";

// const router = express.Router();

// router.get("/test", (req, res) => {
//     res.send("TEST WORKING");
// });

// export default router;