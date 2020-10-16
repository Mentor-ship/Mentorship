const express = require('express');
const router = express.Router();
const Employer_and_vacancy = require('../models/Employer_and_vacancy');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const employer_and_vacancies = await Employer_and_vacancy.find();
    res.json(employer_and_vacancies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getEmployer_and_vacancy, (req, res) => {
  res.send(res.employer_and_vacancy);
});

//POST ONE
router.post('/', async (req, res) => {
  const employer_and_vacancy = new Employer_and_vacancy({
    employer_id: req.body.employer_id,
    vacancy_id: req.body.vacancy_id,
  });

  try {
    const newEmployer_and_vacancy = await employer_and_vacancy.save();
    res.status(200).json(newEmployer_and_vacancy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//UPDATE ONE
router.put('/:id', getEmployer_and_vacancy, async (req, res) => {
  if (req.body.employer_id && req.body.employer_id !== '') {
    res.employer_and_vacancy.employer_id = req.body.employer_id;
  }
  if (req.body.vacancy_id && req.body.vacancy_id !== '') {
    res.employer_and_vacancy.vacancy_id = req.body.vacancy_id;
  }
  try {
    const updatedEmployer_and_vacancy = await res.employer_and_vacancy.save();
    res.json(updatedEmployer_and_vacancy);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getEmployer_and_vacancy, async (req, res) => {
  try {
    await res.employer_and_vacancy.remove();
    res.status(200).json({
      message: 'Relation employer and vacancy deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

async function getEmployer_and_vacancy(req, res, next) {
  let employer_and_vacancy;
  try {
    employer_and_vacancy = await Employer_and_vacancy.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.employer_and_vacancy = employer_and_vacancy;
  next();
}

module.exports = router;
