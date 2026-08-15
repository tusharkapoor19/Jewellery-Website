const Order = require("../models/orders");
const prodclient = require("../utils/prodclient");

require("dotenv").config();


/* =========================================================
   CREATE ORDER
========================================================= */

const createorder = async (userID, orderdata) => {

    const { products } = orderdata;


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


    let orderID = "ORD001";


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


    order.orderStatus =
        status;


    await order.save();


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

    cancelOrder

};