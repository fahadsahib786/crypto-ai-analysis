// routes/formDataRoutes.js
import express from 'express';
import { analyseSubmittedFormData, emailFormData} from '../controllers/formController.js'; // Ensure the path is correct

const router = express.Router();

// Define the POST route for form submission
router.post('/submit', analyseSubmittedFormData);
router.post('/email', emailFormData)

export default router;
