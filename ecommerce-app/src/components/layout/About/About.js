import React from 'react';
import './aboutSection.css';

const About = () => {


  return (
    <div className="about-section">
      <div className="about-gradient"></div>
      <div className="about-container">
        <h1>About Us</h1>
        <div className="about-content">
          <div className="about-founder">
            <img
              className="about-avatar"
              src="https://res.cloudinary.com/tripleayt/image/upload/v1631555947/products/jpyibarlaxawvcvqjv5b.png"
              alt="Founder"
            />
            <h2>Ayush Kapoor</h2>
            <p>This is a demo website built by Ayush Kapoor to showcase MERN Stack capabilities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
