const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
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
  company_name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  num_of_employees: Number,
  bin: {
    type: String,
    required: true,
  },
  office_address: {
    type: String,
    required: true,
  },
  phone_office: {
    type: String,
    required: true,
  },
  company_description: {
    type: String,
    required: true,
  },
  logo: String,
});

module.exports = mongoose.model('Employer', employerSchema);
