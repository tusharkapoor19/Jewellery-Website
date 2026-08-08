
const express = require ("express");
const cors = require ("cors");
const cartRoutes = require ("./routes/cartRoutes.js");
const wishlistRoutes = require ("./routes/wishlistRoutes.js");
const profileRoutes= require("./routes/profileRoutes.js");
const addressRoutes = require ("./routes/addressRoutes.js");
const adminRoutes = require ("./routes/adminRoutes.js");
const errorMiddleware = require("./middleware/errormidd");

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Website is Running")
})

app.use("/cart", cartRoutes)
app.use("/wishlist", wishlistRoutes)
app.use("/profile", profileRoutes)
app.use("/address", addressRoutes);
app.use("/admin",adminRoutes);

app.use(errorMiddleware);

module.exports=app;