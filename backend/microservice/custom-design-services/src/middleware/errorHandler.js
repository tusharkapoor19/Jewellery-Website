// 404 handler - runs when no route matched
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Central error handler - catches errors thrown/passed via next(err)
// from anywhere in the app, including async controllers.
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field "${err.path}"`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {}).join(", ");
    message = `Duplicate value for field: ${field}`;
  }

  // Multer upload errors (file too large, wrong field name) and our own
  // fileFilter rejection message — see middleware/upload.js
  if (err.name === "MulterError" || err.message === "Only JPG, PNG or WEBP images are allowed") {
    statusCode = 400;
  }

  console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
