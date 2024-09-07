import ErrorHandler from '../utils/errorHandler.js';

const errorMiddleware = (err, req, res, next) => {
  // Set default status code and message if not provided
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Handle invalid MongoDB ObjectId errors
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle duplicate key errors from Mongoose
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered: ${field}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JSON Web Token errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid JSON Web Token. Please try again.';
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JSON Web Token errors
  if (err.name === 'TokenExpiredError') {
    const message = 'Your session has expired. Please log in again.';
    err = new ErrorHandler(message, 400);
  }

  // Send the error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
