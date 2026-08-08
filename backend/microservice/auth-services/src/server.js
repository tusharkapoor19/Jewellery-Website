const connectDB = require("./config/db");
const app = require("./app");
require("dotenv").config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running on port ${process.env.PORT}`);
});

