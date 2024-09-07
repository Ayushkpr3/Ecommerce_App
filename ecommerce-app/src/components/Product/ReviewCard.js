import React from "react";
import { Rating } from "@material-ui/lab";
import profilePlaceholder from "../../images/Profile.png"; // Updated variable for clarity

const ReviewCard = ({ review }) => {
  // Setting options for the Rating component
  const ratingOptions = {
    value: review.rating || 0, // Ensures a default rating if not provided
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePlaceholder} alt="Reviewer" />
      <p className="reviewCardName">{review.name || "Anonymous"}</p> {/* Default name if not provided */}
      <Rating {...ratingOptions} />
      <span className="reviewCardComment">{review.comment || "No comments available."}</span> {/* Default comment message */}
    </div>
  );
};

export default ReviewCard;
