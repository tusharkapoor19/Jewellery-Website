const express = require("express");
const adminController = require("../controller/adminController.js");
const authMiddleware = require("../middleware/authMidd.js");
const adminMiddleware = require("../middleware/adminMidd.js");

const router = express.Router();

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    adminController.getAllUsers
);

router.get(
    "/user/:id",
    authMiddleware,
    adminMiddleware,
    adminController.getUserById
);

router.patch(
    "/user/:id",
    authMiddleware,
    adminMiddleware,
    adminController.updateUser
);

router.delete(
    "/user/:id",
    authMiddleware,
    adminMiddleware,
    adminController.deleteUser
);

router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    adminController.getUserStats
);

module.exports=router;