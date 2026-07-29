import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
    },
  
address: {
    type: String,
    default: ""
},

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    otp: {
        type: String,
    },

    logotp: {
        type: String,
    },


    otpExpiry: {
        type: Date,
    },

    isOtpVerified: {
        type: Boolean,
        default: false,
    }
});

const users = mongoose.model("users", userSchema);

export default users
