const User = require("../models/users.js");


const getAllUsers = async () => {

    return await User.find()
        .select("-password -otp -logotp -otpExpiry")
        .sort({ name: 1 });

};

const getUserById = async (id) => {

    const user = await User.findById(id)
        .select("-password -otp -logotp -otpExpiry");

    if (!user) {

        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;

    }

    return user;

};

const updateUser = async (id, data) => {

    const user = await User.findById(id);

    if (!user) {

        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;

    }

    user.name = data.name || user.name;
    user.phone = data.phone || user.phone;
    user.address = data.address || user.address;

    await user.save();

    return user;

};

const deleteUser = async (id) => {

    const user = await User.findById(id);

    if (!user) {

        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;

    }

    await User.findByIdAndDelete(id);

};

const getUserStats = async () => {

    const totalUsers = await User.countDocuments();

    const customers = await User.countDocuments({
        role: "customer"
    });

    const admins = await User.countDocuments({
        role: "admin"
    });

    return {
        totalUsers,
        customers,
        admins
    };

};

module.exports= {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats
};