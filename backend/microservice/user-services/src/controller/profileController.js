const profileService = require("../service/profileService.js");
const axios = require("axios");

// Update Name
const updateName = async (req, res) => {

    try {

        const userId = req.user.id;

        const { name } = req.body;

        const result = await profileService.updateName(userId, name);

        // ==========================
        // CREATE NOTIFICATION
        // ==========================
        try {

            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,
                    title: "Profile Updated 👤",
                    message: "Your profile name has been updated successfully."
                }
            );

        } catch (err) {

            console.log("Notification Error:", err.message);

        }

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Update Address
const updateAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const { address } = req.body;

        const result = await profileService.updateAddress(userId, address);

        // ==========================
        // CREATE NOTIFICATION
        // ==========================
        try {

            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,
                    title: "Address Updated 📍",
                    message: "Your delivery address has been updated successfully."
                }
            );

        } catch (err) {

            console.log("Notification Error:", err.message);

        }

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Get Address
const getAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await profileService.getAddress(userId);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Update Password
const updatePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const { currentPassword, newPassword } = req.body;

        const result = await profileService.updatePassword(
            userId,
            currentPassword,
            newPassword
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Update Email
const updateEmail = async (req, res) => {

    try {

        const userId = req.user.id;

        const { email } = req.body;

        const result = await profileService.updateEmail(
            userId,
            email
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Update Phone
const updatePhone = async (req, res) => {

    try {

        const userId = req.user.id;

        const { phone } = req.body;

        const result = await profileService.updatePhone(
            userId,
            phone
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Delete User
const deleteUser = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await profileService.deleteUser(userId);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

// Get Profile
const getProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await profileService.getProfile(userId);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

module.exports = {
    updateName,
    updateAddress,
    getAddress,
    updatePassword,
    updateEmail,
    updatePhone,
    deleteUser,
    getProfile
};