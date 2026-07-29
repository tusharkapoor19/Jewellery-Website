const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/prodmidd");
const adminMiddleware = require("../middleware/adminmidd");

const {
addProduct,
getallprodd,
updateProduct,
deleteProduct,
getProductByID,
searchProduct,
getProductByCategory,
reduceStock,
increaseStock
}=require("../controller/productcont");


router.post(
"/add",
authMiddleware,
adminMiddleware,
addProduct
);


router.get(
"/",
getallprodd
);


router.patch(
"/update/:productID",
authMiddleware,
adminMiddleware,
updateProduct
);


router.delete(
"/delete/:productID",
authMiddleware,
adminMiddleware,
deleteProduct
);


router.get(
"/search",
searchProduct
);


router.get(
"/category/:category",
getProductByCategory
);


router.get(
"/:productID",
getProductByID
);


router.patch(
"/internal/reduce-stock",
reduceStock
);


router.patch(
"/internal/increase-stock",
increaseStock
);


module.exports = router;