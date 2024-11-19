import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://react-musichub-backend.onrender.com/reviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post(
        "https://react-musichub-backend.onrender.com/reviews",
        newReview,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [...prevReviews, response.data]);
      } else {
        console.error("Failed to add review:", response.data.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="reviews-page">
      <h2>Song Reviews</h2>

      {/* Add Review Form */}
      <AddReviewForm onAddReview={handleAddReview} />

      {/* Display Reviews */}
      <div>
        {reviews.map((review) => (
          <div className="review-item" key={review.id}>
            <h3>
              Song Title: "{review.title}" by {review.artist}
            </h3>
            <p>
              <strong>Reviewer:</strong> {review.reviewer} -{" "}
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p>
              <strong>Review:</strong> {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;