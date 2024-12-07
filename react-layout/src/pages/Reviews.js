import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://react-musichub-backend.onrender.com/reviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("error fetching reviews:", error);
      }
    })();
  }, []);

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
      console.error("error submitting review:", err);
    }
  };

  const handleEditClick = (review) => {
    setEditMode(review._id);
    setEditFormData(review);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
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
      console.error("error updating review:", err);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        `https://react-musichub-backend.onrender.com/reviews/${id}`
      );
      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
        );
      }
    } catch (err) {
      console.error("error deleting review:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="reviews-page">
      <h2>song reviews</h2>
      <AddReviewForm onAddReview={handleAddReview} />
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
                <button type="submit">save</button>
                <button type="button" onClick={() => setEditMode(null)}>
                  cancel
                </button>
              </form>
            ) : (
              <>
                <h3>
                  song title: "{review.title}" by {review.artist}
                </h3>
                <p>
                  <strong>reviewer:</strong> {review.reviewer} -{" "}
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                <p>
                  <strong>review:</strong> {review.review}
                </p>
                <button onClick={() => handleEditClick(review)}>edit</button>
                <button onClick={() => handleDeleteClick(review._id)}>
                  delete
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