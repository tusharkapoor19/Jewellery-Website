import express from "express";
import cors from "cors";
import customDesignRoutes from "./routes/customDesignRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

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