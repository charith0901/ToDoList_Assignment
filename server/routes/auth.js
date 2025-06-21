import express from 'express';
import { handleValidationErrors, validateRegister } from '../middleware/registerMiddleware.js';
import { register, login } from '../controllers/auth.js';
import { protect } from '../middleware/authMiddleware.js'

const authRoutes = express.Router();

authRoutes.post('/register', validateRegister, handleValidationErrors, register);
authRoutes.post('/login', login);
authRoutes.get('/me', protect, (req,res) => { res.status(200) })

export default authRoutes;