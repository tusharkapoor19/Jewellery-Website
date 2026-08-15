import mongoose from "mongoose";

// An admin-created coupon offer. The admin decides:
//  - the coupon code the customer types in at checkout
//  - the condition to unlock the discount (minimum cart value)
//  - the discount itself, either a percentage or a flat rupee amount
//  - a description shown to the customer
const offerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "A description is required"],
      trim: true,
    },

    // "percentage" -> discountValue is a % (e.g. 10 = 10% off)
    // "flat"       -> discountValue is a flat rupee amount (e.g. 5000 = ₹5,000 off)
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount value cannot be negative"],
    },

    // Condition: the cart subtotal must be at least this much for the
    // coupon to be usable. 0 means no minimum.
    minCartValue: {
      type: Number,
      default: 0,
      min: [0, "Minimum cart value cannot be negative"],
    },

    // Lets the admin pause/resume an offer without deleting it.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Extra guardrail: a percentage discount should never exceed 100%.
offerSchema.pre("validate", function (next) {
  if (this.discountType === "percentage" && this.discountValue > 100) {
    this.invalidate("discountValue", "Percentage discount cannot exceed 100");
  }
  next();
});

export default mongoose.model("Offer", offerSchema);
