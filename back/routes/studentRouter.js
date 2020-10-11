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
    });
  }
});

module.exports = router;
