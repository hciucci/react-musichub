import React, { useState } from "react";
import "../css/AddReviewForm.css";

const AddReviewForm = ({ onAddReview }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    reviewer: "",
    rating: "",
    review: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    setErrors({});

    // Validate form inputs
    if (!formData.title || formData.title.length < 2) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be at least 2 characters.",
      }));
      return;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setErrors((prev) => ({
        ...prev,
        rating: "Rating must be between 1 and 5.",
      }));
      return;
    }

    try {
      // Ensure JSON is correctly formatted
      const response = await fetch(
        "https://react-musichub-backend.onrender.com/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            artist: formData.artist,
            reviewer: formData.reviewer,
            rating: parseInt(formData.rating),
            review: formData.review,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        onAddReview(result);
        setFormData({
          title: "",
          artist: "",
          reviewer: "",
          rating: "",
          review: "",
        });
        setFormStatus("success");
      } else {
        setFormStatus(result.message || "Error submitting review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setFormStatus("Error submitting review. Please try again later.");
    }
  };

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <label>Artist:</label>
      <input
        type="text"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />

      <label>Reviewer:</label>
      <input
        type="text"
        name="reviewer"
        value={formData.reviewer}
        onChange={handleChange}
        required
      />

      <label>Rating (1-5):</label>
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        required
      />
      {errors.rating && <p className="error">{errors.rating}</p>}

      <label>Review:</label>
      <textarea
        name="review"
        value={formData.review}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Submit Review</button>

      {formStatus === "success" && (
        <p className="success">
          Review submitted successfully! Refresh the page to see your review!
        </p>
      )}
      {formStatus && formStatus !== "success" && (
        <p className="error">{formStatus}</p>
      )}
    </form>
  );
};

export default AddReviewForm;