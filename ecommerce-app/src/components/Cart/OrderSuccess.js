import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "@material-ui/icons";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <CheckCircle className="success-icon" />
      <h2>Your Order has been Placed Successfully!</h2>
      <Link to="/orders" className="view-orders-link">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
