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
    employer_id: req.body.employer_id,
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

//UPDATE ONE
router.put('/:id', getEmployer, async (req, res) => {
  if (req.body.employer_id && req.body.employer_id !== '') {
    res.employer.employer_id = req.body.employer_id;
  }
  if (req.body.name && req.body.name !== '') {
    res.employer.name = req.body.name;
  }
  if (req.body.surname && req.body.surname !== '') {
    res.employer.surname = req.body.surname;
  }
  if (req.body.email && req.body.email !== '') {
    res.employer.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== '') {
    res.employer.phone = req.body.phone;
  }
  if (req.body.company_name && req.body.company_name !== '') {
    res.employer.company_name = req.body.company_name;
  }
  if (req.body.industry && req.body.industry !== '') {
    res.employer.industry = req.body.industry;
  }
  if (req.body.num_of_employees && req.body.num_of_employees !== '') {
    res.employer.num_of_employees = req.body.num_of_employees;
  }
  if (req.body.office_address && req.body.office_address !== '') {
    res.employer.office_address = req.body.office_address;
  }
  if (req.body.phone_office && req.body.phone_office !== '') {
    res.employer.phone_office = req.body.phone_office;
  }
  if (req.body.company_description && req.body.company_description !== '') {
    res.employer.company_description = req.body.company_description;
  }
  if (req.body.logo && req.body.logo !== '') {
    res.employer.logo = req.body.logo;
  }
  try {
    const updatedEmployer = await res.employer.save();
    res.json(updatedEmployer);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getEmployer, async (req, res) => {
  try {
    await res.employer.remove();
    res.status(200).json({
      message: 'Employer deleted',
    });
  } catch (error) {
    res.status(500).json({
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
