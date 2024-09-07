import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-icon">❌</div>
      <h2 className="not-found-text">Oops! Page Not Found</h2>
      <Link to="/" className="home-link">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
