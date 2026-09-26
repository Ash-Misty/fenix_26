import { createHash } from 'crypto';
import Registration from '../models/Registration.js';
import PricingConfig from '../models/Event.js';
import { calculateAmount, getRegistrationByRegId, checkDuplicateRegistration } from '../services/paymentService.js';
import { uploadScreenshot } from '../services/cloudinaryService.js';
import { generateUPIPayload, generateQRCode } from '../services/qrService.js';
import { createTemporaryPaymentUploadToken, verifyTemporaryPaymentUploadToken } from '../services/temporaryPaymentUploadService.js';
import { sendAdminNotification, sendRegistrationPendingEmail } from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

const REGISTRATION_COUNT_BASELINE = 60;

async function quote(input) {
  const { selectedEvents = [], workshops = [], registrationType, participants = [] } = input;
  const { totalAmount, eventDetails } = await calculateAmount(selectedEvents, workshops, registrationType, participants.length);
  const upiPayload = await generateUPIPayload(totalAmount, process.env.UPI_ID, process.env.UPI_NAME);
  return { totalAmount, eventDetails, upiPayload };
}

export async function generateRegistrationPaymentQuote(req, res, next) {
  try {
    const { totalAmount, upiPayload } = await quote(req.body);
    res.json({ success: true, data: { totalAmount, payment: { qrCode: await generateQRCode(upiPayload), upiPayload } }, message: 'Payment QR generated. Final submission is required to register.' });
  } catch (error) { next(error); }
}

export async function uploadTemporaryPaymentScreenshot(req, res, next) {
  try {
    if (!req.file) throw new AppError('No screenshot file uploaded', 400, 'NO_FILE');
    const upload = await uploadScreenshot(req.file, `event-temp-${Date.now()}`, 'temporary-event-payments');
    const paymentUploadToken = createTemporaryPaymentUploadToken({ ...upload, scope: 'event' });
    res.status(201).json({ success: true, data: { paymentUploadToken }, message: 'Screenshot uploaded. Complete final submission to register.' });
  } catch (error) {
    if (error.code === 'CLOUDINARY_NOT_CONFIGURED') return next(new AppError('Screenshot upload service is not configured', 503, 'CLOUDINARY_NOT_CONFIGURED'));
    next(error);
  }
}

export async function createRegistration(req, res, next) {
  try {
    const { teamName, teamLeader, email, phone, college, department, year, registrationType, participants = [], selectedEvents = [], workshops = [], foodPreference = 'Vegetarian', foodPreferences = [], paymentUploadToken } = req.body;
    const existing = await checkDuplicateRegistration(email);
    if (existing && existing.registrationStatus !== 'rejected') throw new AppError('Registration already exists for this email', 409, 'DUPLICATE_REGISTRATION');

    let screenshot;
    try { screenshot = verifyTemporaryPaymentUploadToken(paymentUploadToken, 'event'); }
    catch (error) { throw new AppError(error.message, 400, 'INVALID_PAYMENT_SCREENSHOT'); }

    const config = await PricingConfig.findOne();
    if (!config) throw new AppError('Pricing configuration not found', 503, 'CONFIG_MISSING');
    const { totalAmount, eventDetails, upiPayload } = await quote({ selectedEvents, workshops, registrationType, participants });
    const registration = new Registration({
      teamName, teamLeader, email, phone, college, department, year, registrationType,
      participants: registrationType === 'Team' ? participants : [], foodPreferences, selectedEvents: eventDetails,
      workshops: workshops.map((id) => ({ workshopId: id, workshopName: id, amount: config.workshops.find((item) => item.slug === id)?.price || 0 })),
      totalAmount, foodPreference, submissionKey: createHash('sha256').update(paymentUploadToken).digest('hex'),
      payment: { status: 'PENDING_VERIFICATION', amount: totalAmount, qrPayload: upiPayload, upiPayload, screenshotUrl: screenshot.url, screenshotPublicId: screenshot.publicId, uploadedAt: new Date() },
      registrationStatus: 'payment_submitted',
    });
    await registration.save();
    logger.info(`Final registration created: ${registration.registrationId}`);
    const results = await Promise.allSettled([sendRegistrationPendingEmail(registration), sendAdminNotification(registration)]);
    if (results[1].status === 'fulfilled' && results[1].value !== false) { registration.emailsSent.adminNotification = true; await registration.save(); }
    results.filter((result) => result.status === 'rejected').forEach((result) => logger.error(`Registration email failed: ${result.reason?.message || result.reason}`));
    res.status(201).json({ success: true, data: { registrationId: registration.registrationId, totalAmount, paymentStatus: registration.payment.status, registrationStatus: registration.registrationStatus }, message: 'Registration submitted successfully and is under review.' });
  } catch (error) {
    if (error?.code === 11000) return next(new AppError('This registration was already submitted', 409, 'DUPLICATE_REGISTRATION'));
    next(error);
  }
}

export async function getRegistration(req, res, next) {
  try {
    const registration = await getRegistrationByRegId(req.params.registrationId);
    if (!registration) throw new AppError('Registration not found', 404, 'REGISTRATION_NOT_FOUND');
    res.json({ success: true, data: registration, message: 'Registration retrieved successfully' });
  } catch (error) { next(error); }
}

export async function getRegistrationCount(req, res, next) {
  try {
    const storedCount = await Registration.countDocuments({ registrationStatus: { $ne: 'rejected' } });
    res.json({ success: true, data: { count: REGISTRATION_COUNT_BASELINE + storedCount, storedCount } });
  } catch (error) { next(error); }
}
