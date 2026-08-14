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
    required: false,
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
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
  },
});

export default mongoose.model("User", userSchema);