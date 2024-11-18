const express = require("express");
const Joi = require("joi");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let reviews = [
  {
    id: 1,
    title: "Dreams",
    artist: "Benjamin Tissot",
    reviewer: "Jane Doe",
    rating: 4,
    review: "Relaxing and chill-out vibes, perfect for unwinding after a long day!",
  },
];

const reviewSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
  reviewer: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().required(),
});

// GET to fetch review
app.get("/reviews", (req, res) => {
  res.send(reviews);
});

// POST to add review
app.post("/reviews", (req, res) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const newReview = { id: reviews.length + 1, ...req.body };
  reviews.push(newReview);
  res.status(201).send(newReview);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
