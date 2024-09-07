import React, { useEffect } from 'react';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import MetaData from '../layout/MetaData';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders = [] } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  // Handle order deletion
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  // Fetch orders and handle errors
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Order Deleted Successfully');
      history.push('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  // Data structure for table rows
  const rows = orders.map((order) => ({
    id: order._id,
    itemsQty: order.orderItems.length,
    amount: order.totalPrice,
    status: order.orderStatus,
  }));

  return (
    <div className="orderListWrapper">
      <MetaData title="All Orders - Admin" />
      <Sidebar />
      <div className="orderListContainer">
        <h1 className="orderListHeading">All Orders</h1>

        {/* Render Orders Table */}
        <OrdersTable rows={rows} onDelete={handleDelete} />
      </div>
    </div>
  );
};

// OrdersTable component to display orders in a table format
const OrdersTable = ({ rows, onDelete }) => {
  return (
    <table className="ordersTable">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Items Qty</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td className={row.status === 'Delivered' ? 'greenColor' : 'redColor'}>
              {row.status}
            </td>
            <td>{row.itemsQty}</td>
            <td>₹{row.amount}</td>
            <td className="actionButtons">
              <Link to={`/admin/order/${row.id}`} className="editButton">
                Edit
              </Link>
              <button onClick={() => onDelete(row.id)} className="deleteButton">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
