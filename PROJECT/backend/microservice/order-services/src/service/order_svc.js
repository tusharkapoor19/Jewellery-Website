const Order = require("../models/orders");
const jwt = require("jsonwebtoken");
const prodclient = require("../utils/prodclient");
require("dotenv").config();



const createorder = async (userID, orderdata) => {

    const { products } = orderdata;


    if (!userID || !products || products.length === 0) {

        const error = new Error("User ID and products are required");
        error.statusCode = 400;
        throw error;
    }

    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    let orderID = "ORD001";

    if (lastOrder) {

        const lastNumber = parseInt(
            lastOrder.orderID.replace("ORD", "")
        );

        orderID = `ORD${String(lastNumber + 1).padStart(3, "0")}`;

    }

    let totalAmount = 0;

    const orderedProducts = [];

    for (const item of products) {

        const response = await prodclient.get(`/${item.productID}`);

        const product = response.data.product;



        orderedProducts.push({
            productID: product.productID,
            name: product.name,
            price: product.price,
            quantity: item.quantity
        });
        totalAmount += product.price * item.quantity;


        await prodclient.patch("/internal/reduce-stock", {
            productID: product.productID,
            quantity: item.quantity
        });
    }
    const order = await Order.create({

        orderID,

        userID,

        products: orderedProducts,

        totalAmount

    });

    return order;

};


const gettallords = async () => {
    const allorders = await Order.find();

    if (allorders.length === 0) {
        const error = new Error("no orders found");
        error.statusCode = 404;
        throw error;
    }

    return {
        totalorder: allorders.length,
        allorders
    };
}


const getorderbyid = async (orderID) => {     //<----getordertByID

    const order = await Order.findOne({ orderID });

    if (!order) {
        const error = new Error("no order found");
        error.statusCode = 404;
        throw error;
    }

    return order

}

const getMyOrders = async (userID) => {

    const orders = await Order.find({ userID });

    if (orders.length === 0) {
        const error = new Error("No orders found");
        error.statusCode = 404;
        throw error;
    }

    return {
        totalOrders: orders.length,
        orders
    };

};

const updateOrderStatus = async (orderID, status) => {

    const validStatus = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];

    if (!validStatus.includes(status)) {
        const error = new Error("Invalid order status");
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findOne({ orderID });

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    order.orderStatus = status;

    await order.save();

    return order;

};

const cancelOrder = async (orderID, userID) => {

    const order = await Order.findOne({ orderID });

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    if (order.userID.toString() !== userID) {
        const error = new Error("You are not allowed to cancel this order");
        error.statusCode = 403;
        throw error;
    }

    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
        const error = new Error("This order can no longer be cancelled");
        error.statusCode = 400;
        throw error;
    }
    if (order.orderStatus === "Cancelled") {
        const error = new Error("Order is already cancelled");
        error.statusCode = 400;
        throw error;
    }

    for (const item of order.products) {

        await prodclient.patch("/internal/increase-stock", {
            productID: item.productID,
            quantity: item.quantity
        });

    }

    order.orderStatus = "Cancelled";

    await order.save();

    return order
}




module.exports = {
    createorder,
    gettallords,
    getorderbyid,
    getMyOrders,
    updateOrderStatus,
    cancelOrder

};
