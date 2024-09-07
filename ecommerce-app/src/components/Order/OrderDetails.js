import React, { useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './myOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === 'Delivered' ? 'statusDelivered' : 'statusPending',
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <span role="img" aria-label="details">🔍</span>
        </Link>
      ),
    },
  ];

  const rows = orders?.map((order) => ({
    id: order._id,
    status: order.orderStatus,
    itemsQty: order.orderItems.length,
    amount: order.totalPrice,
  })) || [];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="orders-page">
          <h2 className="orders-heading">{user.name}'s Orders</h2>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="orders-table"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
