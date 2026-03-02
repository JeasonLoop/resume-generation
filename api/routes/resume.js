import express from 'express';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  deleteResumesBatch
} from '../controllers/resumeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken); // Protect all resume routes

router.post('/', createResume);
router.get('/', getResumes);
router.post('/batch-delete', deleteResumesBatch);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

export default router;
