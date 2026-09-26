import { Router } from 'express';
import { body, param } from 'express-validator';
import { authMiddleware } from '../middleware/auth.js';
import { handleUploadError, paymentScreenshotUpload } from '../middleware/upload.js';
import { validate } from '../middleware/validation.js';
import { approveWorkshopRegistration, createWorkshopRegistration, downloadVerifiedWorkshopRegistrations, generateWorkshopPaymentQuote, listWorkshopRegistrations, uploadWorkshopScreenshot } from '../controllers/workshopRegistrationController.js';

const router = Router();
const registrationFields = [body('name').trim().isLength({ min: 2, max: 100 }), body('email').trim().isEmail().normalizeEmail(), body('college').trim().isLength({ min: 2, max: 200 }), body('year').isInt({ min: 1, max: 4 }), body('foodPreference').isIn(['Vegetarian', 'Non-vegetarian'])];
const quoteValidation = [...registrationFields, validate];
const registrationValidation = [...registrationFields, body('paymentUploadToken').isString().trim().notEmpty().withMessage('Upload the payment screenshot before final submission'), validate];
const idValidation = [param('registrationId').trim().notEmpty(), validate];

router.post('/payment-quote', quoteValidation, generateWorkshopPaymentQuote);
router.post('/payment-screenshot', paymentScreenshotUpload, handleUploadError, uploadWorkshopScreenshot);
router.post('/', registrationValidation, createWorkshopRegistration);
router.get('/admin/list', authMiddleware, listWorkshopRegistrations);
router.get('/admin/export.xlsx', authMiddleware, downloadVerifiedWorkshopRegistrations);
router.patch('/admin/:registrationId/approve', authMiddleware, idValidation, approveWorkshopRegistration);

export default router;
