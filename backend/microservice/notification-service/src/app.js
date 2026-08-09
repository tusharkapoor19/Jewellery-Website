require("dotenv").config();

const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notification_routes");
const errorMiddleware = require("./middleware/error_mid");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notifications", notificationRoutes);

app.use(errorMiddleware);

module.exports = app;