import Registration from '../models/Registration.js';
import PricingConfig from '../models/Event.js';
import { processPaymentScreenshot, verifyPayment, calculateAmount, getRegistrationByRegId, checkDuplicateRegistration } from '../services/paymentService.js';
import { uploadScreenshot } from '../services/cloudinaryService.js';
import { appendRegistrationToSheet, updateRegistrationInSheet } from '../services/googleSheetsService.js';
import { generateUPIPayload, generateQRCode } from '../services/qrService.js';
import { sendAdminNotification, sendPaymentVerificationEmail } from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function createRegistration(req, res, next) {
  try {
    const {
      teamName, teamLeader, email, phone, college, department, year,
      registrationType, participants = [], selectedEvents = [], workshops = [],
      foodPreference = 'Vegetarian',
    } = req.body;

    const existing = await checkDuplicateRegistration(email);
    if (existing && existing.registrationStatus !== 'rejected') {
      throw new AppError('Registration already exists for this email', 409, 'DUPLICATE_REGISTRATION');
    }

    const config = await PricingConfig.findOne();
    if (!config) {
      throw new AppError('Pricing configuration not found', 503, 'CONFIG_MISSING');
    }

    const { totalAmount, eventDetails } = await calculateAmount(
      selectedEvents,
      workshops,
      registrationType,
      participants.length
    );

    const upiPayload = await generateUPIPayload(
      totalAmount,
      process.env.UPI_ID,
      process.env.UPI_NAME
    );

    const qrCodeDataUrl = await generateQRCode(upiPayload);

    const registration = new Registration({
      teamName,
      teamLeader,
      email,
      phone,
      college,
      department,
      year,
      registrationType,
      participants: registrationType === 'Team' ? participants : [],
      selectedEvents: eventDetails,
      workshops: workshops.map((w) => ({
        workshopId: w,
        workshopName: w,
        amount: config.workshops.find((ws) => ws.slug === w)?.price || 0,
      })),
      totalAmount,
      foodPreference,
      payment: {
        status: 'pending',
        amount: totalAmount,
        qrPayload: upiPayload,
        upiPayload,
      },
      registrationStatus: 'pending',
    });

    await registration.save();
    logger.info(`Registration created: ${registration.registrationId}`);

    try {
      await appendRegistrationToSheet(registration);
    } catch (err) {
      logger.warn(`Google Sheets update failed for ${registration.registrationId}: ${err.message}`);
    }

    try {
      await sendAdminNotification(registration);
    } catch (err) {
      logger.warn(`Admin notification failed for ${registration.registrationId}: ${err.message}`);
    }

    res.status(201).json({
      success: true,
      data: {
        registrationId: registration.registrationId,
        totalAmount,
        payment: {
          status: registration.payment.status,
          qrCode: qrCodeDataUrl,
          upiPayload,
        },
      },
      message: 'Registration created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getRegistration(req, res, next) {
  try {
    const { registrationId } = req.params;
    const registration = await getRegistrationByRegId(registrationId);

    if (!registration) {
      throw new AppError('Registration not found', 404, 'REGISTRATION_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: registration,
      message: 'Registration retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function uploadPaymentScreenshot(req, res, next) {
  try {
    const { registrationId } = req.params;

    if (!req.file) {
      throw new AppError('No screenshot file uploaded', 400, 'NO_FILE');
    }

    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadScreenshot(req.file, registrationId);
    } catch (err) {
      if (err.code === 'CLOUDINARY_NOT_CONFIGURED') {
        throw new AppError('Screenshot upload service is not configured', 503, 'CLOUDINARY_NOT_CONFIGURED');
      }
      throw new AppError('Failed to upload screenshot', 503, 'UPLOAD_FAILED');
    }

    const registration = await processPaymentScreenshot(
      registrationId,
      cloudinaryResult.url,
      cloudinaryResult.publicId
    );

    try {
      await updateRegistrationInSheet(registration);
    } catch (err) {
      logger.warn(`Google Sheets update failed for ${registrationId}: ${err.message}`);
    }

    try {
      await sendPaymentVerificationEmail(registration);
      registration.emailsSent.adminNotification = true;
      await Registration.findByIdAndUpdate(registration._id, { 'emailsSent.adminNotification': true });
    } catch (err) {
      logger.error(`Payment verification email failed for ${registrationId}: ${err.message}`);
    }

    res.status(200).json({
      success: true,
      data: {
        registrationId: registration.registrationId,
        paymentStatus: registration.payment.status,
        registrationStatus: registration.registrationStatus,
      },
      message: 'Payment screenshot uploaded successfully. Verification is pending.',
    });
  } catch (err) {
    next(err);
  }
}
