import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Create new Order
export const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// Get Single Order
export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return next(new ErrorHandler('Order not found with this ID', 404));
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// Get Logged-in User Orders
export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// Get All Orders (Admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({ success: true, totalAmount, orders });
  } catch (error) {
    next(error);
  }
};

// Update Order Status (Admin only)
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler('Order not found with this ID', 404));
    }

    if (order.orderStatus === 'Delivered') {
      return next(new ErrorHandler('This order has already been delivered', 400));
    }

    if (req.body.status === 'Shipped') {
      await Promise.all(order.orderItems.map((item) => updateStock(item.product, item.quantity)));
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// Helper function to update product stock
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

// Delete Order (Admin only)
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler('Order not found with this ID', 404));
    }

    await order.remove();

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
