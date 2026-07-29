import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        items: [
            {
                productId: {
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1
                }
            }
        ],

        totalValue: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;