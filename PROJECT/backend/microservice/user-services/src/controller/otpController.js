import otpService from "../service/otpService.js"


// send phn otp
const sendPhoneOtp = async (req, res) => {

    try {

        const result = await otpService.sendPhoneOtp(
            req.user.id
        )
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// send email OTP
const sendEmailOtp = async (req, res, next) => {
    
    try {
        // const {userId} = req.body

        const result = await otpService.sendEmailOtp(req.user.id);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}


// verify phn otp
const verifyPhoneOtp = async (req, res) => {

    try {
        const { otp } = req.body;

        const result = await otpService.verifyPhoneOtp(
            req.user.id,
            otp
        )
        res.status(200).json(result);
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


// verify email OTP
const verifyEmailOtp = async (req, res, next) => {
    try {
        const {otp} = req.body
        const result = await otpService.verifyEmailOtp(req.user.id, otp);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }

}

export default {
    sendPhoneOtp,
    sendEmailOtp,
    verifyPhoneOtp,
    verifyEmailOtp
}