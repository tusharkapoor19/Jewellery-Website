require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`payment Service running on port ${process.env.PORT}`);
});

