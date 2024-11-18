import React, { useState, useEffect } from "react";
import AddReviewForm from "../components/AddReviewForm";
import "../css/Reviews.css";

const Reviews = () => {
  // Hardcoded original reviews
  const originalReviews = [
    {
      id: 1,
      title: "Dreams",
      artist: "Benjamin Tissot",
      reviewer: "Jane Doe",
      rating: 4,
      review:
        '"Dreams" is a relaxing, chill-out track perfect for unwinding after a long day. The laid-back mood and calming melodies are a hit!',
    },
    {
      id: 2,
      title: "Slow Life",
      artist: "Benjamin Lazzarus",
      reviewer: "John Smith",
      rating: 4,
      review:
        '"Slow Life" offers an intriguing blend of epic royalty-free music, featuring piano and strings for a serene atmosphere. Perfect for videos!',
    },
    {
      id: 3,
      title: "Fireside Chat",
      artist: "Yunior Arronte",
      reviewer: "Alice Johnson",
      rating: 4,
      review:
        '"Fireside Chat" has a warm, jazzy vibe with soothing instruments that create the perfect backdrop for a cozy evening. Highly recommended!',
    },
    {
      id: 4,
      title: "Dawn of Change",
      artist: "Roman Senyk",
      reviewer: "Mark Wilson",
      rating: 3,
      review:
        '"Dawn of Change" brings emotional cinematic royalty-free music with strings and percussion that evoke powerful feelings of transformation.',
    },
    {
      id: 5,
      title: "Hope",
      artist: "Hugo Dujardin",
      reviewer: "Sarah Clark",
      rating: 4,
      review:
        '"Hope" is a beautiful, touching piano track that will resonate with anyone who enjoys calming piano solos. It\'s short but very sweet.',
    },
    {
      id: 6,
      title: "Yesterday",
      artist: "Aventure",
      reviewer: "Chris Thompson",
      rating: 5,
      review:
        '"Yesterday" is a standout! The relaxing synths and drums make it a great choice for unwinding and creating a serene atmosphere. A must-listen.',
    },
    {
      id: 7,
      title: "Hearty",
      artist: "Aventure",
      reviewer: "Rachel Evans",
      rating: 3,
      review:
        '"Hearty" has a touching, soft feel, with relaxing synths and drums that fit perfectly for emotional scenes. Aventure delivers again.',
    },
    {
      id: 8,
      title: "Floating Garden",
      artist: "Aventure",
      reviewer: "Michael Brown",
      rating: 4,
      review:
        '"Floating Garden" is a dreamy lo-fi track that features bass and electric guitar. Its mellow vibes are perfect for chilling out.',
    },
    {
      id: 9,
      title: "Angels By My Side",
      artist: "Lunar Years",
      reviewer: "Laura Green",
      rating: 4,
      review:
        '"Angels By My Side" is a beautiful, touching folk track featuring acoustic guitar and heartfelt melodies. It\'s a deeply emotional song.',
    },
    {
      id: 10,
      title: "Moonlight Drive",
      artist: "Yunior Arronte",
      reviewer: "Tom Harris",
      rating: 5,
      review:
        '"Moonlight Drive" is a slow, lo-fi relaxing track with calming piano, synth, drums, and bass. Perfect for a late-night drive or chill session.',
    },
  ];

  const [reviews, setReviews] = useState(originalReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://react-musichub-backend.onrender.com/reviews"
        );
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // adding a review
  const handleAddReview = async (newReview) => {
    try {
      const response = await fetch(
        "https://react-musichub-backend.onrender.com/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReviews((prevReviews) => [...prevReviews, data]);
      } else {
        console.error(data.message);
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
