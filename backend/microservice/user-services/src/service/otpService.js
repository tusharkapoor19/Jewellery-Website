const User = require("../models/users.js");
const nodemail = require("nodemailer");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// =====================================================
// SEND SMS
// =====================================================

const sendOTP = async ({ to, message }) => {
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


// =====================================================
// SEND PHONE OTP
// =====================================================

const sendPhoneOtp = async (userId, newPhone) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!newPhone) {
        throw new Error("Phone number is required");
    }

    // Remove spaces, dashes etc.
    let phone = newPhone.toString().trim().replace(/\D/g, "");

    // Allow +91XXXXXXXXXX as well as 10 digit number
    if (phone.startsWith("91") && phone.length === 12) {
        phone = phone.substring(2);
    }

    // Validate Indian mobile number
    if (!/^[6-9]\d{9}$/.test(phone)) {
        throw new Error("Enter a valid Indian mobile number");
    }

    // Check if phone already belongs to another user
    const existingPhone = await User.findOne({
        phone: phone,
        _id: { $ne: userId },
    });

    if (existingPhone) {
        throw new Error("Phone number already registered");
    }

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();

    const sms = await sendOTP({
        to: `+91${phone}`,
        message: `Your HIRANYA verification OTP is ${otp}. It is valid for 5 minutes.`,
    });

    if (!sms.success) {
        throw new Error(sms.message);
    }

    console.log("=================================");
    console.log("PHONE OTP");
    console.log("USER :", userId);
    console.log("PHONE :", phone);
    console.log("OTP :", otp);
    console.log("=================================");

    return {
        success: true,
        message: "OTP sent successfully",
    };
};


// =====================================================
// VERIFY PHONE OTP + UPDATE PHONE
// =====================================================

const verifyPhoneOtp = async (userId, otp, newPhone) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
        throw new Error("OTP expired");
    }

    if (user.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    if (!newPhone) {
        throw new Error("Phone number is required");
    }

    let phone = newPhone.toString().trim().replace(/\D/g, "");

    if (phone.startsWith("91") && phone.length === 12) {
        phone = phone.substring(2);
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
        throw new Error("Invalid mobile number");
    }

    // Check again before saving
    const existingPhone = await User.findOne({
        phone: phone,
        _id: { $ne: userId },
    });

    if (existingPhone) {
        throw new Error("Phone number already registered");
    }

    user.phone = phone;
    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = true;

    await user.save();

    return {
        success: true,
        message: "Phone number updated successfully",
        phone: user.phone,
    };
};


// =====================================================
// SEND EMAIL
// =====================================================

const sendmail = async (maildata) => {

    const { receiver, otp } = maildata;

    const transporter = nodemail.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailop = {
        from: process.env.EMAIL,
        to: receiver,
        subject: "HIRANYA Jewellery - Email Verification",

        html: `
            <h2>HIRANYA Jewellery</h2>

            <p>Your OTP to update your email is:</p>

            <h1>${otp}</h1>

            <p>Valid for 5 minutes.</p>
        `,
    };

    await transporter.sendMail(mailop);

    return {
        message: "OTP sent successfully",
    };
};


// =====================================================
// SEND EMAIL OTP
// =====================================================

const sendEmailOtp = async (userId, newEmail) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!newEmail) {
        throw new Error("New email is required");
    }

    const email = newEmail.toLowerCase().trim();

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Enter a valid email address");
    }

    // Check whether email already belongs to another user
    const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;

    await user.save();

    await sendmail({
        receiver: email,
        otp,
    });

    console.log("=================================");
    console.log("EMAIL OTP");
    console.log("USER :", userId);
    console.log("NEW EMAIL :", email);
    console.log("OTP :", otp);
    console.log("=================================");

    return {
        success: true,
        message: "OTP sent successfully",
    };
};


// =====================================================
// VERIFY EMAIL OTP + UPDATE EMAIL
// =====================================================

const verifyEmailOtp = async (userId, otp, newEmail) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
        throw new Error("OTP expired");
    }

    if (user.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    if (!newEmail) {
        throw new Error("New email is required");
    }

    const email = newEmail.toLowerCase().trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email address");
    }

    // Check again before update
    const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    user.email = email;
    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = true;

    await user.save();

    return {
        success: true,
        message: "Email updated successfully",
        email: user.email,
    };
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    sendPhoneOtp,
    verifyPhoneOtp,
    sendEmailOtp,
    verifyEmailOtp,
};