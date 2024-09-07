import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders, fetchAllUsers } from '../../actions/adminActions';

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const { products = [] } = useSelector(state => state.adminProducts);
  const { orders = [] } = useSelector(state => state.allOrders);
  const { users = [] } = useSelector(state => state.allUsers);

  // Calculating out of stock products
  const outOfStockCount = products.reduce((count, product) => count + (product.Stock === 0 ? 1 : 0), 0);

  // Calculating total sales amount
  const totalSales = orders.reduce((total, order) => total + order.totalPrice, 0);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Configurations for line chart
  const lineChartConfig = {
    labels: ['Initial Amount', 'Total Earned'],
    datasets: [
      {
        label: 'Revenue',
        data: [0, totalSales],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Configurations for doughnut chart
  const doughnutChartConfig = {
    labels: ['Out of Stock', 'In Stock'],
    datasets: [
      {
        data: [outOfStockCount, products.length - outOfStockCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Admin Dashboard" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1 className="dashboardTitle">Admin Dashboard</h1>

        <div className="dashboardSummary">
          <div className="summaryBox">
            <p>Total Sales: ₹{totalSales}</p>
          </div>
          <div className="summaryLinks">
            <DashboardLink to="/admin/products" label="Products" count={products.length} />
            <DashboardLink to="/admin/orders" label="Orders" count={orders.length} />
            <DashboardLink to="/admin/users" label="Users" count={users.length} />
          </div>
        </div>

        <div className="charts">
          <div className="lineChart">
            <Line data={lineChartConfig} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutChartConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};

// A reusable component for displaying dashboard links with counts
const DashboardLink = ({ to, label, count }) => (
  <Link to={to} className="dashboardLink">
    <p>{label}</p>
    <span>{count}</span>
  </Link>
);

export default Dashboard;
