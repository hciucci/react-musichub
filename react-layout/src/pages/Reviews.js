import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://react-musichub-backend.onrender.com/reviews"
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Function to handle adding a new review
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
        // Update the reviews state with the newly added review
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
  );
};

export default Reviews;