import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const ratingOptions = {
    value: product.ratings || 0, // default to 0 if ratings is undefined
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p className="product-card-title">{product.name}</p>
      <div className="product-card-rating">
        <Rating {...ratingOptions} />
        <span className="reviews-count">{`(${product.numOfReviews} Reviews)`}</span>
      </div>
      <span className="product-card-price">{`₹${product.price}`}</span>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    ratings: PropTypes.number,
    numOfReviews: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
