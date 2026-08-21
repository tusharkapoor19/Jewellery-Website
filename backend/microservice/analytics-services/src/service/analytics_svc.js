const Order = require("../models/orders");
const Product = require("../models/products");
const User = require("../models/users");

/* ----------------------------------------- */
/* Classify a product's metal string into     */
/* one of the 3 buckets the dashboard tracks  */
/* (Gold covers Gold / White Gold / Rose Gold) */
/* ----------------------------------------- */

const classifyMetal = (metal) => {

    const m = (metal || "").toLowerCase();

    if (m.includes("gold")) return "gold";
    if (m.includes("silver")) return "silver";
    if (m.includes("platinum")) return "platinum";

    return "other";

};

/* ----------------------------------------- */
/* Validate + normalise a "YYYY-MM" string    */
/* ----------------------------------------- */

const parseMonth = (monthStr) => {

    const match = /^(\d{4})-(\d{2})$/.exec(monthStr || "");

    if (!match) {
        const error = new Error("Invalid month. Expected format YYYY-MM");
        error.statusCode = 400;
        throw error;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);

    if (month < 1 || month > 12) {
        const error = new Error("Invalid month. Expected format YYYY-MM");
        error.statusCode = 400;
        throw error;
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    return { startDate, endDate };

};

const getMonthlyAnalytics = async (monthStr) => {

    const { startDate, endDate } = parseMonth(monthStr);

    const orders = await Order.find({
        createdAt: { $gte: startDate, $lt: endDate },
        /*
         * Only count orders that have actually been confirmed by
         * the admin — same "approved" bucket the Pending Orders
         * panel uses (see statusToUi in client/src/api/adapters.ts).
         * Excludes "Pending"/"Payment Pending" (not yet approved)
         * and "Cancelled"/"Refunded" (rejected) — previously only
         * "Cancelled" was excluded, so pending and refunded orders
         * were inflating totalRevenue.
         */
        orderStatus: {
            $in: [
                "Confirmed",
                "Packed",
                "Shipped",
                "Out For Delivery",
                "Delivered"
            ]
        }
    });

    const emptyResult = {
        month: monthStr,
        totalOrders: 0,
        totalRevenue: 0,
        revenueByMetal: { gold: 0, silver: 0, platinum: 0, other: 0 },
        topProducts: [],
        topCustomers: []
    };

    if (orders.length === 0) {
        return emptyResult;
    }

    /* ----------------------------------------- */
    /* Look up each ordered product's metal       */
    /* ----------------------------------------- */

    const productIDs = [
        ...new Set(orders.flatMap((order) => order.products.map((item) => item.productID)))
    ];

    const products = await Product.find({ productID: { $in: productIDs } }).select("productID metal");

    const metalMap = new Map(products.map((p) => [p.productID, p.metal]));

    /* ----------------------------------------- */
    /* Aggregate per-product quantity/revenue and  */
    /* revenue-by-metal in a single pass           */
    /* ----------------------------------------- */

    const productStatsMap = new Map();
    const revenueByMetal = { gold: 0, silver: 0, platinum: 0, other: 0 };

    orders.forEach((order) => {

        order.products.forEach((item) => {

            const lineRevenue = (item.price || 0) * (item.quantity || 0);

            const metalKey = classifyMetal(metalMap.get(item.productID));
            revenueByMetal[metalKey] += lineRevenue;

            const existing = productStatsMap.get(item.productID);

            if (existing) {
                existing.quantity += item.quantity;
                existing.revenue += lineRevenue;
            } else {
                productStatsMap.set(item.productID, {
                    productID: item.productID,
                    name: item.name,
                    quantity: item.quantity,
                    revenue: lineRevenue
                });
            }

        });

    });

    const topProducts = Array.from(productStatsMap.values())
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 3);

    /* ----------------------------------------- */
    /* Aggregate top customers by order count      */
    /* ----------------------------------------- */

    const userIDs = [...new Set(orders.map((order) => order.userID))];

    const users = await User.find({ _id: { $in: userIDs } }).select("name email");

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    const customerStatsMap = new Map();

    orders.forEach((order) => {

        const existing = customerStatsMap.get(order.userID);

        if (existing) {
            existing.orderCount += 1;
            existing.totalSpent += order.totalAmount;
        } else {

            const user = userMap.get(order.userID);

            /*
             * The user account behind order.userID may no longer
             * exist (deleted / re-created with a new _id, or an
             * order created with a stale reference). In that case
             * fall back to the details captured on the order itself
             * at checkout time instead of showing "Unknown customer".
             */
            const fallbackName = order.shippingAddress?.fullName;
            const fallbackContact = order.shippingAddress?.phone;

            customerStatsMap.set(order.userID, {
                userID: order.userID,
                name: user ? user.name : (fallbackName || "Unknown customer"),
                email: user ? user.email : (fallbackContact || "—"),
                orderCount: 1,
                totalSpent: order.totalAmount
            });

        }

    });

    const topCustomers = Array.from(customerStatsMap.values())
        .sort((a, b) => b.orderCount - a.orderCount || b.totalSpent - a.totalSpent)
        .slice(0, 3);

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
        month: monthStr,
        totalOrders: orders.length,
        totalRevenue,
        revenueByMetal,
        topProducts,
        topCustomers
    };

};

module.exports = {
    getMonthlyAnalytics
};