import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard/stats', authMiddleware, getDashboardStats);

export default router;
