import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB










// import dotenv from "dotenv"
// import path from "path"
// import { fileURLToPath } from "url"
// import mongoose from "mongoose"
// import fs from "fs"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// dotenv.config({
//     path: path.resolve(__dirname, "../../.env")
// })


// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL)

// .then(() => {
//     console.log("Connected to MongoDB")
// })

// .catch((err) => {
//     console.log(err)
// })


// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     password: {
//         type: String,
//         required: true,
//     },

//     phone: {
//         type: String,
//     },
//     address:{
//         type:String,
//         required:true,
//     },

//     role: {
//         type: String,
//         enum: ["customer", "admin"],
//         default: "customer",
//     },
//     otp: {
//         type: String,
//     },

//     logotp: {
//         type: String,
//     },


//     otpExpiry: {
//         type: Date,
//     },

//     isOtpVerified: {
//         type: Boolean,
//         default: false,
//     }
// });

// const users = mongoose.model("users", userSchema);


 

// const createCategory = async () => {

//     try {

//         const pro = JSON.parse(
//             fs.readFileSync("jewellery_products_100.json", "utf-8")
//         )

//         await users.insertMany(pro)

//         console.log("Documents Inserted Successfully")

//     } catch (err) {

//         console.log(err)

//     }

// }
// // const getStudents = async () => {

// //     const students = await Student.find({
// //         // name: "Isha Arora"
// //         // name: /sh/ // contains
// //         name: /^I/ // starting
// //         // name: /ra$/ // ending
// //     })

// //     console.log("All Students:")
// //     console.log(students)
// // }


// createCategory()
// // getStudents()