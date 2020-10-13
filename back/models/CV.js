const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  city: String,
  birthDate: Date,
  gender: Boolean,
  nationality: String,
  education: String,
  work_experience: {
    type: Boolean,
    required: true,
  },
  speciality: {
    type: String,
  },
  salary: Number,
  currency_code: Number,
  language: String,
});

module.exports = mongoose.model('CV', cvSchema);
