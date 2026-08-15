import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import customDesignRoutes from "./routes/customDesignRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Allow frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Parse request body
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded reference photos (see middleware/upload.js +
// controllers/customDesignController.js#uploadDesignReferenceImage) at
// http://localhost:<PORT>/uploads/images/<filename>.
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

// Routes
app.use("/custom-design-save", customDesignRoutes);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;