import { Router } from 'express';
import {
  createAnnouncement, getAnnouncements, getAnnouncementById,
  updateAnnouncement, deleteAnnouncement, getAllAnnouncements,
} from '../controllers/announcementController.js';
import { authMiddleware } from '../middleware/auth.js';
import { body, param, validationResult } from 'express-validator';
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

router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);
router.post('/', authMiddleware,
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2, max: 200 }),
  body('content').trim().notEmpty().withMessage('Content is required').isLength({ min: 10, max: 10000 }),
  validate,
  createAnnouncement
);
router.put('/:id', authMiddleware,
  param('id').trim().notEmpty().withMessage('Announcement ID is required'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('published').optional().isBoolean().withMessage('Published must be a boolean'),
  validate,
  updateAnnouncement
);
router.delete('/:id', authMiddleware,
  param('id').trim().notEmpty().withMessage('Announcement ID is required'),
  validate,
  deleteAnnouncement
);

export default router;
