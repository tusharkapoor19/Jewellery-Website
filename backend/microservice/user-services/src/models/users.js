const mongoose = require("mongoose");

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

    // Local users ke liye password
    // Google users ke liye password nahi hoga
    password: {
        type: String,
        required: false,
    },

    phone: {
        type: String,
    },

    // OTP verify hone tak new phone yahan rahega
    pendingPhone: {
        type: String,
    },

    // OTP verify hone tak new email yahan rahega
    pendingEmail: {
        type: String,
    },

    address: {
        type: String,
        default: "",
    },

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },

    // Google Login
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },

    // Normal OTP
    otp: {
        type: String,
    },

    // Login OTP
    logotp: {
        type: String,
    },

    otpExpiry: {
        type: Date,
    },

    isOtpVerified: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("users", userSchema);