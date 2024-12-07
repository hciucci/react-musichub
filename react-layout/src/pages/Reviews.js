import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // list of reviews
  const [editMode, setEditMode] = useState(false); // whether the edit form is visible
  const [editFormData, setEditFormData] = useState({}); // data of the review being edited

  // fetch reviews from the backend
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

  // handle adding a new review
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

  // handle showing the edit form
  const handleEditClick = (review) => {
    setEditMode(true);
    setEditFormData(review); // populate the form with the selected review's data
  };

  // handle hiding the edit form
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditFormData({}); // clear the form data
  };

  // handle submitting the edited review
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://react-musichub-backend.onrender.com/reviews/${editFormData._id}`,
        {
          title: editFormData.title,
          artist: editFormData.artist,
          reviewer: editFormData.reviewer,
          rating: editFormData.rating,
          review: editFormData.review,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === editFormData._id ? response.data : review
          )
        );
        handleCancelEdit();
      } else {
        console.error("Failed to update review:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  // handle deleting a review
  const handleDeleteClick = async (id) => {
    if (!id) {
      console.error("Error: Invalid ID passed to delete handler.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://react-musichub-backend.onrender.com/reviews/${id}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
        );
      } else {
        console.error("Failed to delete review:", response.data.message);
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // handle input change in the edit form
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

      {/* add review form */}
      <AddReviewForm onAddReview={handleAddReview} />

      {/* display reviews */}
      <div>
        {reviews.map((review) => (
          <div className="review-item" key={review._id}>
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
              onClick={() => handleDeleteClick(review._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* single edit form */}
      {editMode && (
        <div className="edit-form-container">
          <h3>Edit Review</h3>
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
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;