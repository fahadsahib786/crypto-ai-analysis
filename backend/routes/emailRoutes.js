import express from 'express';
import { sendAnalysisEmailController } from "../controllers/emailController.js";

const router = express.Router()


router.post('/sendAnalysisEmail',sendAnalysisEmailController);

export default router;