import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import app from "./app.js"
import connectDB from "./config/db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log("USER SERVICE SERVER STARTED");
        console.log(process.cwd());
        console.log(import.meta.url);
        console.log(`Server is running on Port ${PORT}`);
    })
}

startServer()