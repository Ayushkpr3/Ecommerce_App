import React, { useEffect, useRef } from 'react';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { createOrder, clearErrors } from '../../actions/orderAction';
import './Payment.css';

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const orderDetails = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePaymentSubmission = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post('/api/v1/payment/process', paymentData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const clientSecret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        payBtn.current.disabled = false;
      } else if (result.paymentIntent.status === 'succeeded') {
        orderDetails.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        dispatch(createOrder(orderDetails));
        history.push('/success');
      } else {
        alert.error('There was an issue processing your payment.');
      }
    } catch (error) {
      alert.error(error.response.data.message);
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div>
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form className="payment-form" onSubmit={handlePaymentSubmission}>
          <h2>Card Information</h2>
          <div className="payment-input-group">
            <CreditCard className="payment-icon" />
            <CardNumberElement className="payment-input" />
          </div>
          <div className="payment-input-group">
            <Event className="payment-icon" />
            <CardExpiryElement className="payment-input" />
          </div>
          <div className="payment-input-group">
            <VpnKey className="payment-icon" />
            <CardCvcElement className="payment-input" />
          </div>
          <button type="submit" ref={payBtn} className="payment-form-btn">
            Pay - ₹{orderInfo && orderInfo.totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
