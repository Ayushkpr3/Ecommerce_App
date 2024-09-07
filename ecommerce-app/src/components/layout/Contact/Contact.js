import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contact-container">
      <a className="contact-mail-btn" href="mailto:ayush17334@iiitd.ac.in">
        <Button variant="contained" color="primary">
          Contact: ayush17334@iiitd.ac.in
        </Button>
      </a>
    </div>
  );
};

export default Contact;
