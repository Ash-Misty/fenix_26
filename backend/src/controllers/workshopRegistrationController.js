import WorkshopRegistration from '../models/WorkshopRegistration.js';
import { uploadScreenshot } from '../services/cloudinaryService.js';
import { generateQRCode, generateUPIPayload } from '../services/qrService.js';
import { sendWorkshopAdminNotification, sendWorkshopConfirmationEmail, sendWorkshopPendingEmail } from '../services/emailService.js';
import { buildVerifiedWorkshopRegistrationsWorkbook } from '../services/workshopRegistrationExportService.js';
import { AppError } from '../middleware/errorHandler.js';

const WORKSHOP_FEE = 250;

export async function createWorkshopRegistration(req, res, next) {
  try {
    const { name, email, college, year, foodPreference } = req.body;
    const upiPayload = await generateUPIPayload(WORKSHOP_FEE, process.env.UPI_ID, process.env.UPI_NAME);
    const registration = await WorkshopRegistration.create({ name, email, college, year, foodPreference, totalAmount: WORKSHOP_FEE, payment: { status: 'pending', qrPayload: upiPayload } });
    res.status(201).json({ success: true, data: { registrationId: registration.registrationId, totalAmount: WORKSHOP_FEE, payment: { status: 'pending', qrCode: await generateQRCode(upiPayload) } } });
  } catch (error) { next(error); }
}

export async function uploadWorkshopScreenshot(req, res, next) {
  try {
    if (!req.file) throw new AppError('Upload a payment screenshot.', 400, 'NO_FILE');
    const registration = await WorkshopRegistration.findOne({ registrationId: req.params.registrationId });
    if (!registration) throw new AppError('Workshop registration not found.', 404, 'NOT_FOUND');
    if (registration.payment.status !== 'pending') throw new AppError('This payment can no longer be updated.', 409, 'PAYMENT_LOCKED');
    const upload = await uploadScreenshot(req.file, registration.registrationId, 'workshop-payments');
    registration.payment.screenshotUrl = upload.url;
    registration.payment.screenshotPublicId = upload.publicId;
    registration.payment.uploadedAt = new Date();
    registration.payment.status = 'PENDING_VERIFICATION';
    registration.registrationStatus = 'payment_submitted';
    await registration.save();
    await Promise.allSettled([sendWorkshopPendingEmail(registration), sendWorkshopAdminNotification(registration)]);
    res.json({ success: true, data: { registrationId: registration.registrationId, registrationStatus: registration.registrationStatus, paymentStatus: registration.payment.status }, message: 'Workshop payment submitted for verification.' });
  } catch (error) { next(error); }
}

export async function listWorkshopRegistrations(req, res, next) {
  try {
    const query = req.query.status ? { registrationStatus: req.query.status } : {};
    const registrations = await WorkshopRegistration.find(query).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: { registrations } });
  } catch (error) { next(error); }
}

export async function approveWorkshopRegistration(req, res, next) {
  try {
    const registration = await WorkshopRegistration.findOne({ registrationId: req.params.registrationId });
    if (!registration) throw new AppError('Workshop registration not found.', 404, 'NOT_FOUND');
    if (registration.payment.status !== 'PENDING_VERIFICATION') throw new AppError('Only pending workshop payments can be approved.', 409, 'INVALID_STATUS');
    registration.payment.status = 'VERIFIED';
    registration.payment.verifiedAt = new Date();
    registration.payment.verifiedBy = req.admin?.name || 'Admin';
    registration.registrationStatus = 'confirmed';
    await registration.save();
    await sendWorkshopConfirmationEmail(registration);
    res.json({ success: true, data: registration, message: 'Workshop slot confirmed and email sent.' });
  } catch (error) { next(error); }
}

export async function downloadVerifiedWorkshopRegistrations(req, res, next) {
  try {
    const workbook = await buildVerifiedWorkshopRegistrationsWorkbook();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="fenix26-confirmed-workshops.xlsx"');
    res.send(workbook);
  } catch (error) { next(error); }
}
