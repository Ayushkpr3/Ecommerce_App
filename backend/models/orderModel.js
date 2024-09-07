import mongoose from 'mongoose';

// Define the order schema
const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Please enter the shipping address'],
    },
    city: {
      type: String,
      required: [true, 'Please enter the city'],
    },
    state: {
      type: String,
      required: [true, 'Please enter the state'],
    },
    country: {
      type: String,
      required: [true, 'Please enter the country'],
    },
    pinCode: {
      type: Number,
      required: [true, 'Please enter the pin code'],
    },
    phoneNo: {
      type: Number,
      required: [true, 'Please enter the phone number'],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, 'Please enter the product name'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter the product price'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please enter the quantity'],
      },
      image: {
        type: String,
        required: [true, 'Please provide the product image URL'],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: [true, 'Payment ID is required'],
    },
    status: {
      type: String,
      required: [true, 'Payment status is required'],
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Order model
export default mongoose.model('Order', orderSchema);
