const profileService = require("../service/profileService.js");
const axios = require("axios");


// =====================================================
// UPDATE NAME
// =====================================================

const updateName = async (req, res) => {

    try {

        const userId = req.user.id;

        const { name } = req.body;

        const result = await profileService.updateName(
            userId,
            name
        );


        // Notification

        try {

            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,

                    title: "Profile Updated 👤",

                    message:
                        "Your profile name has been updated successfully.",

                    type: "ACCOUNT"
                }
            );

        } catch (err) {

            console.log(
                "Notification Error:",
                err.message
            );

        }


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// UPDATE ADDRESS
// =====================================================

const updateAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const { address } = req.body;

        const result =
            await profileService.updateAddress(
                userId,
                address
            );


        try {

            await axios.post(
                "http://localhost:5007/notifications",
                {
                    userId,

                    title: "Address Updated 📍",

                    message:
                        "Your delivery address has been updated successfully.",

                    type: "ACCOUNT"
                }
            );

        } catch (err) {

            console.log(
                "Notification Error:",
                err.message
            );

        }


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// GET ADDRESS
// =====================================================

const getAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const result =
            await profileService.getAddress(userId);

        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// UPDATE PASSWORD
// =====================================================

const updatePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            currentPassword,
            newPassword
        } = req.body;


        const result =
            await profileService.updatePassword(
                userId,
                currentPassword,
                newPassword
            );


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// UPDATE EMAIL
// =====================================================

const updateEmail = async (req, res) => {

    try {

        const userId = req.user.id;

        const { email } = req.body;


        const result =
            await profileService.updateEmail(
                userId,
                email
            );


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// UPDATE PHONE
// =====================================================

const updatePhone = async (req, res) => {

    try {

        const userId = req.user.id;

        const { phone } = req.body;


        const result =
            await profileService.updatePhone(
                userId,
                phone
            );


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {

    try {

        const userId = req.user.id;

        const result =
            await profileService.deleteUser(userId);


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// GET PROFILE
// =====================================================

const getProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const result =
            await profileService.getProfile(userId);


        res.status(200).json(result);

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// =====================================================
// GET PROFILE BY ID
// INTERNAL SERVICE USE
// =====================================================

const getProfileById = async (req, res) => {

    try {

        const userId = req.params.userId;


        const result =
            await profileService.getProfile(userId);


        res.status(200).json(result);

    }

    catch (error) {

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

    getProfile,

    getProfileById

};