const express = require("express");

const router = express.Router();

const profileController = require("../controller/profileController.js");
const otpController = require("../controller/otpController.js");

const authMidd = require("../middleware/authMidd.js");


// ================================
// UPDATE NAME
// ================================

router.patch(
    "/name",
    authMidd,
    profileController.updateName
);


// ================================
// UPDATE ADDRESS
// ================================

router.patch(
    "/address",
    authMidd,
    profileController.updateAddress
);


// ================================
// GET ADDRESS
// ================================

router.get(
    "/get-address",
    authMidd,
    profileController.getAddress
);


// ================================
// PASSWORD
// ================================

router.patch(
    "/password",
    authMidd,
    profileController.updatePassword
);


// ================================
// EMAIL
// ================================

router.patch(
    "/email",
    authMidd,
    profileController.updateEmail
);


// ================================
// PHONE
// ================================

router.patch(
    "/phone",
    authMidd,
    profileController.updatePhone
);


// ================================
// DELETE USER
// ================================

router.delete(
    "/delete",
    authMidd,
    profileController.deleteUser
);


// ================================
// GET PROFILE
// ================================

router.get(
    "/profile",
    authMidd,
    profileController.getProfile
);


// =====================================================
// INTERNAL SERVICE ROUTE
// Order Service → User Service
// =====================================================

router.get(
    "/internal/:userId",
    profileController.getProfileById
);


// ================================
// PHONE OTP
// ================================

router.post(
    "/send-phone-otp",
    authMidd,
    otpController.sendPhoneOtp
);

router.post(
    "/verify-phone-otp",
    authMidd,
    otpController.verifyPhoneOtp
);


// ================================
// EMAIL OTP
// ================================

router.post(
    "/send-email-otp",
    authMidd,
    otpController.sendEmailOtp
);

router.post(
    "/verify-email-otp",
    authMidd,
    otpController.verifyEmailOtp
);


module.exports = router;