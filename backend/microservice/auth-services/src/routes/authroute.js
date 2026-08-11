const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmidd");

const {
    signup,
    login,
    googleLogin,
    profile,
    sendOtp,
    verifyOtp,
    resetPassword,
    createadmin,
    sendLogOtp,
    verifyLogOtp
} = require("../controllers/authcont");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);

router.get("/profile", authMiddleware, profile);

router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/resetpassword", resetPassword);

router.patch("/createadmin", authMiddleware, createadmin);

router.post("/sendlogotp", sendLogOtp);
router.post("/verifylogotp", verifyLogOtp);

module.exports = router;