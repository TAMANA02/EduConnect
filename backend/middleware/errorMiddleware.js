/**
 * Catches requests to routes that don't exist and forwards a 404
 * error into the centralized error handler below.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized error handler. Normalizes Mongoose validation errors,
 * duplicate key errors, and bad ObjectId casts into consistent JSON
 * responses matching the app's { success, message } shape.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Server error";

  // Invalid MongoDB ObjectId (e.g. GET /api/students/not-a-valid-id)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Student not found";
  }

  // Mongoose validation error (missing/invalid fields)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Duplicate key error (e.g. duplicate studentId or email)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `A student with this ${field} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { notFound, errorHandler };
