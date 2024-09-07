import React from 'react';
import { FaShippingFast, FaClipboardCheck, FaCreditCard } from 'react-icons/fa';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: 'Shipping Details',
      icon: <FaShippingFast />,
    },
    {
      label: 'Confirm Order',
      icon: <FaClipboardCheck />,
    },
    {
      label: 'Payment',
      icon: <FaCreditCard />,
    },
  ];

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${activeStep >= index ? 'step-active' : ''}`}
        >
          <div className="step-icon">{step.icon}</div>
          <p className="step-label">{step.label}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
