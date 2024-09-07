import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'SmartPhones',
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  const priceHandler = (event) => {
    setPrice([event.target.value[0], event.target.value[1]]);
  };

  const count = filteredProductsCount;

  return (
    <div className="products-page">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="products-heading">Products</h2>

          <div className="products">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="filter-box">
            <h4>Price</h4>
            <input
              type="range"
              min="0"
              max="25000"
              value={price}
              onChange={priceHandler}
              className="price-slider"
            />

            <h4>Categories</h4>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <h4>Ratings Above</h4>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
              className="rating-slider"
            />
          </div>

          {resultPerPage < count && (
            <div className="pagination-box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="page-item-active"
                activeLinkClass="page-link-active"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
