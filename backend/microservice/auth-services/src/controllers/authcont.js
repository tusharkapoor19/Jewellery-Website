const User = require("../models/users");
const jwt = require("jsonwebtoken");
const authsvc = require("../service/service");
const nodemail = require("nodemailer");

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

// GOOGLE LOGIN
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

const profile = (req, res, next) => {
    res.status(200).json({
        message: "Welcome",
        user: req.user,
    });
};

const sendOtp = async (req, res, next) => {
    try {
        console.log(req.body);

        const result = await authsvc.sendOtp(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const result = await authsvc.verifyOtp(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const result = await authsvc.resetPassword(req.body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const createadmin = async (req, res, next) => {
    try {
        const result = await authsvc.createadmin(req.body, req.user);

        res.status(200).json({
            message: "created successfulyy"
        });
    } catch (error) {
        next(error);
    }
};

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

const verifyLogOtp = async (req, res, next) => {
    try {
        const { token, name } = await authsvc.verifyLogOtp(req.body);

        res.status(200).json({
            message: "login successfully",
            token,
            name
        });
    } catch (error) {
        next(error);
    }
};

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
    verifyLogOtp
};