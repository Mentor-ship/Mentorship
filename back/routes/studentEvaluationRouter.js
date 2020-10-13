const express = require('express');
const router = express.Router();
const Student_evaluation = require('../models/Student_evaluation');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const student_evaluations = await Student_evaluation.find();
    res.json(student_evaluations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getStudent_evaluation, (req, res) => {
  res.send(res.student_evaluation);
});

//POST ONE
router.post('/', async (req, res) => {
  const student_evaluation = new Student_evaluation({
    student_id: req.body.student_id,
    employer_id: req.body.employer_id,
    rating: req.body.rating,
    description: req.body.description,
  });

  try {
    const newStudent_evaluation = await student_evaluation.save();
    res.status(200).json(newStudent_evaluation);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//UPDATE ONE
router.put('/:id', getStudent_evaluation, async (req, res) => {
  if (req.body.student_id && req.body.student_id !== '') {
    res.student_evaluation.student_id = req.body.student_id;
  }
  if (req.body.employer_id && req.body.employer_id !== '') {
    res.student_evaluation.employer_id = req.body.employer_id;
  }
  if (req.body.rating) {
    res.student_evaluation.rating = req.body.rating;
  }
  if (req.body.description && req.body.description !== '') {
    res.student_evaluation.description = req.body.description;
  }
  try {
    const updatedStudent_evaluation = await res.student_evaluation.save();
    res.json(updatedStudent_evaluation);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getStudent_evaluation, async (req, res) => {
  try {
    await res.student_evaluation.remove();
    res.status(200).json({
      message: 'Student evluation deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

async function getStudent_evaluation(req, res, next) {
  let student_evaluation;
  try {
    student_evaluation = await Student_evaluation.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.student_evaluation = student_evaluation;
  next();
}

module.exports = router;
