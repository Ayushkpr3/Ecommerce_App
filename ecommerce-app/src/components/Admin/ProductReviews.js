import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getAllReviews, deleteReview, clearErrors } from '../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import './productReview.css';

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector((state) => state.review);

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
      alert.success('Review Deleted Successfully');
      history.push('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    // Fetch reviews for a specific product (Replace 'productId' with the actual product ID as required)
    dispatch(getAllReviews('productId'));
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  // Handle review deletion
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview('productId', reviewId)); // Replace 'productId' with the actual product ID as required
  };

  // Data structure for review rows
  const rows = reviews.map((review) => ({
    id: review._id,
    user: review.name,
    comment: review.comment,
    rating: review.rating,
  }));

  return (
    <div className="productReviewWrapper">
      <MetaData title="Product Reviews - Admin" />
      <Sidebar />
      <div className="productReviewContainer">
        <h1 className="productReviewHeading">Product Reviews</h1>
        <ReviewsTable rows={rows} onDelete={deleteReviewHandler} />
      </div>
    </div>
  );
};

// ReviewsTable component to display reviews in a table format
const ReviewsTable = ({ rows, onDelete }) => {
  return (
    <table className="reviewsTable">
      <thead>
        <tr>
          <th>Review ID</th>
          <th>User</th>
          <th>Comment</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.user}</td>
            <td>{row.comment}</td>
            <td className={`rating ${row.rating >= 3 ? 'highRating' : 'lowRating'}`}>
              {row.rating}
            </td>
            <td className="actionButtons">
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

export default ProductReviews;
