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
router.get('/:id', getVacancy_review, (req, res) => {
  res.send(res.vacancy_review);
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
    const newVacancy_review = await vacancy_review.save();
    res.status(200).json(newVacancy_review);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//UPDATE ONE
router.put('/:id', getVacancy_review, async (req, res) => {
  if (req.body.student_id && req.body.student_id !== '') {
    res.vacancy_review.student_id = req.body.student_id;
  }
  if (req.body.vacancy_id && req.body.vacancy_id !== '') {
    res.vacancy_review.vacancy_id = req.body.vacancy_id;
  }
  if (req.body.response) {
    res.vacancy_review.response = req.body.response;
  }
  if (req.body.message && req.body.message !== '') {
    res.vacancy_review.message = req.body.message;
  }
  try {
    const updatedVacancy_review = await res.vacancy_review.save();
    res.json(updatedVacancy_review);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getVacancy_review, async (req, res) => {
  try {
    await res.vacancy_review.remove();
    res.status(200).json({
      message: 'Vacancy review deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

async function getVacancy_review(req, res, next) {
  let vacancy_review;
  try {
    vacancy_review = await Vacancy_review.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.vacancy_review = vacancy_review;
  next();
}

module.exports = router;
