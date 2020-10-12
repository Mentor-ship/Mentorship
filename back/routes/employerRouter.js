const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getEmployer, (req, res) => {
  res.send(res.employer);
});

//POST ONE
router.post('/', async (req, res) => {
  const employer = new Employer({
    vacancy_id: req.body.vacancy_id,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    company_name: req.body.company_name,
    industry: req.body.industry,
    bin: req.body.bin,
    office_address: req.body.office_address,
    phone_office: req.body.phone_office,
    company_description: req.body.company_description,
    logo: req.body.logo,
  });

  try {
    const newEmployer = await employer.save();
    res.status(200).json(newEmployer);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getEmployer(req, res, next) {
  let employer;
  try {
    employer = await Employer.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.employer = employer;
  next();
}

module.exports = router;
