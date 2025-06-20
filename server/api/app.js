import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (res) => {
  res.send('Welcome to the TODOLIST API!');
});

export default app;