import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // Renders a route based on authentication and admin status
  const renderRoute = (props) => {
    if (!isAuthenticated) {
      // Redirects to login if not authenticated
      return <Redirect to="/login" />;
    }

    if (isAdmin && user.role !== "admin") {
      // Redirects to login if user is not an admin
      return <Redirect to="/login" />;
    }

    // Renders the component if all conditions are met
    return <Component {...props} />;
  };

  return !loading ? <Route {...rest} render={renderRoute} /> : null;
};

export default ProtectedRoute;
