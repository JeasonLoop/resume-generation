import express from 'express';
import { getPublicResume } from '../controllers/publicResumeController.js';

const router = express.Router();

router.get('/resume/:id', getPublicResume);

export default router;
