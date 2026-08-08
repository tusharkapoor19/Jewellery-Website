const adminService =require("../service/adminservices.js");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {

    try {

        const users = await adminService.getAllUsers();

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        next(error);

    }

};

const getUserById = async (req, res, next) => {

    try {

        const user = await adminService.getUserById(req.params.id);

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        next(error);

    }

};

const updateUser = async (req, res, next) => {

    try {

        const user = await adminService.updateUser(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });

    } catch (error) {

        next(error);

    }

};

const deleteUser = async (req, res, next) => {

    try {

        await adminService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};

const getUserStats = async (req, res, next) => {

    try {

        const stats = await adminService.getUserStats();

        res.status(200).json({
            success: true,
            stats
        });

    } catch (error) {

        next(error);

    }

};

module.exports={
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats
};