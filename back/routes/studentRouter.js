const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      z,
    });
  }
});

// GET ONE
router.get('/:id', getStudent, (req, res) => {
  res.send(res.student);
});

//POST ONE
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newStudent = await student.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }

  res.student = student;
  next();
}

module.exports = router;
