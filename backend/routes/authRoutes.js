import express from 'express';
import { register, login, verifyOtp, logout, sendOtp, forgotPassword, resetPassword } from '../controllers/authController.js';
//import { checkBlacklist } from '../middlewares/tokenBlacklistMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/logout' ,logout);
router.post('/sendOTP',sendOtp);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword',resetPassword);



export default router;