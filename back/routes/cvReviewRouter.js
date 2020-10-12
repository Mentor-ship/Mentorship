const express = require('express');
const router = express.Router();
const CV_review = require('../models/CV_review');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const cv_reviews = await CV_review.find();
    res.json(cv_reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getCV_review, (req, res) => {
  res.send(res.cv_review);
});

//POST ONE
router.post('/', async (req, res) => {
  const cv_review = new CV_review({
    cv_id: req.body.cv_id,
    employer_id: req.body.employer_id,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newCV_review = await cv_review.save();
    res.status(200).json(newCV_review);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getCV_review(req, res, next) {
  let cv_review;
  try {
    cv_review = await CV_review.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.cv_review = cv_review;
  next();
}

module.exports = router;
