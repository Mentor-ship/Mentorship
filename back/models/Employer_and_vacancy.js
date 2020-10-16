const mongoose = require('mongoose');

const employerAndVacancySchema = new mongoose.Schema({
  employer_id: {
    type: String,
    required: true,
  },
  vacancy_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Employer_and_vacancy', employerAndVacancySchema);
