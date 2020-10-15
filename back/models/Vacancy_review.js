const mongoose = require('mongoose');

const vacancyReviewSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  vacancy_id: {
    type: String,
    required: true,
  },
  response: Boolean,
  message: String,
});

module.exports = mongoose.model('Vacancy_review', vacancyReviewSchema);
