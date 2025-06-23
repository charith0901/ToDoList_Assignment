import http from 'http';
import { config } from 'dotenv';
import app from './app.js';
import connect from '../config/db.js';

// Load env vars
if (process.env.NODE_ENV !== 'production') {
  config();
}

(async () => {
  try {
    await connect(); 
    console.log('Connected to MongoDB');

    const server = http.createServer(app);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
})();
