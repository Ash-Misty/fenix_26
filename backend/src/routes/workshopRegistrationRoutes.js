import { Router } from 'express';
import { body, param } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';
import { handleUploadError, paymentScreenshotUpload } from '../middleware/upload.js';
import { validate } from '../middleware/validation.js';
import { approveWorkshopRegistration, createWorkshopRegistration, downloadVerifiedWorkshopRegistrations, listWorkshopRegistrations, uploadWorkshopScreenshot } from '../controllers/workshopRegistrationController.js';

const router = Router();
const registrationValidation = [body('name').trim().isLength({ min: 2, max: 100 }), body('email').trim().isEmail().normalizeEmail(), body('college').trim().isLength({ min: 2, max: 200 }), body('year').isInt({ min: 1, max: 5 }), body('foodPreference').isIn(['Vegetarian', 'Non-vegetarian']), validate];
const idValidation = [param('registrationId').trim().notEmpty(), validate];

router.post('/', registrationValidation, createWorkshopRegistration);
router.post('/:registrationId/payment-screenshot', idValidation, paymentScreenshotUpload, handleUploadError, uploadWorkshopScreenshot);
router.get('/admin/list', authMiddleware, listWorkshopRegistrations);
router.get('/admin/export.xlsx', authMiddleware, downloadVerifiedWorkshopRegistrations);
router.patch('/admin/:registrationId/approve', authMiddleware, idValidation, approveWorkshopRegistration);

export default router;
