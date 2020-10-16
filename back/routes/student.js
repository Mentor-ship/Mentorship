const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth');

const Student = require('../models/Student');

/**
 * @method - POST
 * @param - /signup
 * @description - Student SignUp
 */

router.post(
  '/signup',
  [
    check('name', 'Please Enter a Valid Name').not().isEmpty(),
    check('surname', 'Please Enter a Valid Surname').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('phone', 'Please enter a valid phone').not().isEmpty(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, surname, email, phone, password } = req.body;
    try {
      let student = await Student.findOne({
        email,
      });
      if (student) {
        return res.status(400).json({
          msg: 'Student Already Exists',
        });
      }

      student = new Student({
        name,
        surname,
        email,
        phone,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();

      const payload = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        },
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Error in Saving');
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let student = await Student.findOne({
        email,
      });
      if (!student)
        return res.status(400).json({
          message: 'Student Not Exist',
        });

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch)
        return res.status(400).json({
          message: 'Incorrect Password !',
        });

      const payload = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: 'Server Error',
      });
    }
  },
);

/**
 * @method - POST
 * @description - Get LoggedIn Student
 * @param - /student/me
 */

router.get('/me', auth, async (req, res) => {
  let student;
  try {
    // request.student is getting fetched from Middleware after token authentication
    student = await Student.findById(req.student.id);
  } catch (error) {
    res.send({ message: error.message });
  }
  res.json(student);
});

module.exports = router;
