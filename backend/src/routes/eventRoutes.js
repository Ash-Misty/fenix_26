import { Router } from 'express';
import {
  getEvents, createEvent, updateEvent, deleteEvent,
  getWorkshops, createWorkshop, updateWorkshop, deleteWorkshop,
  getPricingConfig, updatePricingConfig,
} from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';
import {
  body,
  param,
  validationResult,
} from 'express-validator';
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

router.get('/events', authMiddleware, getEvents);
router.post('/events', authMiddleware,
  body('name').trim().notEmpty().withMessage('Event name is required'),
  body('slug').trim().notEmpty().withMessage('Event slug is required'),
  body('category').isIn(['Technical', 'Non-Technical']).withMessage('Category must be Technical or Non-Technical'),
  body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a non-negative number'),
  validate,
  createEvent
);
router.put('/events/:slug', authMiddleware,
  param('slug').trim().notEmpty().withMessage('Event slug is required'),
  body('name').optional().trim().notEmpty().withMessage('Event name cannot be empty'),
  body('category').optional().isIn(['Technical', 'Non-Technical']).withMessage('Category must be Technical or Non-Technical'),
  body('basePrice').optional().isFloat({ min: 0 }).withMessage('Base price must be a non-negative number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  validate,
  updateEvent
);
router.delete('/events/:slug', authMiddleware,
  param('slug').trim().notEmpty().withMessage('Event slug is required'),
  validate,
  deleteEvent
);

router.get('/workshops', authMiddleware, getWorkshops);
router.post('/workshops', authMiddleware,
  body('name').trim().notEmpty().withMessage('Workshop name is required'),
  body('slug').trim().notEmpty().withMessage('Workshop slug is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  validate,
  createWorkshop
);
router.put('/workshops/:slug', authMiddleware,
  param('slug').trim().notEmpty().withMessage('Workshop slug is required'),
  body('name').optional().trim().notEmpty().withMessage('Workshop name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  validate,
  updateWorkshop
);
router.delete('/workshops/:slug', authMiddleware,
  param('slug').trim().notEmpty().withMessage('Workshop slug is required'),
  validate,
  deleteWorkshop
);

router.get('/pricing', authMiddleware, getPricingConfig);
router.put('/pricing', authMiddleware,
  body('individualBaseFee').optional().isFloat({ min: 0 }).withMessage('Individual base fee must be a non-negative number'),
  body('individualExtraFee').optional().isFloat({ min: 0 }).withMessage('Individual extra fee must be a non-negative number'),
  body('team2BaseFee').optional().isFloat({ min: 0 }).withMessage('Team 2 base fee must be a non-negative number'),
  body('team2ExtraFee').optional().isFloat({ min: 0 }).withMessage('Team 2 extra fee must be a non-negative number'),
  body('team3BaseFee').optional().isFloat({ min: 0 }).withMessage('Team 3 base fee must be a non-negative number'),
  body('team3ExtraFee').optional().isFloat({ min: 0 }).withMessage('Team 3 extra fee must be a non-negative number'),
  body('maxTechPerRegistration').optional().isInt({ min: 1 }).withMessage('Max tech must be at least 1'),
  body('maxNonTechPerRegistration').optional().isInt({ min: 1 }).withMessage('Max non-tech must be at least 1'),
  validate,
  updatePricingConfig
);

export default router;
