import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.js';
import taskRoutes from '../routes/task.js';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

//hello
app.get('/', (req, res) => {
  res.send('Welcome to the TODOLIST API!');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the TODOLIST API! This is the API for managing your tasks.');
});

export default app;