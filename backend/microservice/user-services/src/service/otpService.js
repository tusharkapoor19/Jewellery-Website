const User = require("../models/users.js")
const nodemail = require("nodemailer")
const twilio = require("twilio")
const dotenv = require("dotenv")
const path = require("path")
const { fileURLToPath } = require("url")

dotenv.config();

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// send sms
const sendOTP = async ({to, message}) => {
    try {

        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });

        return {
            success: true,
            sid: response.sid,
            status: response.status,
            message: "SMS sent successfully",
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};


// send phn otp
const sendPhoneOtp = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.phone) {
        throw new Error("Phone number not found");
    }

    let phone = user.phone.toString().trim();

    // Remove spaces, dashes etc.
    phone = phone.replace(/\D/g, "");

    // Validate Indian mobile number
    if (!/^[6-9]\d{9}$/.test(phone)) {
        throw new Error("Invalid mobile number");
    }

    // Convert to E.164 for Twilio
    phone = `+91${phone}`;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();

    const sms = await sendOTP({
        to: phone,
        message: `Your HIRANYA verification OTP is ${otp}. It is valid for 5 minutes.`
    });

    if (!sms.success) {
        throw new Error(sms.message);
    }

    console.log("=================================");
    console.log("SMS SENT TO :", phone);
    console.log("OTP :", otp);
    console.log("Twilio :", sms);
    console.log("=================================");

    return {
        success: true,
        message: "OTP sent successfully"
    };
};


// send email
const sendmail = async (maildata) => {
    let { receiver, otp } = maildata;

    const transporter = nodemail.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailop = {
        from: process.env.EMAIL,
        to: receiver,
        subject: "welcome email,",

        html: `
            <h2>Jewellery Store</h2>

             <p>Your OTP to Change Email is:</p>

            <h1>${otp}</h1>

             <p>Valid for 5 minutes.</p>
             `
    };


    let mailsend = await transporter.sendMail(mailop)
    return {
        message: "OTP sent successfully"
    }

}


// send email otp
const sendEmailOtp = async (userId) => {

    console.log("Recieved: ", userId)
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
        const error = new Error("User not Found");
        error.statusCode = 404;
        throw error;
    }
    
    const email = user.email
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();


    await sendmail({
        receiver: email,
        otp: otp
    });

    return {
        message: "OTP sent successfully"
    };
};


// verify phn otp
const verifyPhoneOtp = async (userId, otp) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.otpExpiry < new Date()) {
        throw new Error("OTP expired");
    }

    if (user.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    user.isOtpVerified = true;

    user.logotp = user.otp;

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return {
        success: true,
        message: "OTP verified successfully"
    };

};


// verify Email otp
const verifyEmailOtp = async (userId, otp) => {

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.otpExpiry < new Date()) {
        const error = new Error("OTP Expired");
        error.statusCode = 400;
        throw error;
    }

    if (user.otp !== otp) {
        const error = new Error("Invalid OTP");
        error.statusCode = 400;
        throw error;
    }

    user.isOtpVerified = true;

    await user.save();

    return {
        message: "OTP verified successfully"
    };
};

module.exports= {
    sendPhoneOtp,
    sendEmailOtp,
    verifyPhoneOtp,
    verifyEmailOtp
};