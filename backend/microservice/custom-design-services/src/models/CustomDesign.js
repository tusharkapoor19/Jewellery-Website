import mongoose from "mongoose";

const customDesignSchema = new mongoose.Schema(
  {
    // Customer Information
    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    // Jewellery Details
    jewellery: {
      type: {
        type: String,
        required: true,
        // Ring, Necklace, Pendant, Earrings...
      },
      category: {
        type: String,
      },
      material: {
        type: String,
        required: true,
        // Gold, Silver, Platinum
      },
      purity: {
        type: String,
        // 14K,18K,22K
      },
      gemstone: [
        {
          name: String,
          quantity: Number,
        },
      ],
      weight: {
        type: Number,
      },
      ringSize: {
        type: String,
      },
      chainLength: {
        type: String,
      },
      braceletSize: {
        type: String,
      },
      style: {
        type: String,
        // Vintage, Minimal, Luxury...
      },
      finish: {
        type: String,
        // Matte, Glossy...
      },
    },
    // Budget Details
    budget: {
      min: Number,
      max: Number,
      estimatedPrice: Number,
    },
    // Uploaded Design
    design: {
      description: {
        type: String,
      },
      referenceImages: [
        {
          imageUrl: String,
          publicId: String,
        },
      ],
      sketchImage: {
        imageUrl: String,
        publicId: String,
      },
    },
    // AI / Price Estimation
    estimation: {
      estimatedWeight: Number,
      makingCharge: Number,
      stoneCost: Number,
      metalCost: Number,
      totalEstimatedCost: Number,
    },
    // Payment
    payment: {
      advanceAmount: Number,
      paymentMethod: String,
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },
      transactionId: String,
      paymentDate: Date,
    },
    // Order Status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Design Review",
        "Quotation Sent",
        "Approved",
        "In Production",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
    // Admin Notes
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CustomDesign", customDesignSchema);
