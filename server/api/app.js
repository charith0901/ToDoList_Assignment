import express from 'express';
import cors from 'cors';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//hello
app.get('/', (req, res) => {
  res.send('Welcome to the TODOLIST API!');
});

//routes

export default app;