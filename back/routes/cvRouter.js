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

//UPDATE ONE
router.put('/:id', getCV, async (req, res) => {
  if (req.body.student_id && req.body.student_id !== '') {
    res.cv.student_id = req.body.student_id;
  }
  if (req.body.city && req.body.city !== '') {
    res.cv.city = req.body.city;
  }
  if (req.body.birthDate && req.body.birthDate !== '') {
    res.cv.birthDate = req.body.birthDate;
  }
  if (req.body.gender && req.body.gender !== '') {
    res.cv.gender = req.body.gender;
  }
  if (req.body.nationality && req.body.nationality !== '') {
    res.cv.nationality = req.body.nationality;
  }
  if (req.body.education && req.body.education !== '') {
    res.cv.education = req.body.education;
  }
  if (req.body.work_experience && req.body.work_experience !== '') {
    res.cv.work_experienceDate = req.body.work_experience;
  }
  if (req.body.speciality && req.body.speciality !== '') {
    res.cv.speciality = req.body.speciality;
  }
  if (req.body.salary && req.body.salary !== '') {
    res.cv.salary = req.body.salary;
  }
  if (req.body.currency_code && req.body.currency_code !== '') {
    res.cv.currency_code = req.body.currency_code;
  }
  if (req.body.language && req.body.language !== '') {
    res.cv.language = req.body.language;
  }
  try {
    const updatedCV = await res.cv.save();
    res.json(updatedCV);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV, async (req, res) => {
  try {
    await res.cv.remove();
    res.status(200).json({
      message: 'CV deleted',
    });
  } catch (error) {
    res.status(500).json({
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
