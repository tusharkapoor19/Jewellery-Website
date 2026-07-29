import profileService from "../service/profileService.js"


// Update Name
const updateName = async (req, res) => {

    try {

        const userId = req.user.id;

        const { name } = req.body;

        const result = await profileService.updateName(userId, name);

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

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// get address
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

        const result = await profileService.updateEmail(userId, email);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// update phn
const updatePhone = async (req, res) => {

    try {

        const userId = req.user.id;

        const { phone } = req.body;

        const result = await profileService.updatePhone(userId, phone);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// delete user
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

export default {
    updateName,
    updateAddress,
    getAddress,
    updatePassword,
    updateEmail,
    updatePhone,
    deleteUser,
    getProfile
};