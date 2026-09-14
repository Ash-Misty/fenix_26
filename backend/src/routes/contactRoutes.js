import { Router } from 'express';
import { createContact } from '../controllers/contactController.js';
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

router.post('/',
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 2, max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 5000 }),
  body('phone').optional().trim().matches(/^\d{10,15}$/).withMessage('Phone must be 10-15 digits'),
  validate,
  createContact
);

export default router;
