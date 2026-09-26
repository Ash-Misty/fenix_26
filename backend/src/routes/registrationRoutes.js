import { Router } from 'express';
import { createRegistration, generateRegistrationPaymentQuote, getRegistration, getRegistrationCount, uploadTemporaryPaymentScreenshot } from '../controllers/registrationController.js';
import { paymentScreenshotUpload, handleUploadError } from '../middleware/upload.js';
import { validateFinalRegistration, validateRegistrationQuote } from '../middleware/validation.js';

const router = Router();

// Intermediate actions never create MongoDB registration records.
router.post('/payment-quote', validateRegistrationQuote, generateRegistrationPaymentQuote);
router.post('/payment-screenshot', paymentScreenshotUpload, handleUploadError, uploadTemporaryPaymentScreenshot);

// The final complete submission is the only persistence point.
router.post('/', validateFinalRegistration, createRegistration);
router.get('/count', getRegistrationCount);
router.get('/:registrationId', getRegistration);

export default router;
