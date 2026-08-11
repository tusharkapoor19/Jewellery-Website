const otpService = require("../service/otpService.js");

// =====================================================
// SEND PHONE OTP
// =====================================================

const sendPhoneOtp = async (req, res) => {
    try {
        const { newPhone } = req.body;

        const result = await otpService.sendPhoneOtp(
            req.user.id,
            newPhone
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// VERIFY PHONE OTP
// =====================================================

const verifyPhoneOtp = async (req, res) => {
    try {
        const { otp, newPhone } = req.body;

        const result = await otpService.verifyPhoneOtp(
            req.user.id,
            otp,
            newPhone
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// SEND EMAIL OTP
// =====================================================

const sendEmailOtp = async (req, res) => {
    try {
        const { newEmail } = req.body;

        const result = await otpService.sendEmailOtp(
            req.user.id,
            newEmail
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// =====================================================
// VERIFY EMAIL OTP
// =====================================================

const verifyEmailOtp = async (req, res) => {
    try {
        const { otp, newEmail } = req.body;

        const result = await otpService.verifyEmailOtp(
            req.user.id,
            otp,
            newEmail
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    sendPhoneOtp,
    verifyPhoneOtp,
    sendEmailOtp,
    verifyEmailOtp
};