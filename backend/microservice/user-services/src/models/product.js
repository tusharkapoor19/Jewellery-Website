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

    // NOTE: price is intentionally NOT stored anymore.
    // It is computed on-the-fly from live gold/silver rates + weight/metal —
    // see utils/liveRates.js. Kept in sync with product-services' schema.

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
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("products", productSchema)
