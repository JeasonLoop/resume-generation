import express from 'express';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  deleteResumesBatch,
  getVersions,
  getVersionById,
  restoreVersion,
  deleteVersion
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

// Version history routes
router.get('/:id/versions', getVersions);
router.get('/:id/versions/:versionId', getVersionById);
router.post('/:id/versions/:versionId/restore', restoreVersion);
router.delete('/:id/versions/:versionId', deleteVersion);

export default router;
