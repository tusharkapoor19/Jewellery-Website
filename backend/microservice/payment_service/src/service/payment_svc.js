const Payment = require("../models/payment");
const razorpay = require("../utils/razorpay");
const axios = require("axios");
const crypto = require("crypto");



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
    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100,
        currency: "INR",
        receipt: String(
            order.orderID || order._id
        )

    });

    const payment = await Payment.create({
        paymentID: `PAY-${Date.now()}`,
        orderID: order.orderID,
        userID,
        amount: order.totalAmount,
        razorpayOrderID: razorpayOrder.id,
        paymentStatus: "Pending"
    });

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