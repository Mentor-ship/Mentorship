const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (res, req) => {
  req.json({
    message: 'Hello, ' + process.env.platform,
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
