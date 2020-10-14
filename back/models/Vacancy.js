const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  vacancy_id: {
    type: Number,
    required: true,
    unique: true,
  },
  employer_id: {
    type: Number,
    required: true,
  },
  name_of_vacancy: {
    type: String,
    required: true,
  },
  duty: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  salary: Number,
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Vacancy', vacancySchema);
