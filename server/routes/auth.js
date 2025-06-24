import express from 'express';
import { handleValidationErrors, validateRegister } from '../middleware/registerMiddleware.js';
import { register, login, getUser, forgetPassword, resetPassword, updatePassword ,refreshToken} from '../controllers/auth.js';
import { protect, verifyRefreshToken } from '../middleware/authMiddleware.js'
import { resetValidator,handleResetValidationErrors } from '../middleware/resetMiddleware.js';
import { updateValidator,handleUpdateValidationErrors } from '../middleware/updateMiddleware.js';

const authRoutes = express.Router();

authRoutes.get('/me', protect, getUser)
authRoutes.post('/register', validateRegister, handleValidationErrors, register);
authRoutes.post('/login', login);
authRoutes.post('/forget-password', forgetPassword)
authRoutes.post('/reset-password/:token', resetValidator, handleResetValidationErrors, resetPassword);
authRoutes.put('/update-password', updateValidator, handleUpdateValidationErrors, protect, updatePassword);
authRoutes.get('/refresh',verifyRefreshToken, refreshToken);

export default authRoutes;