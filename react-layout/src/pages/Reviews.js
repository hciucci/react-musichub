import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null); // tracks the id of the review being edited
  const [editFormData, setEditFormData] = useState({}); // stores the form data for the review being edited

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

  // add a new review
  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post(
        "https://react-musichub-backend.onrender.com/reviews",
        newReview,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [...prevReviews, response.data]);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  // start editing a review
  const handleEditClick = (review) => {
    setEditMode(review._id); // set the id of the review being edited
    setEditFormData({ ...review }); // populate the form with the review's data
  };

  // handle form input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // save the edited review
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting edited data:", editFormData);
    try {
      const response = await axios.put(
        `https://react-musichub-backend.onrender.com/reviews/${editFormData._id}`,
        editFormData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === editFormData._id ? response.data : review
          )
        );
        setEditMode(null);
        setEditFormData({});
      }
    } catch (err) {
      console.error("Error updating review:", err.response.data);
    }
  };

  // cancel editing
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditFormData({});
  };

  // delete a review
  const handleDeleteClick = async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://react-musichub-backend.onrender.com/reviews/${reviewId}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
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
            {editMode === review._id ? (
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
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            ) : (
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