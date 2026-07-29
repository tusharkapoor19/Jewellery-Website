// require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`order Service running on port ${process.env.PORT}`);
});

