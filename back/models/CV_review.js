const mongoose = require('mongoose');

const cvReviewSchema = new mongoose.Schema({
  cv_id: {
    type: String,
    required: true,
  },
  employer_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('CV_review', cvReviewSchema);
