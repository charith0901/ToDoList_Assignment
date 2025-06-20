import http from 'http';
import {config} from "dotenv";
import app from './app.js';
import connect from '../config/db.js';

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
  config();
}

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  try {
    connect();
    console.log('Connected to MongoDB');
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});
