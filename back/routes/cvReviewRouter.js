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

//UPDATE ONE
router.put('/:id', getCV_review, async (req, res) => {
  if (req.body.cv_id && req.body.cv_id !== '') {
    res.cv_review.cv_id = req.body.cv_id;
  }
  if (req.body.employer_id && req.body.employer_id !== '') {
    res.cv_review.employer_id = req.body.employer_id;
  }
  if (req.body.name && req.body.name !== '') {
    res.cv_review.name = req.body.name;
  }
  if (req.body.surname && req.body.surname !== '') {
    res.cv_review.surname = req.body.surname;
  }
  if (req.body.email && req.body.email !== '') {
    res.cv_review.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== '') {
    res.cv_review.phone = req.body.phone;
  }
  try {
    const updatedCV_review = await res.cv_review.save();
    res.json(updatedCV_review);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_review, async (req, res) => {
  try {
    await res.cv_review.remove();
    res.status(200).json({
      message: 'CV review deleted',
    });
  } catch (error) {
    res.status(500).json({
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
