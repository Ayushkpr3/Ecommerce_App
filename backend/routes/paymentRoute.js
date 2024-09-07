import express from 'express';
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js';
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

// Route to process a payment
router.post('/payment/process', isAuthenticatedUser, processPayment);

// Route to send the Stripe API key to the frontend
router.get('/stripeapikey', isAuthenticatedUser, sendStripeApiKey);

export default router;
