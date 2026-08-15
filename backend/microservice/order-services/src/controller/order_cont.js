const Order = require("../models/orders");
const ordsvc = require("../service/order_svc");

/* -------------------------------- */
/* Create Order                     */
/* -------------------------------- */

const createorder = async (req, res, next) => {

    try {

        console.log("\n==============================");
        console.log("CREATE ORDER REQUEST");
        console.log("==============================");

        console.log("User ID:");
        console.log(req.user.id);

        console.log("Request Body:");
        console.log(JSON.stringify(req.body, null, 2));

        const order = await ordsvc.createorder(

            req.user.id,

            req.body

        );

        console.log("Order Created Successfully:");
        console.log(JSON.stringify(order, null, 2));

        res.status(200).json({

            success: true,

            message: "Order placed successfully",

            order

        });

    }

    catch (error) {

        console.error("\nCREATE ORDER ERROR");
        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Get All Orders                   */
/* -------------------------------- */

const gettallords = async (req, res, next) => {

    try {

        const allorder = await ordsvc.gettallords();

        res.status(200).json({

            success: true,

            message: "All orders retrieved",

            allorder

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Get Order By ID                  */
/* -------------------------------- */

const getorderbyid = async (req, res, next) => {

    try {

        console.log("Fetching Order:", req.params.orderID);

        const order = await ordsvc.getorderbyid(

            req.params.orderID

        );

        res.status(200).json({

            success: true,

            message: "Order retrieved successfully",

            order

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Get My Orders                    */
/* -------------------------------- */

const getMyOrders = async (req, res, next) => {

    try {

        const result = await ordsvc.getMyOrders(

            req.user.id

        );

        res.status(200).json({

            success: true,

            message: "Retrieved your orders",

            ...result

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Update Order Status              */
/* -------------------------------- */

const updateOrderStatus = async (req, res, next) => {

    try {

        const result = await ordsvc.updateOrderStatus(

            req.params.orderID,

            req.body.status

        );

        res.status(200).json({

            success: true,

            message: "Order status updated",

            result

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Cancel Order                     */
/* -------------------------------- */

const cancelOrder = async (req, res, next) => {

    try {

        const change = await ordsvc.cancelOrder(

            req.params.orderID,

            req.user.id

        );

        res.status(200).json({

            success: true,

            message: "Order cancelled successfully",

            order: change

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

/* -------------------------------- */
/* Mark Order Paid (internal)       */
/* -------------------------------- */

const markOrderPaid = async (req, res, next) => {

    try {

        const { orderID } = req.body;

        if (!orderID) {

            return res.status(400).json({

                success: false,

                message: "orderID is required"

            });

        }

        const order = await ordsvc.markOrderPaid(

            orderID

        );

        res.status(200).json({

            success: true,

            message: "Order marked as paid",

            order

        });

    }

    catch (error) {

        console.error(error);

        next(error);

    }

};

module.exports = {

    createorder,

    gettallords,

    getorderbyid,

    getMyOrders,

    updateOrderStatus,

    cancelOrder,

    markOrderPaid

};