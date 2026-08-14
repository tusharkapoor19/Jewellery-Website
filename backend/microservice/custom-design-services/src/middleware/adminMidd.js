import User from "../models/users.js";

// Reuses the existing admin account system (the same "role": "admin" users
// managed from the Customers tab of the main admin dashboard) instead of a
// separate custom-design admin login.
const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await User.findById(req.user.id).select("role");

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default adminMiddleware;
