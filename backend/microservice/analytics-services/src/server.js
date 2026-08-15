require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Analytics Service running on port ${process.env.PORT}`);
});
