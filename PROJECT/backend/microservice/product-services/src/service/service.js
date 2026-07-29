const Product = require("../models/products");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ADD PRODUCT

const addProduct = async (productData) => {

    const {
        name,
        category,
        collection,
        metal,
        description,
        price,
        weight,
        stock,
        image,
        images,
        certification
    } = productData;


    const lastProduct = await Product.findOne()
        .sort({ createdAt:-1 });


    let productID = "PRD001";


    if(!name || !category || !collection || !metal || !price || !weight){

        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;

    }


    if(price <= 0){

        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        throw error;

    }


    if(weight <= 0){

        const error = new Error("Weight must be greater than 0");
        error.statusCode = 400;
        throw error;

    }


    if(stock <= 0){

        const error = new Error("No stock left, all sold out");
        error.statusCode = 409;
        throw error;

    }



    if(lastProduct){

        const lastNumber = parseInt(
            lastProduct.productID.replace("PRD","")
        );


        productID =
        `PRD${String(lastNumber+1).padStart(3,"0")}`;

    }



    const existingProduct = await Product.findOne({
        name:name
    });


    if(existingProduct){

        const error = new Error("Product already exists");
        error.statusCode = 400;
        throw error;

    }



    const product = await Product.create({

        productID,

        name,

        category,

        collection,

        metal,

        description,

        price,

        weight,

        stock,

        image,

        images,

        certification

    });



    return {

        message:"Product added successfully",

        product

    };

};




// GET ALL PRODUCTS WITH FILTER

const getallprodd = async(filters={})=>{


    const {
        collection,
        category,
        metal
    } = filters;



    let query = {};



    if(collection){

        query.collection = collection;

    }



    if(category){

        query.category = category;

    }



    if(metal){

        query.metal = metal;

    }



    const products = await Product.find(query)
    .sort({createdAt:-1});



    return {

        totalproducts:products.length,

        products

    };

};
// UPDATE PRODUCT

const updateProduct = async (productID, updateData) => {

    const product = await Product.findOne({
        productID
    });


    if(!product){

        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;

    }



    if(updateData.price && updateData.price <= 0){

        const error = new Error("Price must be greater than 0");
        error.statusCode = 400;
        throw error;

    }



    if(updateData.weight && updateData.weight <= 0){

        const error = new Error("Weight must be greater than 0");
        error.statusCode = 400;
        throw error;

    }



    Object.assign(
        product,
        updateData
    );


    await product.save();


    return {

        message:"Product updated successfully",

        product

    };

};




// DELETE PRODUCT

const deleteProduct = async(productID)=>{


    const product = await Product.findOne({
        productID
    });


    if(!product){

        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;

    }



    await product.deleteOne();



    return {

        message:"Product deleted successfully",

        product

    };

};




// GET PRODUCT BY ID

const getProductByID = async(productID)=>{


    const product = await Product.findOne({
        productID
    });



    if(!product){

        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;

    }



    return product;

};
// SEARCH PRODUCT

const searchProduct = async(name)=>{

    const products = await Product.find({

        name:{
            $regex:name,
            $options:"i"
        }

    });


    return {

        totalproducts:products.length,

        products

    };

};




// GET PRODUCT BY CATEGORY

const getProductByCategory = async(category)=>{


    const products = await Product.find({

        category:category

    });


    return {

        totalproducts:products.length,

        products

    };

};




// REDUCE STOCK

const reduceStock = async(productID,quantity)=>{


    const product = await Product.findOne({

        productID

    });



    if(!product){

        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;

    }



    if(product.stock < quantity){

        const error = new Error("Insufficient stock");
        error.statusCode = 400;
        throw error;

    }



    product.stock -= quantity;


    await product.save();


    return product;

};




// INCREASE STOCK

const increaseStock = async(productID,quantity)=>{


    const product = await Product.findOne({

        productID

    });



    if(!product){

        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;

    }



    product.stock += quantity;


    await product.save();



    return {

        message:"Stock increased successfully",

        product

    };

};




// EXPORTS

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