const Address = require("../models/address.js");

const addAddress = async (userId, data) => {

    const {

        fullName,
        phone,
        houseNumber,
        street,
        area,
        landmark,
        city,
        state,
        pincode,
        country,
        addressType,
        isDefault

    } = data;

    const totalAddresses = await Address.countDocuments({
        userId
    });

    if (totalAddresses >= 10) {

        throw new Error(
            "Maximum 10 addresses allowed."
        );

    }

    if (isDefault) {

        await Address.updateMany(

            { userId },

            { isDefault: false }

        );

    }

    const address = await Address.create({

        userId,

        fullName,

        phone,

        houseNumber,

        street,

        area,

        landmark,

        city,

        state,

        pincode,

        country,

        addressType,

        isDefault

    });

    return address;

};

const getAddresses = async (userId) => {

    return await Address.find({

        userId

    }).sort({

        isDefault: -1,

        createdAt: -1

    });

};

const getAddressById = async (

    userId,

    addressId

) => {

    const address = await Address.findOne({

        _id: addressId,

        userId

    });

    if (!address) {

        throw new Error(

            "Address not found."

        );

    }

    return address;

};

const updateAddress = async (

    userId,

    addressId,

    data

) => {

    const address = await Address.findOne({

        _id: addressId,

        userId

    });

    if (!address) {

        throw new Error(

            "Address not found."

        );

    }

    if (data.isDefault) {

        await Address.updateMany(

            { userId },

            {

                isDefault: false

            }

        );

    }

    Object.assign(

        address,

        data

    );

    await address.save();

    return address;

};

const deleteAddress = async (

    userId,

    addressId

) => {

    const address = await Address.findOne({

        _id: addressId,

        userId

    });

    if (!address) {

        throw new Error(

            "Address not found."

        );

    }

    await Address.deleteOne({

        _id: addressId

    });

    return true;

};

const setDefaultAddress = async (

    userId,

    addressId

) => {

    const address = await Address.findOne({

        _id: addressId,

        userId

    });

    if (!address) {

        throw new Error(

            "Address not found."

        );

    }

    await Address.updateMany(

        { userId },

        {

            isDefault: false

        }

    );

    address.isDefault = true;

    await address.save();

    return address;

};

module.exports={

    addAddress,

    getAddresses,

    getAddressById,

    updateAddress,

    deleteAddress,

    setDefaultAddress

};