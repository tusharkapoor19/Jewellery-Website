const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemail = require("nodemailer");

require("dotenv").config();

// =====================
// SIGNUP
// =====================
const signup = async (userData) => {
  userData.email = userData.email.toLowerCase();

  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  const user = await User.create(userData);
  return user;
};

// =====================
// NORMAL LOGIN
// =====================
const login = async (loginData) => {
  const email = loginData.email.toLowerCase();
  const password = loginData.password;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid Password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    name: user.name,
  };
};

// =====================
// SEND MAIL
// =====================
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
    subject: "HIRANYA OTP Verification",
    html: `
      <h2>HIRANYA Jewellery</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes.</p>
    `,
  };

  await transporter.sendMail(mailop);

  return {
    message: "OTP sent successfully",
  };
};

// =====================
// FORGOT PASSWORD OTP SEND
// =====================
const sendOtp = async (mailData) => {
  const email = mailData.email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  user.isOtpVerified = false;

  await user.save();

  await sendmail({
    receiver: email,
    otp: otp,
  });

  return {
    message: "OTP sent successfully",
  };
};

// =====================
// FORGOT PASSWORD OTP VERIFY
// =====================
const verifyOtp = async (otpData) => {
  const email = otpData.email.toLowerCase();
  const otp = otpData.otp;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.otp !== otp) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiry < new Date()) {
    const error = new Error("OTP Expired");
    error.statusCode = 400;
    throw error;
  }

  user.isOtpVerified = true;
  await user.save();

  return {
    message: "OTP verified successfully",
  };
};

// =====================
// LOGIN OTP SEND
// =====================
const sendLogOtp = async (mailData) => {
  const email = mailData.email.toLowerCase();

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.logotp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  await sendmail({
    receiver: email,
    otp: otp,
  });

  return {
    message: "Login OTP sent successfully",
  };
};

// =====================
// LOGIN OTP VERIFY
// =====================
const verifyLogOtp = async (otpData) => {
  const email = otpData.email.toLowerCase();
  const otp = otpData.otp;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.logotp !== otp) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiry < new Date()) {
    const error = new Error("OTP Expired");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  user.logotp = null;
  user.otpExpiry = null;

  await user.save();

  return {
    message: "Login successful",
    token,
    name: user.name,
  };
};

module.exports = {
  signup,
  login,
  sendmail,
  sendOtp,
  verifyOtp,
  sendLogOtp,
  verifyLogOtp,
};