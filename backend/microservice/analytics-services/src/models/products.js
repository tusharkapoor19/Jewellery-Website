const mongoose = require("mongoose");

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
