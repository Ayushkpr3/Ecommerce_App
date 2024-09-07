import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarLogo">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebarMenu">
        <li>
          <NavLink to="/admin/dashboard" activeClassName="activeLink">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" activeClassName="activeLink">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" activeClassName="activeLink">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="activeLink">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reviews" activeClassName="activeLink">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/create-product" activeClassName="activeLink">
            Create Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
