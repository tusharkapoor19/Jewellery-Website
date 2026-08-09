const User = require("../models/users.js");

const adminMiddleware = async (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        const user = await User.findById(req.user.id).select("role");

        if (!user || user.role !== "admin") {

            return res.status(403).json({
                message: "Admin access only"
            });

        }

        req.user.role = user.role;

        next();

    } catch (error) {

        next(error);

    }

};

module.exports = adminMiddleware;