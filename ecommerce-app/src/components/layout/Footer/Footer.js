import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Get the app for Android and iOS mobile devices</p>
     </div>

      <div className="midFooter">
        <h1>AYUSH'S SHOP</h1>
        <p>Quality and customer satisfaction are our top priorities.</p>
        <p>Copyrights 2024 &copy; Ayush Kapoor</p>
      </div>
    </footer>
  );
};

export default Footer;
