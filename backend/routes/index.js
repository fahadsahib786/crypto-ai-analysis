import express from 'express';
import { analyzeToken, sendEmail } from '../controllers/tokenController';

const router = express.Router();

router.post('/analyze', analyzeToken);
router.post('/send-email', sendEmail);

export default router;
