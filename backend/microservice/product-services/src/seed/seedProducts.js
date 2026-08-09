const mongoose = require("mongoose");

const Product = require("../models/products");
const products = require("./products");

require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);
async function seedProducts() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        await Product.deleteMany({});

        console.log("🗑 Existing Products Deleted");

        await Product.insertMany(products);

        console.log(`✅ ${products.length} Products Inserted Successfully`);

        process.exit(0);

    }

    catch (error) {

        console.error("❌ Error Seeding Products");
        console.error(error);

        process.exit(1);

    }

}

seedProducts();