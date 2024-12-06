import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null); // Stores the ID of the review being edited
  const [editFormData, setEditFormData] = useState({});

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
        setReviews((prevReviews) => [...prevReviews, response.data]);
      } else {
        console.error("Failed to add review:", response.data.message);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const handleEditClick = (review) => {
    setEditMode(review.id); // Set the edit mode to the ID of the selected review
    setEditFormData({ ...review }); // Populate the form with the selected review's data
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting edited data:", editFormData);

    if (
      !editFormData.title ||
      !editFormData.artist ||
      !editFormData.reviewer ||
      !editFormData.review ||
      typeof editFormData.rating !== "number"
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.put(
        `https://react-musichub-backend.onrender.com/reviews/${editFormData.id}`,
        editFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editFormData.id ? response.data : review
          )
        );
        setEditMode(null); // Exit edit mode
        setEditFormData({}); // Clear the form data
      } else {
        console.error("Failed to update review:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const handleDeleteClick = async (id) => {
    if (!id) {
      console.error("Error: ID is undefined or null.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `https://react-musichub-backend.onrender.com/reviews/${id}`
      );
  
      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== id)
        );
      } else {
        console.error("Failed to delete review:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

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
          <div className="review-item" key={review.id}>
            {editMode === review.id ? (
              // Display edit form for the selected review
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="artist"
                  value={editFormData.artist || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="reviewer"
                  value={editFormData.reviewer || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="rating"
                  value={editFormData.rating || ""}
                  min="1"
                  max="5"
                  onChange={handleInputChange}
                />
                <textarea
                  name="review"
                  value={editFormData.review || ""}
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
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(review)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(review.id)}
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