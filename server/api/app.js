import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.js';

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
app.use('/api/auth', authRoutes);

export default app;