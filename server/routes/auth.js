import express from 'express';
import { handleValidationErrors, validateRegister } from '../middleware/registerMiddleware.js';
import { register, login, getUser, forgetPassword, resetPassword} from '../controllers/auth.js';
import { protect } from '../middleware/authMiddleware.js'

const authRoutes = express.Router();

authRoutes.get('/me', protect, getUser)
authRoutes.post('/register', validateRegister, handleValidationErrors, register);
authRoutes.post('/login', login);
authRoutes.post('/forget-password', forgetPassword)
authRoutes.post('/reset-password/:token', resetPassword);

export default authRoutes;