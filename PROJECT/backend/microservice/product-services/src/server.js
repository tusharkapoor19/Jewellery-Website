const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`prod Service running on port ${process.env.PORT}`);
});

