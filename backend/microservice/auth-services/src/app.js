const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const authRoutes = require("./routes/authroute");
const errorMiddleware = require("./middleware/globalmidd");
app.use(cors());
app.use("/auth", authRoutes);
app.use(errorMiddleware);


module.exports = app;