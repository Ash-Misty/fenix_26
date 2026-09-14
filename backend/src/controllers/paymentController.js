import Registration from '../models/Registration.js';
import { verifyPayment, getRegistrationByRegId } from '../services/paymentService.js';
import { sendConfirmationEmail } from '../services/emailService.js';
import { updateRegistrationInSheet } from '../services/googleSheetsService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function verifyPaymentHandler(req, res, next) {
  try {
    const { registrationId } = req.params;
    const verifiedBy = req.admin?.name || req.body?.verifiedBy || 'Admin';

    const registration = await verifyPayment(registrationId, verifiedBy);

    if (registration.payment.status !== 'VERIFIED') {
      throw new AppError('Payment could not be verified', 400, 'PAYMENT_VERIFY_FAILED');
    }

    try {
      await updateRegistrationInSheet(registration);
    } catch (err) {
      logger.warn(`Google Sheets update failed for ${registrationId}: ${err.message}`);
    }

    try {
      await sendConfirmationEmail(registration);
      registration.emailsSent.confirmation = true;
      await Registration.findByIdAndUpdate(registration._id, { 'emailsSent.confirmation': true });
    } catch (err) {
      logger.warn(`Payment verified email failed for ${registrationId}: ${err.message}`);
    }

    res.status(200).json({
      success: true,
      data: {
        registrationId: registration.registrationId,
        paymentStatus: registration.payment.status,
        registrationStatus: registration.registrationStatus,
      },
      message: 'Payment verified successfully.',
    });
  } catch (err) {
    next(err);
  }
}

export async function rejectPaymentHandler(req, res, next) {
  try {
    const { registrationId } = req.params;
    const { rejectionReason } = req.body || {};
    const rejectedBy = req.admin?.name || 'Admin';

    const registration = await verifyPayment(registrationId, rejectedBy, rejectionReason || 'Payment rejected by admin');

    if (registration.payment.status !== 'REJECTED') {
      throw new AppError('Payment could not be rejected', 400, 'PAYMENT_REJECT_FAILED');
    }

    try {
      await updateRegistrationInSheet(registration);
    } catch (err) {
      logger.warn(`Google Sheets update failed for ${registrationId}: ${err.message}`);
    }

    res.status(200).json({
      success: true,
      data: {
        registrationId: registration.registrationId,
        paymentStatus: registration.payment.status,
        registrationStatus: registration.registrationStatus,
      },
      message: 'Payment rejected.',
    });
  } catch (err) {
    next(err);
  }
}