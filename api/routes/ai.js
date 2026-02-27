import express from 'express';
import { optimizeContent, generateSuggestions } from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/optimize', optimizeContent);
router.post('/suggest', generateSuggestions);

export default router;
