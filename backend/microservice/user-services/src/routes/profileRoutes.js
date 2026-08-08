const express = require("express");
const router = express.Router();

const profileController = require("../controller/profileController.js");
const otpController = require("../controller/otpController.js");

const authMidd = require("../middleware/authMidd.js");

router.patch(
    "/name",
    authMidd,
    profileController.updateName
);

router.patch(
    "/address",
    authMidd,
    profileController.updateAddress
);

router.get(
    "/get-address",
    authMidd,
    profileController.getAddress
);

router.patch(
    "/password",
    authMidd,
    profileController.updatePassword
);

router.patch(
    "/email",
    authMidd,
    profileController.updateEmail
);

router.patch(
    "/phone",
    authMidd,
    profileController.updatePhone
);

router.delete(
    "/delete",
    authMidd,
    profileController.deleteUser
);
router.get(
    "/profile",
    authMidd,
    profileController.getProfile
);

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


module.exports=router