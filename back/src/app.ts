import express, { Application } from 'express';
import add from './add';

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Aru krasavica');
});

console.log(add(5, 10));

app.listen(5000, () => console.log('Server is running'));
