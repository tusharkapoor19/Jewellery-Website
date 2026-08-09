const Product = require("../models/products");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const addProduct = async (productData) => {                                                                  // ADD PRODUCT

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


    const lastProduct = await Product.findOne({ productID: /^HIR\d+$/ })
        .sort({ productID: -1 })
        .collation({ locale: "en_US", numericOrdering: true });


    let productID = "HIR001";

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

        const match = lastProduct.productID.match(/(\d+)$/);
        const lastNumber = match ? parseInt(match[1]) : 0;

        productID =
        `HIR${String(lastNumber+1).padStart(3,"0")}`;

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






const getallprodd = async(filters={})=>{                                                        // GET ALL PRODUCTS WITH FILTER

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


const updateProduct = async (productID, updateData) => {                                            // UPDATE PRODUCT

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






const deleteProduct = async(productID)=>{                                                 // DELETE PRODUCT
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






const getProductByID = async(productID)=>{                                                                      // GET PRODUCT BY ID

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


const searchProduct = async(name)=>{                                                                // SEARCH PRODUCT
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






const getProductByCategory = async(category)=>{                                                            // GET PRODUCT BY CATEGORY
    const products = await Product.find({
        category:category
    });

    return {
        totalproducts:products.length,
        products
    };
};






const reduceStock = async(productID,quantity)=>{                                                        // REDUCE STOCK

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






const increaseStock = async(productID,quantity)=>{                                                  // INCREASE STOCK

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




module.exports = {                                                                              // EXPORTS
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