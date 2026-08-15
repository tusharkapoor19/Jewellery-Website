const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/order_midd");
const adminMiddleware = require("../middleware/admin_midd");

const {createorder,gettallords,getorderbyid,getMyOrders,updateOrderStatus,cancelOrder,markOrderPaid} = require("../controller/order_cont");


router.post("/create",authMiddleware,createorder);
router.get("/",authMiddleware,adminMiddleware,gettallords);
router.get("/myorders",authMiddleware,getMyOrders)

/*
 * Internal, service-to-service route (no end-user auth token
 * available here) — called by payment-service right after a
 * payment is verified as successful, purely to record that the
 * customer was actually charged (paymentStatus). This never
 * touches orderStatus, which stays "Pending" by default and is
 * only ever changed by an admin. Mirrors the unauthenticated
 * /internal/* pattern already used by product-service for
 * reduce-stock/increase-stock.
 */
router.patch("/internal/mark-paid",markOrderPaid);

router.get("/:orderID",authMiddleware,getorderbyid);
router.patch("/:orderID/status",authMiddleware,adminMiddleware,updateOrderStatus);
router.patch("/:orderID/cancel",authMiddleware,cancelOrder);

module.exports = router;