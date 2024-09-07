import React, { useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import './processOrder.css';

const ProcessOrder = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully');
      history.push('/admin/orders');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError, history]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('status', status);
    dispatch(updateOrder(match.params.id, formData));
  };

  return (
    <div className="processOrderWrapper">
      <MetaData title="Process Order" />
      <Sidebar />
      <div className="processOrderContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className={`confirmOrderPage ${order.orderStatus === 'Delivered' ? 'delivered' : ''}`}>
            <div className="orderDetails">
              <h2>Shipping Info</h2>
              <div className="orderInfo">
                <p><strong>Name:</strong> {order.user && order.user.name}</p>
                <p><strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                <p><strong>Address:</strong> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
              </div>

              <h2>Payment</h2>
              <div className="orderInfo">
                <p className={order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'status paid' : 'status not-paid'}>
                  {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                </p>
                <p><strong>Amount:</strong> ₹{order.totalPrice && order.totalPrice}</p>
              </div>

              <h2>Order Status</h2>
              <div className="orderInfo">
                <p className={order.orderStatus === 'Delivered' ? 'status delivered' : 'status pending'}>
                  {order.orderStatus}
                </p>
              </div>

              <h2>Your Cart Items:</h2>
              <div className="cartItems">
                {order.orderItems && order.orderItems.map((item) => (
                  <div key={item.product} className="cartItem">
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></span>
                  </div>
                ))}
              </div>
            </div>

            {order.orderStatus !== 'Delivered' && (
              <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                <h2>Process Order</h2>
                <div className="formGroup">
                  <label htmlFor="status">Update Status</label>
                  <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Select Status</option>
                    {order.orderStatus === 'Processing' && <option value="Shipped">Shipped</option>}
                    {order.orderStatus === 'Shipped' && <option value="Delivered">Delivered</option>}
                  </select>
                </div>
                <button type="submit" className="submitBtn" disabled={loading || !status}>
                  Process
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessOrder;
