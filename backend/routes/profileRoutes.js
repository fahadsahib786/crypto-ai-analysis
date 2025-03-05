import express from 'express';
import { getProfile, updatePassword, updateProfile, upload } from '../controllers/profileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/fetch', getProfile);
router.put('/update',upload.single('image'), updateProfile);
router.put('/update/password', authMiddleware, updatePassword);

export default router;
