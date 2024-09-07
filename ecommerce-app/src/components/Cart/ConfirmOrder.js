import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../Cart/CheckoutSteps';
import MetaData from '../layout/MetaData';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const history = useHistory();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const calculateSubtotal = (items) => 
    items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const subtotal = calculateSubtotal(cartItems);
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const orderInfo = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    history.push('/process/payment');
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirm-order-page">
        <div className="order-details">
          <div className="shipping-info">
            <h2>Shipping Info</h2>
            <div className="info-box">
              <div><strong>Name:</strong> <span>{user.name}</span></div>
              <div><strong>Phone:</strong> <span>{shippingInfo.phoneNo}</span></div>
              <div><strong>Address:</strong> <span>{address}</span></div>
            </div>
          </div>
          <div className="cart-items">
            <h2>Your Cart Items:</h2>
            <div className="items-container">
              {cartItems.map((item) => (
                <div key={item.product} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div><strong>Subtotal:</strong> <span>₹{subtotal}</span></div>
            <div><strong>Shipping Charges:</strong> <span>₹{shippingCharges}</span></div>
            <div><strong>GST:</strong> <span>₹{tax}</span></div>
          </div>
          <div className="total">
            <strong>Total:</strong> <span>₹{totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
