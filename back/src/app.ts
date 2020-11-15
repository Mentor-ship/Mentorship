import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config';

// Importing routers
import LanguageRouter from './routers/LanguageRouter';

const app: Application = express();

mongoose.connect(process.env.MONGO_URI!, {
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
    message: 'Hello world😎',
  });
});

// Applying imported routers in routes
app.use('/languages', LanguageRouter);

// Listening to the port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
