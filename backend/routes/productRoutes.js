import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/products', getAllProducts);
router.get('/product/:id', getProductDetails);

// Admin Routes
router.post(
  '/admin/product/new',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  createProduct
);

router.get(
  '/admin/products',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAdminProducts
);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Review Routes
router.put('/review', isAuthenticatedUser, createProductReview);

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

export default router;
