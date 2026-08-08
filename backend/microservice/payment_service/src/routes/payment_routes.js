const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/payment_midd");
const {createPayment,verifyPayment,getPaymentByID,getMyPayments,getPaymentByOrderID,refundPayment}= require("../controller/paymentcont");





router.post("/create",authMiddleware,createPayment);
router.post("/verify", authMiddleware, verifyPayment);
router.get("/my/payments", authMiddleware, getMyPayments);
router.get("/order/:orderID", authMiddleware, getPaymentByOrderID);
router.get("/:paymentID", authMiddleware, getPaymentByID);
router.post("/internal/refund/:orderID",refundPayment
);

module.exports = router;