import http from 'http';
import {config} from "dotenv";
import app from './app.js';

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
  config();
}

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
