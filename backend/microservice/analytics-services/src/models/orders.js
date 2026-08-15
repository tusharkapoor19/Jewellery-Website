const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    orderID: {
        type: String,
        unique: true
    },

    userID: {
        type: String,
        required: true
    },

    products: [

        {

            productID: String,

            name: String,

            price: Number,

            quantity: Number

        }

    ],

    shippingAddress: {

        fullName: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        landmark: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        country: {
            type: String,
            default: "India"
        },

        pincode: {
            type: String,
            default: ""
        }

    },

    deliveryMethod: {

        type: String,

        enum: [

            "standard",

            "express"

        ],

        default: "standard"

    },

    giftBox: {

        type: Boolean,

        default: false

    },

    giftWrap: {

        type: Boolean,

        default: false

    },

    hideInvoice: {

        type: Boolean,

        default: false

    },

    giftMessage: {

        type: String,

        default: ""

    },

    notes: {

        type: String,

        default: ""

    },

    subtotal: {

        type: Number,

        default: 0

    },

    shippingCharge: {

        type: Number,

        default: 0

    },

    discount: {

        type: Number,

        default: 0

    },

    gst: {

        type: Number,

        default: 0

    },

    totalAmount: {

        type: Number,

        required: true

    },

    orderStatus: {

        type: String,

        enum: [

            "Pending",

            "Payment Pending",

            "Confirmed",

            "Packed",

            "Shipped",

            "Out For Delivery",

            "Delivered",

            "Cancelled",

            "Refunded"

        ],

        default: "Pending"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("orders", orderSchema);
