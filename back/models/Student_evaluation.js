const mongoose = require('mongoose');

const studentEvaluationSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  employer_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student_evaluation', studentEvaluationSchema);
