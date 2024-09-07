import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import CartItemCard from './CartItemCard';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  const updateQuantity = (id, quantity, stock, increment = true) => {
    const newQty = increment ? quantity + 1 : quantity - 1;
    if ((increment && stock <= quantity) || (!increment && quantity <= 1)) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const proceedToCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  if (cartItems.length === 0) {
    return (
      <div className="emptyCart">
        <svg className="emptyCartIcon" />
        <p>No Product in Your Cart</p>
        <Link to="/products" className="emptyCartLink">View Products</Link>
      </div>
    );
  }

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="cartPage">
      <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>

      {cartItems.map((item) => (
        <div className="cartContainer" key={item.product}>
          <CartItemCard item={item} handleRemoveItem={handleRemoveItem} />
          <div className="cartInput">
            <button onClick={() => updateQuantity(item.product, item.quantity, item.stock, false)}>
              -
            </button>
            <input type="number" value={item.quantity} readOnly />
            <button onClick={() => updateQuantity(item.product, item.quantity, item.stock)}>
              +
            </button>
          </div>
          <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
        </div>
      ))}

      <div className="cartGrossProfit">
        <div></div>
        <div className="cartGrossProfitBox">
          <p>Gross Total</p>
          <p>{`₹${calculateTotal()}`}</p>
        </div>
        <div></div>
        <div className="checkOutBtn">
          <button onClick={proceedToCheckout}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
