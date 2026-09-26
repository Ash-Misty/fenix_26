import { createHash } from 'crypto';
import WorkshopRegistration from '../models/WorkshopRegistration.js';
import { uploadScreenshot } from '../services/cloudinaryService.js';
import { generateQRCode, generateUPIPayload } from '../services/qrService.js';
import { createTemporaryPaymentUploadToken, verifyTemporaryPaymentUploadToken } from '../services/temporaryPaymentUploadService.js';
import { sendWorkshopAdminNotification, sendWorkshopConfirmationEmail, sendWorkshopPendingEmail } from '../services/emailService.js';
import { buildVerifiedWorkshopRegistrationsWorkbook } from '../services/workshopRegistrationExportService.js';
import { AppError } from '../middleware/errorHandler.js';

const WORKSHOP_FEE = 250;

export async function generateWorkshopPaymentQuote(_req, res, next) {
  try {
    const upiPayload = await generateUPIPayload(WORKSHOP_FEE, process.env.UPI_ID, process.env.UPI_NAME);
    res.json({ success: true, data: { totalAmount: WORKSHOP_FEE, payment: { qrCode: await generateQRCode(upiPayload), upiPayload } }, message: 'Payment QR generated. Final submission is required to reserve a seat.' });
  } catch (error) { next(error); }
}

export async function uploadWorkshopScreenshot(req, res, next) {
  try {
    if (!req.file) throw new AppError('Upload a payment screenshot.', 400, 'NO_FILE');
    const upload = await uploadScreenshot(req.file, `workshop-temp-${Date.now()}`, 'temporary-workshop-payments');
    const paymentUploadToken = createTemporaryPaymentUploadToken({ ...upload, scope: 'workshop' });
    res.status(201).json({ success: true, data: { paymentUploadToken }, message: 'Screenshot uploaded. Complete final submission to reserve your workshop seat.' });
  } catch (error) {
    if (error.code === 'CLOUDINARY_NOT_CONFIGURED') return next(new AppError('Screenshot upload service is not configured', 503, 'CLOUDINARY_NOT_CONFIGURED'));
    next(error);
  }
}

export async function createWorkshopRegistration(req, res, next) {
  try {
    const { name, email, college, year, foodPreference, paymentUploadToken } = req.body;
    const existing = await WorkshopRegistration.findOne({ email: email.toLowerCase(), registrationStatus: { $ne: 'rejected' } }).lean();
    if (existing) throw new AppError('Workshop registration already exists for this email', 409, 'DUPLICATE_REGISTRATION');
    let screenshot;
    try { screenshot = verifyTemporaryPaymentUploadToken(paymentUploadToken, 'workshop'); }
    catch (error) { throw new AppError(error.message, 400, 'INVALID_PAYMENT_SCREENSHOT'); }
    const upiPayload = await generateUPIPayload(WORKSHOP_FEE, process.env.UPI_ID, process.env.UPI_NAME);
    const registration = await WorkshopRegistration.create({
      name, email, college, year, foodPreference, totalAmount: WORKSHOP_FEE,
      submissionKey: createHash('sha256').update(paymentUploadToken).digest('hex'),
      payment: { status: 'PENDING_VERIFICATION', qrPayload: upiPayload, screenshotUrl: screenshot.url, screenshotPublicId: screenshot.publicId, uploadedAt: new Date() },
      registrationStatus: 'payment_submitted',
    });
    await Promise.allSettled([sendWorkshopPendingEmail(registration), sendWorkshopAdminNotification(registration)]);
    res.status(201).json({ success: true, data: { registrationId: registration.registrationId, totalAmount: WORKSHOP_FEE, paymentStatus: registration.payment.status, registrationStatus: registration.registrationStatus }, message: 'Workshop registration submitted and is under review.' });
  } catch (error) {
    if (error?.code === 11000) return next(new AppError('This workshop registration was already submitted', 409, 'DUPLICATE_REGISTRATION'));
    next(error);
  }
}

export async function listWorkshopRegistrations(req, res, next) {
  try { const query = req.query.status ? { registrationStatus: req.query.status } : {}; const registrations = await WorkshopRegistration.find(query).sort({ createdAt: -1 }).lean(); res.json({ success: true, data: { registrations } }); } catch (error) { next(error); }
}

export async function approveWorkshopRegistration(req, res, next) {
  try {
    const registration = await WorkshopRegistration.findOne({ registrationId: req.params.registrationId });
    if (!registration) throw new AppError('Workshop registration not found.', 404, 'NOT_FOUND');
    if (registration.payment.status !== 'PENDING_VERIFICATION') throw new AppError('Only pending workshop payments can be approved.', 409, 'INVALID_STATUS');
    registration.payment.status = 'VERIFIED'; registration.payment.verifiedAt = new Date(); registration.payment.verifiedBy = req.admin?.name || 'Admin'; registration.registrationStatus = 'confirmed';
    await registration.save(); await sendWorkshopConfirmationEmail(registration);
    res.json({ success: true, data: registration, message: 'Workshop slot confirmed and email sent.' });
  } catch (error) { next(error); }
}

export async function downloadVerifiedWorkshopRegistrations(_req, res, next) {
  try { const workbook = await buildVerifiedWorkshopRegistrationsWorkbook(); res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); res.setHeader('Content-Disposition', 'attachment; filename="fenix26-confirmed-workshops.xlsx"'); res.send(workbook); } catch (error) { next(error); }
}
