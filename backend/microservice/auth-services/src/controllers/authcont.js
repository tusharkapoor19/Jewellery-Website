const User = require("../models/users");
const jwt = require("jsonwebtoken");
const authsvc = require("../service/service");
const nodemail = require("nodemailer");


// =====================================================
// SIGNUP
// =====================================================

const signup = async (req, res, next) => {
    try {

        const user = await authsvc.signup(req.body);

        res.status(201).json({
            message: "User created successfully",
            user,
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res, next) => {
    try {

        const { token, name } = await authsvc.login(req.body);

        res.status(200).json({
            message: "user found",
            token,
            name
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// GOOGLE LOGIN
// =====================================================

const googleLogin = async (req, res, next) => {
    try {

        const { token, name } = await authsvc.googleLogin(req.body);

        res.status(200).json({
            message: "Google login successful",
            token,
            name
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// SEND MAIL
// =====================================================

const sendmail = async (req, res, next) => {
    try {

        const result = await authsvc.sendmail(req.body);

        res.status(200).json({
            message: "mail sent",
            result,
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// PROFILE
// =====================================================

const profile = (req, res, next) => {

    res.status(200).json({
        message: "Welcome",
        user: req.user,
    });

};


// =====================================================
// SEND OTP
// =====================================================

const sendOtp = async (req, res, next) => {
    try {

        console.log(req.body);

        const result = await authsvc.sendOtp(req.body);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// VERIFY OTP
// =====================================================

const verifyOtp = async (req, res, next) => {
    try {

        const result = await authsvc.verifyOtp(req.body);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res, next) => {
    try {

        const result = await authsvc.resetPassword(req.body);

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// CREATE ADMIN
// =====================================================

const createadmin = async (req, res, next) => {
    try {

        const result = await authsvc.createadmin(
            req.body,
            req.user
        );

        res.status(200).json({
            message: "created successfulyy"
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// SEND LOGIN OTP
// =====================================================

const sendLogOtp = async (req, res, next) => {
    try {

        const log = await authsvc.sendLogOtp(req.body);

        res.status(200).json({
            message: "sent otp",
            log
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// VERIFY LOGIN OTP
// =====================================================

const verifyLogOtp = async (req, res, next) => {
    try {

        const { token, name } =
            await authsvc.verifyLogOtp(req.body);

        res.status(200).json({
            message: "login successfully",
            token,
            name
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// SEND PHONE OTP
// =====================================================

const sendPhoneOtp = async (req, res, next) => {
    try {

        const { newPhone } = req.body;

        const userId = req.user.id;

        const result = await authsvc.sendPhoneOtp(
            userId,
            newPhone
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// VERIFY PHONE OTP + UPDATE PHONE
// =====================================================

const verifyPhoneOtp = async (req, res, next) => {
    try {

        const {
            otp,
            newPhone
        } = req.body;

        const userId = req.user.id;

        const result = await authsvc.verifyPhoneOtp(
            userId,
            otp,
            newPhone
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// SEND EMAIL OTP
// =====================================================

const sendEmailOtp = async (req, res, next) => {
    try {

        const { newEmail } = req.body;

        const userId = req.user.id;

        const result = await authsvc.sendEmailOtp(
            userId,
            newEmail
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// VERIFY EMAIL OTP + UPDATE EMAIL
// =====================================================

const verifyEmailOtp = async (req, res, next) => {
    try {

        const {
            otp,
            newEmail
        } = req.body;

        const userId = req.user.id;

        const result = await authsvc.verifyEmailOtp(
            userId,
            otp,
            newEmail
        );

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {

    signup,
    login,
    googleLogin,

    profile,

    sendmail,

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
    verifyEmailOtp,
};