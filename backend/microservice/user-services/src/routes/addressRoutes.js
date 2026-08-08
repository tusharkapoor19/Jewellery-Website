const express =require("express");
const addressController =require("../controller/addressController.js");
const authMidd =require("../middleware/authMidd.js");

const router = express.Router();

router.post(
    "/add",
    authMidd,
    addressController.addAddress
);

router.get(
    "/get",
    authMidd,
    addressController.getAddresses
);

router.get(
    "/get/:addressId",
    authMidd,
    addressController.getAddressById
);

router.patch(
    "/update/:addressId",
    authMidd,
    addressController.updateAddress
);

router.delete(
    "/delete/:addressId",
    authMidd,
    addressController.deleteAddress
);

router.patch(
    "/default/:addressId",
    authMidd,
    addressController.setDefaultAddress
);

module.exports=router;