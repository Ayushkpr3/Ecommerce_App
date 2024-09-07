import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';

// Middleware to check if the user is authenticated
export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorHandler('Please log in to access this resource', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to authorize roles for accessing specific routes
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(`Role: ${req.user.role} is not authorized to access this resource`, 403)
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
