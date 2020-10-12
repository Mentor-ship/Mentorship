const express = require('express');
const router = express.Router();
const CV = require('../models/CV');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const cvs = await CV.find();
    res.json(cvs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getCV, (req, res) => {
  res.send(res.cv);
});

//POST ONE
router.post('/', async (req, res) => {
  const cv = new CV({
    student_id: req.body.student_id,
    city: req.body.city,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    nationality: req.body.nationality,
    education: req.body.education,
    work_experience: req.body.work_experience,
    speciality: req.body.speciality,
    cisalaryty: req.body.salary,
    currency_code: req.body.currency_code,
    language: req.body.language,
  });

  try {
    const newCV = await cv.save();
    res.status(200).json(newCV);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getCV(req, res, next) {
  let cv;
  try {
    cv = await CV.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.cv = cv;
  next();
}

module.exports = router;
