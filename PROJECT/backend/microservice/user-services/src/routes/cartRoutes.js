import express from "express";
import cartController from "../controller/cartController.js";
import authMidd from "../middleware/authMidd.js";

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

router.get(
    "/get",
    authMidd,
    cartController.getCart
);

export default router;


// console.log("THIS IS DEFINITELY THE CART ROUTES FILE");

// import express from "express";

// const router = express.Router();

// router.get("/test", (req, res) => {
//     res.send("TEST WORKING");
// });

// export default router;