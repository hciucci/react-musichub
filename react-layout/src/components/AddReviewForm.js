import React, { useState } from "react";
import "../css/AddReviewForm.css"; // Make sure to create this CSS file

const AddReviewForm = ({ onAddReview }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title || !artist || !reviewer || !rating || !review) {
      setError("All fields are required.");
      return;
    }

    const newReview = {
      title,
      artist,
      reviewer,
      rating: parseInt(rating),
      review,
    };

    onAddReview(newReview);

    // Clear the form
    setTitle("");
    setArtist("");
    setReviewer("");
    setRating("");
    setReview("");
  };

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <h3>Add a Review</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label>Song Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the song title"
        />
      </div>
      <div className="form-group">
        <label>Artist:</label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Enter the artist's name"
        />
      </div>
      <div className="form-group">
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Enter a rating"
        />
      </div>
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter your review"
        ></textarea>
      </div>
      <button className="submit-button" type="submit">
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
