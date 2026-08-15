const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmidd");
const adminMiddleware = require("../middleware/adminmidd");

const { getMonthlyAnalytics } = require("../controller/analytics_cont");

router.get("/summary", authMiddleware, adminMiddleware, getMonthlyAnalytics);

module.exports = router;
