const express = require('express');
const router = express.Router();
const Vacancy = require('../models/Vacancy');
const Employer = require('../models/Employer');

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
    employer_id: req.body.employer_id,
    name_of_vacancy: req.body.name_of_vacancy,
    duty: req.body.duty,
    requirements: req.body.requirements,
    salary: req.body.salary,
    country: req.body.country,
    city: req.body.city,
    experience: req.body.experience,
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
  if (req.body.country && req.body.country !== '') {
    res.vacancy.country = req.body.country;
  }
  if (req.body.city && req.body.city !== '') {
    res.vacancy.city = req.body.city;
  }
  if (req.body.experience && req.body.experience !== '') {
    res.vacancy.experience = req.body.experience;
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

// POST method getCompanyName
// TODO: move it to another route
router.post('/getCompanyName', async (req, res) => {
  if (req.body.employer_id) {
    let employer;
    try {
      employer = await Employer.findOne({
        _id: req.body.employer_id,
      });
    } catch (error) {
      return res.json({
        message: error.message,
      });
    }
    if (!employer) res.json({ message: 'There is no such employer' });
    res.json({company_name: employer.company_name});
  } else {
    res.status(400).json({ message: 'You forgot employer_id' });
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
