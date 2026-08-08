const addressService = require("../service/addressService.js");

const addAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const address = await addressService.addAddress(
            userId,
            req.body
        );

        return res.status(201).json({

            success: true,

            message: "Address added successfully.",

            address

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const getAddresses = async (req, res) => {

    try {

        const userId = req.user.id;

        const addresses = await addressService.getAddresses(
            userId
        );

        return res.status(200).json({

            success: true,

            addresses

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const getAddressById = async (req, res) => {

    try {

        const userId = req.user.id;

        const { addressId } = req.params;

        const address =
            await addressService.getAddressById(

                userId,

                addressId

            );

        return res.status(200).json({

            success: true,

            address

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const updateAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const { addressId } = req.params;

        const address =
            await addressService.updateAddress(

                userId,

                addressId,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Address updated successfully.",

            address

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const deleteAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const { addressId } = req.params;

        await addressService.deleteAddress(

            userId,

            addressId

        );

        return res.status(200).json({

            success: true,

            message: "Address deleted successfully."

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const setDefaultAddress = async (req, res) => {

    try {

        const userId = req.user.id;

        const { addressId } = req.params;

        const address =
            await addressService.setDefaultAddress(

                userId,

                addressId

            );

        return res.status(200).json({

            success: true,

            message: "Default address updated.",

            address

        });

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

module.exports={

    addAddress,

    getAddresses,

    getAddressById,

    updateAddress,

    deleteAddress,

    setDefaultAddress

};