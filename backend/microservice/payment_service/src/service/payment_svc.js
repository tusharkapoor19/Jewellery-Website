const Payment = require("../models/payment");
const razorpay = require("../utils/razorpay");
const axios = require("axios");
const crypto = require("crypto");
const orderClient = require("../utils/orderclient");



const createPayment = async (userID,orderID,token) => {                                                           // CREATE PAYMENT                                  

    const response = await axios.get(
        `http://localhost:5003/orders/${orderID}`,
        {
            headers: {
                Authorization: token
            }
        }
    );

    const order = response.data.order;
    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    /*
     * orderID is unique on the Payment collection. If the user
     * already started a payment for this order once (e.g. they
     * opened Razorpay, cancelled/dismissed it, and are now
     * hitting "Retry Payment" on the same order), a Payment
     * document for this orderID already exists. Blindly calling
     * Payment.create() again would violate that unique index
     * (Mongo E11000) and — since that error has no statusCode —
     * surface to the client as a raw, unhelpful 500.
     *
     * Instead, reuse that existing document: if it hasn't been
     * paid yet, refresh it with a brand-new Razorpay order so
     * the retry can proceed. If it was already paid, block the
     * duplicate payment with a clear message.
     */
    const existingPayment = await Payment.findOne({
        orderID: order.orderID
    });

    if (
        existingPayment &&
        existingPayment.paymentStatus === "Success"
    ) {
        const error = new Error(
            "This order has already been paid for."
        );
        error.statusCode = 400;
        throw error;
    }

    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: String(
            order.orderID || order._id
        )

    });

    let payment;

    if (existingPayment) {
        existingPayment.amount = order.totalAmount;
        existingPayment.razorpayOrderID = razorpayOrder.id;
        existingPayment.paymentStatus = "Pending";
        existingPayment.razorpayPaymentID = undefined;
        existingPayment.razorpaySignature = undefined;

        payment = await existingPayment.save();
    } else {
        payment = await Payment.create({
            paymentID: `PAY-${Date.now()}`,
            orderID: order.orderID,
            userID,
            amount: order.totalAmount,
            razorpayOrderID: razorpayOrder.id,
            paymentStatus: "Pending"
        });
    }

    return {
        payment,
        razorpayOrder
    };
};

/* -------------------------------- */
/* Verify Payment                   */
/* -------------------------------- */

const verifyPayment = async (paymentData) => {                                                                                // VERIFY PAYMENT        
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = paymentData;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        ).update(
            `${razorpay_order_id}|${razorpay_payment_id}`
        ).digest("hex");

    if (generatedSignature !==razorpay_signature

    ) {

        const error = new Error(
            "Invalid payment signature"
        );
        error.statusCode = 400;
        throw error;

    }
    const payment = await Payment.findOne({
        razorpayOrderID:
            razorpay_order_id
    });

    if (!payment) {
        const error = new Error(
            "Payment not found"

        );

        error.statusCode = 404;

        throw error;

    }

    payment.paymentStatus = "Success";

    payment.razorpayPaymentID =

        razorpay_payment_id;

    payment.razorpaySignature =

        razorpay_signature;

    // updated for notification service
    await payment.save();

    /*
     * Record that the order was actually paid for (paymentStatus),
     * WITHOUT touching orderStatus — orderStatus stays "Pending"
     * by default and is only ever moved forward by an admin. This
     * is only used so the UI can tell a genuinely-paid order apart
     * from one that was cancelled before payment ever completed
     * (e.g. no false "refund" messaging for an order nobody paid
     * for). This is a service-to-service call, so it hits the
     * unauthenticated /internal route rather than the normal
     * user-authenticated order routes.
     */

    try {

        await orderClient.patch(
            "/internal/mark-paid",
            {
                orderID: payment.orderID
            }
        );

        console.log(
            "Order marked as paid:",
            payment.orderID
        );

    } catch (err) {

        console.log(
            "Failed to mark order as paid:",
            err.message
        );

    }

console.log("Payment Object:");
console.log(payment);

console.log("UserID:", payment.userID);

const notificationData = {
    userId: String(payment.userID),
    title: "Payment Successful",
    message: `Your payment of ₹${payment.amount} was successful.`
};

console.log("Notification Data:");
console.log(notificationData);
try {

    await axios.post(
        "http://localhost:5007/notifications",
        {
            userId: payment.userID,
            title: "Payment Successful 💳",
            message: `Your payment of ₹${payment.amount} was completed successfully.`
        }
    );

    console.log("Payment Notification Created");

} catch (err) {

    console.log("Notification Error:", err.message);

}

return payment;

};

/* -------------------------------- */
/* Get Payment By Payment ID        */
/* -------------------------------- */

const getPaymentByID = async (paymentID) => {                                                       // GET PAYMENT BY PAYMENT ID

    const payment = await Payment.findOne({paymentID});

    if (!payment) {
        const error = new Error(
            "Payment not found"
        );

        error.statusCode = 404;
        throw error;
    }
    return payment;
};

/* -------------------------------- */
/* Get Logged In User Payments      */
/* -------------------------------- */

const getMyPayments = async (userID) => {                                                       // GET LOGGED IN USER PAYMENTS      

    return await Payment.find({userID}).sort({createdAt: -1});
};

/* -------------------------------- */
/* Get Payment By Order ID          */
/* -------------------------------- */

const getPaymentByOrderID = async (orderID) => {                                    // GET PAYMENT BY ORDER ID

    const payment = await Payment.findOne({
orderID});

    if (!payment) {
        const error = new Error(
            "Payment not found"
        );

        error.statusCode = 404;
        throw error;
    }
    return payment;
};



const refundPayment = async (                                                                            // REFUND PAYMENT
    orderID
) => {
    const payment = await Payment.findOne({
        orderID
    });
    if (!payment) {
        const error = new Error(
            "Payment not found"
        );
        error.statusCode = 404;
        throw error;
    }
    if (
        payment.paymentStatus !==
        "Success"
    ) {
        const error = new Error(
            "Only successful payments can be refunded"
        );
        error.statusCode = 400;
        throw error;
    }
    const refund =
        await razorpay.payments.refund(
            payment.razorpayPaymentID,
            {
                amount:
                    payment.amount * 100
            }
        );
    payment.paymentStatus =
        "Refunded";
    payment.refundID = refund.id;
    await payment.save();
    return payment;
};




module.exports = {                                          // EXPORTS
    createPayment,
    verifyPayment,
    getPaymentByID,
    getMyPayments,
    getPaymentByOrderID,
    refundPayment
};