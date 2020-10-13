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
    salary: req.body.salary,
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

//UPDATE ONE
router.put('/:id', getVacancy, async (req, res) => {
  if (req.body.vacancy_id && req.body.vacancy_id !== '') {
    res.vacancy.vacancy_id = req.body.vacancy_id;
  }
  if (req.body.employer_id && req.body.employer_id !== '') {
    res.vacancy.employer_id = req.body.employer_id;
  }
  if (req.body.name_of_vacancy && req.body.name_of_vacancy !== '') {
    res.vacancy.name_of_vacancy = req.body.name_of_vacancy;
  }
  if (req.body.duty && req.body.duty !== '') {
    res.vacancy.duty = req.body.duty;
  }
  if (req.body.requirements && req.body.requirements !== '') {
    res.vacancy.requirements = req.body.requirements;
  }
  if (req.body.salary) {
    res.vacancy.salary = req.body.salary;
  }
  try {
    const updatedVacancy = await res.vacancy.save();
    res.json(updatedVacancy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getVacancy, async (req, res) => {
  try {
    await res.vacancy.remove();
    res.status(200).json({
      message: 'Vacancy deleted',
    });
  } catch (error) {
    res.status(500).json({
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
