import express from 'express';
import { getRecentAnalyses } from '../controllers/landingPageController.js';

const router = express.Router();

router.get('/recent-analyses', getRecentAnalyses);

export default router;
