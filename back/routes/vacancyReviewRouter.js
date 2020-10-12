const express = require('express');
const router = express.Router();
const Vacancy_review = require('../models/Vacancy_review');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const vacancy_reviews = await Vacancy_review.find();
    res.json(vacancy_reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getVacancy_reveiw, (req, res) => {
  res.send(res.vacancy_reviews);
});

//POST ONE
router.post('/', async (req, res) => {
  const vacancy_review = new Vacancy_review({
    student_id: req.body.student_id,
    vacancy_id: req.body.vacancy_id,
    response: req.body.response,
    message: req.body.message,
  });

  try {
    const newVacancy_reveiw = await vacancy_review.save();
    res.status(200).json(newVacancy_reveiw);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getVacancy_reveiw(req, res, next) {
  let vacancy_reviews;
  try {
    vacancy_reviews = await Vacancy_reviews.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.vacancy_reviews = vacancy_reviews;
  next();
}

module.exports = router;
