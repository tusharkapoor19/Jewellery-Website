const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    paymentID: {

        type: String,

        unique: true

    },

    orderID: {

        type: String,

        required: true,

        unique: true

    },

    userID: {

        type: mongoose.Schema.Types.ObjectId,

        required: true

    },

    amount: {

        type: Number,

        required: true

    },

    paymentMethod: {

        type: String,

        enum: [

            "UPI",

            "Card",

            "NetBanking",

            "Wallet"

        ],

        default: "UPI"

    },

    paymentStatus: {

        type: String,

        enum: [

            "Pending",

            "Success",

            "Failed",

            "Refunded"

        ],

        default: "Pending"

    },

    razorpayOrderID: {

        type: String

    },

    razorpayPaymentID: {

        type: String

    },

    razorpaySignature: {

        type: String

    },

    refundID: {

        type: String

    }

},

{

    timestamps: true

});

module.exports = mongoose.model(

    "Payment",

    paymentSchema

);