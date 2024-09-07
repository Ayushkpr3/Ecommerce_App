import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <div className="profileInfo">
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt={user.name} />
          <Link to="/me/update" className="editProfileLink">
            Edit Profile
          </Link>
        </div>
        <div className="profileDetails">
          <div className="detailItem">
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div className="detailItem">
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div className="detailItem">
            <h4>Joined On</h4>
            <p>{user.createdAt.substr(0, 10)}</p>
          </div>
          <div className="profileActions">
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
