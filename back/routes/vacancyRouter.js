const express = require('express');
const router = express.Router();
const Vacancy = require('../models/Vacancy');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getVacancy, (req, res) => {
  res.send(res.vacancy);
});

//POST ONE
router.post('/', async (req, res) => {
  const vacancy = new Vacancy({
    vacancy_id: req.body.vacancy_id,
    employer_id: req.body.employer_id,
    name_of_vacancy: req.body.name_of_vacancy,
    duty: req.body.duty,
    requirements: req.body.requirements,
  });

  try {
    const newVacancy = await vacancy.save();
    res.status(200).json(newVacancy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getVacancy(req, res, next) {
  let vacancy;
  try {
    vacancy = await Vacancy.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.vacancy = vacancy;
  next();
}

module.exports = router;
