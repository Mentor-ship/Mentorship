import express, { Application } from 'express';
import dotenv from 'dotenv';
import add from './add';

dotenv.config();

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Aru krasavica');
});

console.log(add(5, 10));

app.listen(process.env.PORT, () => console.log('Server is running'));
