import express from 'express';
import { optimizeContent, generateSuggestions, getAiStatus, updateAiConfig } from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/status', getAiStatus);
router.put('/config', updateAiConfig);
router.post('/optimize', optimizeContent);
router.post('/suggest', generateSuggestions);

export default router;
