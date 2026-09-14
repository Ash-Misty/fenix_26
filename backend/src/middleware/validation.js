import { body, param, validationResult } from 'express-validator';
import PricingConfig from '../models/Event.js';
import logger from '../utils/logger.js';

export const validate = (req, res, next) => {
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
};

export const validateRegistration = [
  body('teamName').trim().notEmpty().withMessage('Team name is required').isLength({ min: 2, max: 100 }),
  body('teamLeader').trim().notEmpty().withMessage('Team leader name is required').isLength({ min: 2, max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ min: 10, max: 15 }).matches(/^\d+$/).withMessage('Phone must contain only digits'),
  body('college').trim().notEmpty().withMessage('College is required').isLength({ min: 2, max: 200 }),
  body('department').trim().notEmpty().withMessage('Department is required').isLength({ min: 2, max: 200 }),
  body('year').isInt({ min: 1, max: 5 }).withMessage('Year must be between 1 and 5'),
  body('registrationType').isIn(['Individual', 'Team']).withMessage('Registration type must be Individual or Team'),

  body('registrationType').custom((registrationType, { req }) => {
    if (registrationType === 'Individual') {
      if (req.body.participants && req.body.participants.length > 0) {
        throw new Error('Participants should not be provided for Individual registration');
      }
    }
    if (registrationType === 'Team') {
      if (!req.body.participants || req.body.participants.length === 0) {
        throw new Error('At least one participant is required for Team registration');
      }
      if (req.body.participants.length < 2 || req.body.participants.length > 3) {
        throw new Error('Team must have between 2 and 3 participants');
      }
    }
    return true;
  }),

  body('participants').optional().isArray().withMessage('Participants must be an array'),
  body('participants.*.name').optional().trim().notEmpty().withMessage('Participant name is required'),
  body('participants.*.email').optional().trim().isEmail().withMessage('Participant email must be valid'),
  body('participants.*.phone').optional().trim().matches(/^\d{10,15}$/).withMessage('Participant phone must be 10-15 digits'),
  body('participants.*.year').optional().isInt({ min: 1, max: 5 }).withMessage('Participant year must be between 1 and 5'),

  body('selectedEvents').isArray({ min: 1 }).withMessage('At least one event must be selected'),
  body('selectedEvents.*').isString().withMessage('Each event must be a string'),

  body('workshops').optional().isArray().withMessage('Workshops must be an array'),
  body('workshops.*').optional().isString().withMessage('Each workshop must be a string'),

  body('foodPreference').optional().isIn(['Vegetarian', 'Non-vegetarian']).withMessage('Invalid food preference'),

  body('selectedEvents').custom(async (eventSlugs) => {
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new Error('Event pricing not configured');
    }
    const validSlugs = new Set(config.events.map((e) => e.slug));
    const invalid = eventSlugs.filter((slug) => !validSlugs.has(slug));
    if (invalid.length > 0) {
      throw new Error(`Invalid events: ${invalid.join(', ')}`);
    }
    return true;
  }),

  body('workshops').custom(async (workshopSlugs) => {
    if (!workshopSlugs || workshopSlugs.length === 0) return true;
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new Error('Workshop pricing not configured');
    }
    const validSlugs = new Set(config.workshops.map((w) => w.slug));
    const invalid = workshopSlugs.filter((slug) => !validSlugs.has(slug));
    if (invalid.length > 0) {
      throw new Error(`Invalid workshops: ${invalid.join(', ')}`);
    }
    return true;
  }),

  validate,
];

export const validatePaymentScreenshotUpload = [
  param('registrationId').trim().notEmpty().withMessage('Registration ID is required'),
  validate,
];

export const validateVerifyPayment = [
  param('registrationId').trim().notEmpty().withMessage('Registration ID is required'),
  body('verifiedBy').trim().notEmpty().withMessage('Verifier name is required').isLength({ min: 2, max: 100 }).optional(),
  body('rejectionReason').trim().optional().isLength({ max: 500 }),
  validate,
];

export const validateAdminLogin = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().normalizeEmail(),
  body('password').trim().notEmpty().withMessage('Password is required'),
  validate,
];
