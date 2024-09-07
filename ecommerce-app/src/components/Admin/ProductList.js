import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAdminProduct, clearErrors, deleteProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import './productList.css';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

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
      alert.success('Product Deleted Successfully');
      history.push('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  // Handle product deletion
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  // Data structure for product rows
  const rows = products.map((product) => ({
    id: product._id,
    name: product.name,
    stock: product.Stock,
    price: product.price,
  }));

  return (
    <div className="productListWrapper">
      <MetaData title="All Products - Admin" />
      <Sidebar />
      <div className="productListContainer">
        <h1 className="productListHeading">All Products</h1>
        <ProductsTable rows={rows} onDelete={deleteProductHandler} />
      </div>
    </div>
  );
};

// ProductsTable component to display products in a table format
const ProductsTable = ({ rows, onDelete }) => {
  return (
    <table className="productsTable">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td className={row.stock > 0 ? 'greenColor' : 'redColor'}>
              {row.stock}
            </td>
            <td>₹{row.price}</td>
            <td className="actionButtons">
              <Link to={`/admin/product/${row.id}`} className="editButton">
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

export default ProductList;
