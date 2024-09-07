import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useHistory, useLocation } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };

  const handleRegisterChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginSignUpContainer">
          <div className="loginSignUpBox">
            <div className="toggleContainer">
              <div className="toggleButtons">
                <p onClick={() => switchTabs("login")}>LOGIN</p>
                <p onClick={() => switchTabs("register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={handleLogin}>
              <div className="inputGroup">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="inputGroup">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password?</Link>
              <button type="submit" className="btn">Login</button>
            </form>
            <form className="registerForm" ref={registerTab} onSubmit={handleRegister}>
              <div className="inputGroup">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={user.name}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="inputGroup">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={user.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="inputGroup">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={user.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="avatarGroup">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleRegisterChange}
                />
              </div>
              <button type="submit" className="btn">Register</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
