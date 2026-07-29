// import express from "express";
// import cors from "cors";

// import cartRoutes from "./routes/cartRoutes.js";
// console.log(cartRoutes);
// const app = express();

// console.log("APP.JS LOADED");

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("USER SERVICE");
// });

// // app.get("/", (req, res) => {
// //     res.send("USER SERVICE 12345");
// // });


// app.use("/cart", cartRoutes);

// export default app;



import express from "express"
import cors from "cors"
import cartRoutes from "./routes/cartRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import addressRoutes from "./routes/addressRoutes.js";

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

export default app