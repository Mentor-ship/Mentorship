const mongoose = require('mongoose');

const additionalSchema = new mongoose.Schema({
  cv_id: {
    type: String,
    required: true,
  },
  foreign_language: String,
  removal: Number,
  time_jobs: Number,
  schedule: Number,
  driver_license: String,
  availability_of_car: Boolean,
});

module.exports = mongoose.model('Additional_info', additionalSchema);
