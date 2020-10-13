const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world😁',
  });
});

const studentRouter = require('./routes/studentRouter');
app.use('/students', studentRouter);

const studentEvaluationRouter = require('./routes/studentEvaluationRouter');
app.use('/student_evaluation', studentEvaluationRouter);

const employerRouter = require('./routes/employerRouter');
app.use('/employers', employerRouter);

const vacancyRouter = require('./routes/vacancyRouter');
app.use('/vacancies', vacancyRouter);

const vacancyReviewRouter = require('./routes/vacancyReviewRouter');
app.use('/vacancy_reviews', vacancyReviewRouter);

const cvRouter = require('./routes/cvRouter');
app.use('/cvs', cvRouter);

const cvReviewRouter = require('./routes/cvReviewRouter');
app.use('/cv_reviews', cvReviewRouter);

const additionalRouter = require('./routes/additionalRouter');
app.use('/additional_information', additionalRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
