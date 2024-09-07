import express from 'express';
import {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new order
router.post('/order/new', isAuthenticatedUser, newOrder);

// Route to get details of a single order by ID
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

// Route to get orders of the logged-in user
router.get('/orders/me', isAuthenticatedUser, myOrders);

// Admin route to get all orders
router.get(
  '/admin/orders',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllOrders
);

// Admin routes to update or delete an order by ID
router
  .route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;
