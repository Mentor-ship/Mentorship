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
    password: req.body.password,
    createdAt: req.body.createdAt,
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

//UPDATE ONE
router.put('/:id', getStudent, async (req, res) => {
  if (req.body.name && req.body.name !== '') {
    res.student.name = req.body.name;
  }
  if (req.body.surname && req.body.surname !== '') {
    res.student.surname = req.body.surname;
  }
  if (req.body.email && req.body.email !== '') {
    res.student.email = req.body.email;
  }
  if (req.body.phone && req.body.phone !== '') {
    res.student.phone = req.body.phone;
  }
  if (req.body.password && req.body.password !== '') {
    res.student.password = req.body.password;
  }
  if (req.body.createdAt && req.body.createdAt !== '') {
    res.student.createdAt = req.body.createdAt;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.status(200).json({
      message: 'Student',
    });
  } catch (error) {
    res.status(500).json({
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
