import express from 'express';
import { getAnalysisById, analyseCryptoData, getAnalysisByTokenName, getAnalysisByTokenCode, updateAnalysisBytokenCode } from '../controllers/analysisController.js'; // Adjust path as needed

const router = express.Router();


// Route to fetch analysis by ID
router.get('/:id', getAnalysisById);
router.post('/submitCryptoData',analyseCryptoData)

router.post('/getAnalysis',getAnalysisByTokenName)

router.post('/getAnalysisByCode',getAnalysisByTokenCode)

router.post('/updateAnalysisBytokenCode', updateAnalysisBytokenCode);

export default router;
