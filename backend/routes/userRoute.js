import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to handle forgot password
router.post('/password/forgot', forgotPassword);

// Route to reset password using a token
router.put('/password/reset/:token', resetPassword);

// Route to log out a user
router.get('/logout', logout);

// Route to get details of the logged-in user
router.get('/me', isAuthenticatedUser, getUserDetails);

// Route to update the user's password
router.put('/password/update', isAuthenticatedUser, updatePassword);

// Route to update the user's profile
router.put('/me/update', isAuthenticatedUser, updateProfile);

// Admin route to get all users
router.get(
  '/admin/users',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllUsers
);

// Admin routes to manage a single user by ID
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
