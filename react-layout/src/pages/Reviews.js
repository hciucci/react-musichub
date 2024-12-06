import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // Stores all reviews
  const [editMode, setEditMode] = useState(null); // Tracks the review being edited
  const [editFormData, setEditFormData] = useState({}); // Stores the data of the review being edited

  // Fetch reviews on initial load
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://react-musichub-backend.onrender.com/reviews"
        );
        setReviews(response.data); // Load reviews into state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  // Add a new review
  const handleAddReview = async (newReview) => {
    try {
      const sanitizedReview = {
        title: newReview.title,
        artist: newReview.artist,
        reviewer: newReview.reviewer,
        rating: newReview.rating,
        review: newReview.review,
      };

      const response = await axios.post(
        "https://react-musichub-backend.onrender.com/reviews",
        sanitizedReview,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [...prevReviews, response.data]); // Add new review to state
      } else {
        console.error("Failed to add review:", response.data.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // Handle clicking "Edit" button
  const handleEditClick = (review) => {
    setEditMode(review._id); // Set editMode to the ID of the review being edited
    setEditFormData(review); // Pre-fill the edit form with existing review data
  };

  // Submit edits to the server
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.title || !editFormData.artist || !editFormData.reviewer || !editFormData.review || typeof editFormData.rating !== "number") {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.put(
        `https://react-musichub-backend.onrender.com/reviews/${editFormData._id}`,
        editFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === editFormData._id ? response.data : review // Update the edited review in state
          )
        );
        setEditMode(null); // Exit edit mode
        setEditFormData({}); // Clear the edit form
      } else {
        console.error("Failed to update review:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  // Delete a review
  const handleDeleteClick = async (_id) => {
    try {
      const response = await axios.delete(
        `https://react-musichub-backend.onrender.com/reviews/${_id}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== _id) // Remove the deleted review from state
        );
      } else {
        console.error("Failed to delete review:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="reviews-page">
      <h2>Song Reviews</h2>

      <AddReviewForm onAddReview={handleAddReview} />

      <div>
        {reviews.map((review) => (
          <div className="review-item" key={review._id}>
            {editMode === review._id ? (
              // Edit form for the specific review being edited
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="artist"
                  value={editFormData.artist}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="reviewer"
                  value={editFormData.reviewer}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="rating"
                  value={editFormData.rating}
                  min="1"
                  max="5"
                  onChange={handleInputChange}
                />
                <textarea
                  name="review"
                  value={editFormData.review}
                  onChange={handleInputChange}
                ></textarea>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditMode(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // Display the review
              <>
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
                <button className="edit-btn" onClick={() => handleEditClick(review)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(review._id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;