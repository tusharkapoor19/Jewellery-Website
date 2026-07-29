import express from "express"

const router = express.Router();

import profileController from "../controller/profileController.js";
import otpController from "../controller/otpController.js"

import authMidd from "../middleware/authMidd.js"

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


export default router