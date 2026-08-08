const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {

        userId: {
            type: String,
            required: true,
            index: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            match: /^[6-9]\d{9}$/
        },

        houseNumber: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80
        },

        street: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120
        },

        area: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        landmark: {
            type: String,
            trim: true,
            default: "",
            maxlength: 100
        },

        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },

        state: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },

        pincode: {
            type: String,
            required: true,
            match: /^[1-9][0-9]{5}$/
        },

        country: {
            type: String,
            default: "India"
        },

        addressType: {

            type: String,

            enum: [

                "Home",

                "Office",

                "Other"

            ],

            default: "Home"

        },

        isDefault: {

            type: Boolean,

            default: false

        }

    },

    {

        timestamps: true

    }

);
module.exports = mongoose.model("Address",addressSchema);