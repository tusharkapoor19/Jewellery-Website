const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/order_midd");
const adminMiddleware = require("../middleware/admin_midd");

const {createorder,gettallords,getorderbyid,getMyOrders,updateOrderStatus,cancelOrder} = require("../controller/order_cont");


router.post("/create",authMiddleware,createorder);
router.get("/",authMiddleware,adminMiddleware,gettallords);
router.get("/myorders",authMiddleware,getMyOrders)
router.get("/:orderID",authMiddleware,getorderbyid);
router.patch("/:orderID/status",authMiddleware,adminMiddleware,updateOrderStatus);
router.patch("/:orderID/cancel",authMiddleware,cancelOrder);

module.exports = router;