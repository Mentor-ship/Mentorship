import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';

import 'dotenv/config';

// Importing routers
import LanguageRouter from './routers/LanguageRouter';
import ImageRouter from './routers/ImageRouter';
import InstitutionRouter from './routers/InstitutionRouter';
import SkillRouter from './routers/SkillRouter';
import CVRouter from './routers/CVRouter';
import GroupRouter from './routers/GroupRouter';
import LicenseRouter from './routers/LicenseRouter';

const app: Application = express();

const connect = mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', (error) => console.log(error));
connection.once('open', () => {
  console.log('Connected to Database');
});

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world😎',
  });
});

// Applying imported routers in routes
app.use('/languages', LanguageRouter);
app.use('/images', ImageRouter);
app.use('/institutions', InstitutionRouter);
app.use('/skills', SkillRouter);
app.use('/cvs', CVRouter);
app.use('/groups', GroupRouter);
app.use('/licenses', LicenseRouter);

// Listening to the port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
