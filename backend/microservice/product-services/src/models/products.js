const db = require("../config/db.js")
const mongoose = require("mongoose");
db()

const productSchema = new mongoose.Schema(
{
    productID: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: String,
        required: true
    },

    collection: {
        type: String,
        required: true
    },

    metal: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    // NOTE: price is intentionally NOT stored anymore.
    // It is computed on-the-fly (per request) from live gold/silver rates
    // and the product's weight/metal — see utils/liveRates.js.

    weight: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true,
        default:0
    },

    image: {
        type: String
    },

    images: [
        {
            type:String
        }
    ],

    certification: {
        type:String
    },
    // ================= Size =================
    sizeType: {
        type: String,
        enum: [
            "None",
            "Ring",
            "Bangle",
            "Bracelet",
            "Chain",
            "Anklet"
        ],
        default: "None"
    },

    availableSizes: [
        {
            type: String
        }
    ]

},
{
    timestamps: true
});

module.exports = mongoose.model("products", productSchema);