import jwt from "jsonwebtoken";

// Verifies the Bearer token issued by auth-services on login. Any route
// that needs to know *who* is calling (admin-only actions) uses this
// before adminMidd.js.
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Access denied. No token provided.");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

export default authMiddleware;
