import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve .env relative to this file (offer-services/.env), so it loads
// correctly no matter which directory you run `node server.js` from.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5009;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Offer service running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
};

start();
