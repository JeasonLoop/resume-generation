import express from 'express';
import { getTemplates, getTemplateById } from '../controllers/templateController.js';

const router = express.Router();

router.get('/', getTemplates);
router.get('/:id', getTemplateById);

export default router;
