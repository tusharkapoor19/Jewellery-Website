const Order = require("../models/orders");
const prodclient = require("../utils/prodclient");
const axios = require("axios");

require("dotenv").config();


/* =========================================================
   CONFIG
========================================================= */

// User Service
const USER_SERVICE_URL =
    process.env.USER_SERVICE_URL ||
    "http://localhost:5005";

// Notification Service
const NOTIFICATION_SERVICE_URL =
    process.env.NOTIFICATION_SERVICE_URL ||
    "http://localhost:5007";


/* =========================================================
   ORDER NOTIFICATION HELPER
========================================================= */

/*
    This function:

    1. Gets user email/name from User Service
    2. Sends notification request to Notification Service
    3. Notification Service handles:
       - In-app notification
       - Email
       - SMS

    IMPORTANT:
    Notification failure will NOT break the order operation.
*/

const sendOrderNotification = async (
    order,
    title,
    message
) => {

    try {

        console.log(
            "\n========================================"
        );

        console.log(
            "ORDER NOTIFICATION"
        );

        console.log(
            "Order ID:",
            order.orderID
        );

        console.log(
            "User ID:",
            order.userID
        );


        /* -----------------------------------------------------
           GET USER DETAILS
        ----------------------------------------------------- */

        const userResponse =
            await axios.get(

                `${USER_SERVICE_URL}/profile/internal/${order.userID}`

            );


        const user =
            userResponse.data?.user;


        if (!user) {

            console.log(
                "User details not found."
            );

            return;

        }


        console.log(
            "User Email:",
            user.email
        );

        console.log(
            "User Phone:",
            user.phone
        );


        /* -----------------------------------------------------
           PHONE

           Prefer shipping phone because that is the
           number entered for this particular order.

           If unavailable, use profile phone.
        ----------------------------------------------------- */

        const phone =
            order.shippingAddress?.phone ||
            user.phone;


        /* -----------------------------------------------------
           SEND TO NOTIFICATION SERVICE
        ----------------------------------------------------- */

        await axios.post(

            `${NOTIFICATION_SERVICE_URL}/notifications`,

            {

                userId:
                    order.userID,

                title,

                message,

                type:
                    "ORDER",

                email:
                    user.email,

                phone,

                userName:
                    user.name

            }

        );


        console.log(
            "Order notification sent successfully."
        );


        console.log(
            "========================================\n"
        );


    }

    catch (error) {

        /*
            VERY IMPORTANT

            If email/SMS/notification service fails,
            order creation/status update should NOT fail.
        */

        console.error(
            "\nORDER NOTIFICATION ERROR:"
        );

        console.error(
            error.response?.data ||
            error.message
        );

        console.log(
            "Order operation will continue normally."
        );

    }

};


/* =========================================================
   CREATE ORDER
========================================================= */

const createorder = async (
    userID,
    orderdata
) => {

    const {
        products
    } = orderdata;


    if (
        !userID ||
        !products ||
        products.length === 0
    ) {

        const error =
            new Error(
                "User ID and products are required"
            );

        error.statusCode = 400;

        throw error;

    }


    /* -----------------------------------------------------
       Generate Order ID
    ----------------------------------------------------- */

    const lastOrder =
        await Order
            .findOne()
            .sort({
                createdAt: -1
            });


    let orderID =
        "ORD001";


    if (lastOrder) {

        const lastNumber =
            parseInt(
                lastOrder.orderID.replace(
                    "ORD",
                    ""
                )
            );


        orderID =
            `ORD${String(
                lastNumber + 1
            ).padStart(3, "0")}`;

    }


    /* -----------------------------------------------------
       Products
    ----------------------------------------------------- */

    let totalAmount = 0;

    const orderedProducts = [];


    for (
        const item of products
    ) {

        const response =
            await prodclient.get(
                `/${item.productID}`
            );


        const product =
            response.data.product;


        orderedProducts.push({

            productID:
                product.productID,

            name:
                product.name,

            price:
                product.price,

            quantity:
                item.quantity

        });


        totalAmount +=
            product.price *
            item.quantity;


        await prodclient.patch(

            "/internal/reduce-stock",

            {

                productID:
                    product.productID,

                quantity:
                    item.quantity

            }

        );

    }


    /* -----------------------------------------------------
       Create Order
    ----------------------------------------------------- */

    const order =
        await Order.create({

            orderID,

            userID,

            products:
                orderedProducts,


            shippingAddress: {

                fullName:
                    orderdata
                        .shippingAddress
                        .fullName,

                phone:
                    orderdata
                        .shippingAddress
                        .phone,

                address:
                    `${orderdata.shippingAddress.houseNumber}, ${orderdata.shippingAddress.street}, ${orderdata.shippingAddress.area}`,

                landmark:
                    orderdata
                        .shippingAddress
                        .landmark,

                city:
                    orderdata
                        .shippingAddress
                        .city,

                state:
                    orderdata
                        .shippingAddress
                        .state,

                country:
                    orderdata
                        .shippingAddress
                        .country ||
                    "India",

                pincode:
                    orderdata
                        .shippingAddress
                        .pincode

            },


            deliveryMethod:
                orderdata.deliveryMethod,

            giftBox:
                orderdata.giftBox,

            giftWrap:
                orderdata.giftWrap,

            hideInvoice:
                orderdata.hideInvoice,

            giftMessage:
                orderdata.giftMessage,

            notes:
                orderdata.notes,

            subtotal:
                orderdata.subtotal,

            shippingCharge:
                orderdata.shippingCharge,

            discount:
                orderdata.discount,

            gst:
                orderdata.gst,

            totalAmount:
                orderdata.totalAmount,

            orderStatus:
                "Pending"

        });


    /* -----------------------------------------------------
       ORDER PLACED NOTIFICATION
    ----------------------------------------------------- */

    await sendOrderNotification(

        order,

        "Order Placed Successfully 🛍️",

        `Your order ${order.orderID} has been placed successfully. We will keep you updated about your order status.`

    );


    return order;

};


/* =========================================================
   GET ALL ORDERS
========================================================= */

const gettallords = async () => {

    const allorders =
        await Order.find();


    if (
        allorders.length === 0
    ) {

        const error =
            new Error(
                "no orders found"
            );

        error.statusCode = 404;

        throw error;

    }


    return {

        totalorder:
            allorders.length,

        allorders

    };

};


/* =========================================================
   GET ORDER BY ID
========================================================= */

const getorderbyid = async (
    orderID
) => {

    console.log(
        "\n================================"
    );

    console.log(
        "GET ORDER BY ID"
    );

    console.log(
        "Received Order ID:",
        orderID
    );

    console.log(
        "================================"
    );


    /* -----------------------------------------------------
       Validate Order ID
    ----------------------------------------------------- */

    if (
        !orderID ||
        typeof orderID !== "string"
    ) {

        const error =
            new Error(
                "Order ID is required"
            );

        error.statusCode = 400;

        throw error;

    }


    /* -----------------------------------------------------
       Clean Order ID
    ----------------------------------------------------- */

    const cleanOrderID =
        orderID.trim();


    console.log(
        "Searching MongoDB for:",
        cleanOrderID
    );


    /* -----------------------------------------------------
       Find Order
    ----------------------------------------------------- */

    const order =
        await Order.findOne({

            orderID:
                cleanOrderID

        }).lean();


    console.log(
        "MongoDB Result:",

        order
            ? "ORDER FOUND"
            : "ORDER NOT FOUND"

    );


    /* -----------------------------------------------------
       Order Not Found
    ----------------------------------------------------- */

    if (!order) {

        const error =
            new Error(
                `Order ${cleanOrderID} not found`
            );

        error.statusCode = 404;

        throw error;

    }


    /* -----------------------------------------------------
       Return Order
    ----------------------------------------------------- */

    return order;

};


/* =========================================================
   GET MY ORDERS
========================================================= */

const getMyOrders = async (
    userID
) => {

    const orders =
        await Order.find({
            userID
        });


    if (
        orders.length === 0
    ) {

        const error =
            new Error(
                "No orders found"
            );

        error.statusCode = 404;

        throw error;

    }


    return {

        totalOrders:
            orders.length,

        orders

    };

};


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

const updateOrderStatus = async (
    orderID,
    status
) => {

    /* -----------------------------------------------------
       Valid Status
    ----------------------------------------------------- */

    const validStatus = [

        "Pending",

        "Confirmed",

        "Shipped",

        "Delivered",

        "Cancelled"

    ];


    if (
        !validStatus.includes(
            status
        )
    ) {

        const error =
            new Error(
                "Invalid order status"
            );

        error.statusCode = 400;

        throw error;

    }


    /* -----------------------------------------------------
       Find Order
    ----------------------------------------------------- */

    const order =
        await Order.findOne({

            orderID

        });


    if (!order) {

        const error =
            new Error(
                "Order not found"
            );

        error.statusCode = 404;

        throw error;

    }


    /* -----------------------------------------------------
       Update Status
    ----------------------------------------------------- */

    order.orderStatus =
        status;


    await order.save();


    /* -----------------------------------------------------
       STATUS NOTIFICATION
    ----------------------------------------------------- */

    const statusNotifications = {

        Confirmed: {

            title:
                "Order Confirmed ✅",

            message:
                `Your order ${order.orderID} has been confirmed. We are now preparing it for shipment.`

        },


        Shipped: {

            title:
                "Order Shipped 🚚",

            message:
                `Your order ${order.orderID} has been shipped and is on its way to you.`

        },


        Delivered: {

            title:
                "Order Delivered 📦",

            message:
                `Your order ${order.orderID} has been delivered successfully. Thank you for shopping with HIRANYA.`

        },


        Cancelled: {

            title:
                "Order Cancelled ❌",

            message:
                `Your order ${order.orderID} has been cancelled.`

        }

    };


    const notification =
        statusNotifications[status];


    if (notification) {

        await sendOrderNotification(

            order,

            notification.title,

            notification.message

        );

    }


    return order;

};


/* =========================================================
   CANCEL ORDER
========================================================= */

const cancelOrder = async (
    orderID,
    userID
) => {

    const order =
        await Order.findOne({
            orderID
        });


    if (!order) {

        const error =
            new Error(
                "Order not found"
            );

        error.statusCode = 404;

        throw error;

    }


    /* -----------------------------------------------------
       Verify User
    ----------------------------------------------------- */

    if (
        order.userID.toString() !==
        userID
    ) {

        const error =
            new Error(
                "You are not allowed to cancel this order"
            );

        error.statusCode = 403;

        throw error;

    }


    /* -----------------------------------------------------
       Cannot cancel shipped/delivered
    ----------------------------------------------------- */

    if (

        order.orderStatus ===
            "Shipped"

        ||

        order.orderStatus ===
            "Delivered"

    ) {

        const error =
            new Error(
                "This order can no longer be cancelled"
            );

        error.statusCode = 400;

        throw error;

    }


    /* -----------------------------------------------------
       Already cancelled
    ----------------------------------------------------- */

    if (
        order.orderStatus ===
        "Cancelled"
    ) {

        const error =
            new Error(
                "Order is already cancelled"
            );

        error.statusCode = 400;

        throw error;

    }


    /* -----------------------------------------------------
       Restore Stock
    ----------------------------------------------------- */

    for (
        const item of order.products
    ) {

        await prodclient.patch(

            "/internal/increase-stock",

            {

                productID:
                    item.productID,

                quantity:
                    item.quantity

            }

        );

    }


    /* -----------------------------------------------------
       Cancel Order
    ----------------------------------------------------- */

    order.orderStatus =
        "Cancelled";


    await order.save();


    /* -----------------------------------------------------
       CANCEL NOTIFICATION
    ----------------------------------------------------- */

    await sendOrderNotification(

        order,

        "Order Cancelled ❌",

        `Your order ${order.orderID} has been cancelled successfully.`

    );


    return order;

};


/* =========================================================
   MARK ORDER AS PAID
   Internal — called by payment-service
========================================================= */

const markOrderPaid = async (
    orderID
) => {

    const order =
        await Order.findOne({
            orderID
        });


    if (!order) {

        const error =
            new Error(
                "Order not found"
            );

        error.statusCode = 404;

        throw error;

    }


    /*
        IMPORTANT:

        Payment service only changes
        paymentStatus.

        It does NOT change orderStatus.
    */

    order.paymentStatus =
        "Paid";


    await order.save();


    return order;

};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    createorder,

    gettallords,

    getorderbyid,

    getMyOrders,

    updateOrderStatus,

    cancelOrder,

    markOrderPaid

};