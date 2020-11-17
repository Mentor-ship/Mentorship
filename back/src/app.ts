import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';
import Grid from 'gridfs-stream';

import 'dotenv/config';

// Importing routers
import LanguageRouter from './routers/LanguageRouter';

const app: Application = express();

const connect = mongoose.createConnection(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;

connect.on('error', (error) => console.log(error));
connect.once('open', () => {
  console.log('Connected to Database');

  // Init stream
  // gfs = Grid(connect.db, mongoose.mongo);
  // gfs.collection('images');
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

// Listening to the port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
