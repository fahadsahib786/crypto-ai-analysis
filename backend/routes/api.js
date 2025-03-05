const express = require('express');
const router = express.Router();
const { analyzeToken } = require('../controllers/analysisController');
const { subscribe } = require('../controllers/subscriptionController');

router.post('/analyze', analyzeToken);
router.post('/subscribe', subscribe);

module.exports = router;
