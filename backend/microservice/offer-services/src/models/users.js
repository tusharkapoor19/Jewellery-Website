import mongoose from "mongoose";

// Shadow of the User model owned by auth-services / user-services. This
// service never writes to the users collection — it only reads the "role"
// field (via adminMidd.js) to confirm the calling Bearer token belongs to
// an admin before allowing offer create/update/delete.
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
});

export default mongoose.model("User", userSchema);
