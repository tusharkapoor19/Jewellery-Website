const User = require("../models/products");
const jwt = require("jsonwebtoken");
const prodsvc = require("../service/service");


// ADD PRODUCT

const addProduct = async (req, res, next) => {

    try {

        const product = await prodsvc.addProduct(req.body);

        res.status(200).json({
            message: "product created successfully",
            product
        });

    }
    catch (error) {

        next(error);

    }

};


// GET ALL PRODUCTS

const getallprodd = async (req, res, next) => {

    try {

        const products = await prodsvc.getallprodd(req.query);

        res.status(200).json({
            message: "products retrieved successfully",
            products
        });

    }
    catch (error) {

        next(error);

    }

};



// UPDATE PRODUCT

const updateProduct = async (req, res, next) => {

    try {

        const product = await prodsvc.updateProduct(
            req.params.productID,
            req.body
        );

        res.status(200).json(product);

    } 
    catch (error) {

        next(error);

    }

};



// DELETE PRODUCT

const deleteProduct = async (req, res, next) => {

    try {

        const product = await prodsvc.deleteProduct(
            req.params.productID
        );

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });

    } 
    catch (error) {

        next(error);

    }

};



// GET PRODUCT BY ID

const getProductByID = async (req, res, next) => {

    try {

        const product = await prodsvc.getProductByID(
            req.params.productID
        );

        res.status(200).json({
            message: "Product retrieved successfully",
            product
        });

    } 
    catch (error) {

        next(error);

    }

};



// SEARCH PRODUCT

const searchProduct = async (req, res, next) => {

    try {

        const result = await prodsvc.searchProduct(
            req.query.name
        );

        res.status(200).json({
            message: "Products searched successfully",
            products: result
        });

    } 
    catch (error) {

        next(error);

    }

};



// GET PRODUCT BY CATEGORY

const getProductByCategory = async (req, res, next) => {

    try {

        const products = await prodsvc.getProductByCategory(
            req.params.category
        );

        res.status(200).json({
            message: "Products retrieved successfully",
            products
        });

    } 
    catch (error) {

        next(error);

    }

};



// REDUCE STOCK

const reduceStock = async (req, res, next) => {

    try {

        const { productID, quantity } = req.body;

        const result = await prodsvc.reduceStock(
            productID,
            quantity
        );

        res.status(200).json({
            success: true,
            result
        });

    } 
    catch (error) {

        next(error);

    }

};



// INCREASE STOCK

const increaseStock = async (req, res, next) => {

    try {

        const { productID, quantity } = req.body;

        const result = await prodsvc.increaseStock(
            productID,
            quantity
        );

        res.status(200).json({
            success: true,
            result
        });

    } 
    catch (error) {

        next(error);

    }

};



module.exports = {
    addProduct,
    getallprodd,
    updateProduct,
    deleteProduct,
    getProductByID,
    searchProduct,
    getProductByCategory,
    reduceStock,
    increaseStock
};