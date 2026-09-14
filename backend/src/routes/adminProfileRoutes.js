import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/adminProfileController.js';
import { authMiddleware } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => `${e.msg}`);
    logger.warn(`Validation failed: ${messages.join(', ')}`);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors: messages,
    });
  }
  next();
}

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware,
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ min: 2, max: 100 }),
  validate,
  updateProfile
);

export default router;
