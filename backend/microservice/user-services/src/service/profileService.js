const bcrypt = require ("bcrypt");
const mongoose = require ("mongoose");
const User = require ("../models/users.js");

// Update name
const updateName = async (userId, name) => {

    console.log("Update Name User ID:", userId);

    const user = await User.findById(userId);

    console.log("User:", user);

    if (!user) {
        throw new Error("User not found");
    }

    user.name = name;

    await user.save();

    return {
        success: true,
        message: "Name updated successfully",
        name: user.name
    };
};


// Update Address
const updateAddress = async (userId, address) => {

    console.log("Update Address User ID:", userId);

    const user = await User.findById(userId);

    console.log("User:", user);

    if (!user) {
        throw new Error("User not found");
    }

    user.address = address;

    await user.save();

    return {
        success: true,
        message: "Address updated successfully",
        address: user.address
    };
};


// Get Address
const getAddress = async (userId) => {

    console.log("Get Address User ID:", userId);

    const user = await User.findById(userId);

    console.log("User:", user);

    if (!user) {
        throw new Error("User not found");
    }

    return {
        success: true,
        address: user.address
    };
};


// Get Profile
const getProfile = async (userId) => {

    console.log("========== GET PROFILE ==========");
    console.log("Incoming User ID:", userId);
    console.log("Is Valid ObjectId:", mongoose.Types.ObjectId.isValid(userId));

    const user = await User.findById(userId);

    console.log("Mongo User:", user);
    console.log("================================");

    if (!user) {
        throw new Error("User not found");
    }

    return {
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        }
    };
};


// Update Password
const updatePassword = async (userId, currentPassword, newPassword) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return {
        success: true,
        message: "Password updated successfully"
    };
};


// Update Email
const updateEmail = async (userId, newEmail) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isOtpVerified) {
        throw new Error("Please verify OTP first");
    }

    user.email = newEmail;
    user.isOtpVerified = false;

    await user.save();

    return {
        success: true,
        message: "Email updated successfully",
        email: user.email
    };
};


// Update Phone
const updatePhone = async (userId, newPhone) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isOtpVerified) {
        throw new Error("Please verify OTP first");
    }

    user.phone = newPhone;
    user.isOtpVerified = false;

    await user.save();

    return {
        success: true,
        message: "Phone updated successfully",
        phone: user.phone
    };
};


// Delete User
const deleteUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    await User.findByIdAndDelete(userId);

    return {
        success: true,
        message: "Account deleted successfully"
    };
};

module.exports= {
    updateName,
    updateAddress,
    getAddress,
    getProfile,
    updatePassword,
    updateEmail,
    updatePhone,
    deleteUser
};