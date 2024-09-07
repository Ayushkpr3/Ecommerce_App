import React from 'react';
import { Link } from 'react-router-dom';
import './CartItemCard.css';

const CartItemCard = ({ item, handleRemoveItem }) => {
  return (
    <div className="cart-item-card">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <Link to={`/product/${item.product}`} className="cart-item-name">
          {item.name}
        </Link>
        <span className="cart-item-price">{`Price: ₹${item.price}`}</span>
        <p className="cart-item-remove" onClick={() => handleRemoveItem(item.product)}>
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
