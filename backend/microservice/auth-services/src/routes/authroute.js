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
    verifyLogOtp,

    // PHONE
    sendPhoneOtp,
    verifyPhoneOtp,

    // EMAIL
    sendEmailOtp,
    verifyEmailOtp

} = require("../controllers/authcont");


// =====================================================
// AUTH
// =====================================================

router.post("/signup", signup);

router.post("/login", login);

router.post("/google-login", googleLogin);


// =====================================================
// PROFILE
// =====================================================

router.get(
    "/profile",
    authMiddleware,
    profile
);


// =====================================================
// NORMAL OTP / PASSWORD
// =====================================================

router.post("/sendotp", sendOtp);

router.post("/verifyotp", verifyOtp);

router.post("/resetpassword", resetPassword);


// =====================================================
// ADMIN
// =====================================================

router.patch(
    "/createadmin",
    authMiddleware,
    createadmin
);


// =====================================================
// LOGIN OTP
// =====================================================

router.post("/sendlogotp", sendLogOtp);

router.post("/verifylogotp", verifyLogOtp);


// =====================================================
// PHONE UPDATE
// =====================================================

router.post(
    "/sendphoneotp",
    authMiddleware,
    sendPhoneOtp
);

router.post(
    "/verifyphoneotp",
    authMiddleware,
    verifyPhoneOtp
);


// =====================================================
// EMAIL UPDATE
// =====================================================

router.post(
    "/sendemailotp",
    authMiddleware,
    sendEmailOtp
);

router.post(
    "/verifyemailotp",
    authMiddleware,
    verifyEmailOtp
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;