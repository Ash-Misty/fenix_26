import Registration from '../models/Registration.js';
import PricingConfig from '../models/Event.js';
import { generateUPIPayload } from './qrService.js';
import logger from '../utils/logger.js';

const REGISTRATION_FEES = Object.freeze({
  Individual: 300,
  Team2: 550,
  Team3: 800,
});

export async function calculateAmount(selectedEvents = [], workshops = [], registrationType = 'Individual', participantCount = 0) {
  try {
    const config = await PricingConfig.findOne();
    if (!config) {
      throw new Error('Pricing configuration not found');
    }

    const eventMap = new Map();
    config.events.forEach((e) => {
      eventMap.set(e.slug, e);
    });

    // Event choices are included in the registration fee. They must never alter
    // the QR amount, even if a legacy pricing record has an event base price.
    let totalAmount = 0;
    const eventDetails = [];

    for (const slug of selectedEvents) {
      const event = eventMap.get(slug);
      if (!event) {
        throw new Error(`Invalid event: ${slug}`);
      }
      if (!event.isActive) {
        throw new Error(`Event is not active: ${slug}`);
      }
      eventDetails.push({
        eventId: event.slug,
        eventName: event.name,
        category: event.category,
        amount: 0,
      });
    }

    for (const workshop of workshops) {
      const ws = config.workshops.find((w) => w.slug === workshop);
      if (!ws) {
        throw new Error(`Invalid workshop: ${workshop}`);
      }
      if (!ws.isActive) {
        throw new Error(`Workshop is not active: ${workshop}`);
      }
      totalAmount += ws.price;
      eventDetails.push({
        workshopId: ws.slug,
        workshopName: ws.name,
        amount: ws.price,
      });
    }

    const techCount = eventDetails.filter((e) => e.category === 'Technical').length;
    const nonTechCount = eventDetails.filter((e) => e.category === 'Non-Technical').length;
    const exceedsLimit = techCount > config.maxTechPerRegistration || nonTechCount > config.maxNonTechPerRegistration;

    if (exceedsLimit) {
      throw new Error(`A registration can include up to ${config.maxTechPerRegistration} Technical and ${config.maxNonTechPerRegistration} Non-Technical events`);
    }

    let registrationFee = 0;
    if (registrationType === 'Individual') {
      registrationFee = REGISTRATION_FEES.Individual;
    } else if (registrationType === 'Team') {
      if (participantCount === 2) {
        registrationFee = REGISTRATION_FEES.Team2;
      } else if (participantCount === 3) {
        registrationFee = REGISTRATION_FEES.Team3;
      } else {
        throw new Error('Team registration must have exactly 2 or 3 participants');
      }
    }

    totalAmount += registrationFee;

    return { totalAmount, eventDetails, registrationFee };
  } catch (err) {
    logger.error(`Amount calculation error: ${err.message}`);
    throw err;
  }
}

export async function processPaymentScreenshot(registrationId, screenshotUrl, screenshotPublicId) {
  const registration = await Registration.findOne({ registrationId });
  if (!registration) {
    throw new Error('Registration not found');
  }

  if (registration.payment.status === 'VERIFIED' || registration.payment.status === 'REJECTED') {
    throw new Error(`Cannot update payment: current status is ${registration.payment.status}`);
  }

  registration.payment.screenshotUrl = screenshotUrl;
  registration.payment.screenshotPublicId = screenshotPublicId;
  registration.payment.status = 'PENDING_VERIFICATION';
  registration.payment.uploadedAt = new Date();
  registration.registrationStatus = 'payment_submitted';
  registration.markModified('payment');

  await registration.save();
  logger.info(`Payment screenshot uploaded for ${registrationId}, status=PENDING_VERIFICATION`);

  return registration;
}

export async function verifyPayment(registrationId, verifiedBy, rejectionReason = null) {
  const registration = await Registration.findOne({ registrationId });
  if (!registration) {
    throw new Error('Registration not found');
  }

  if (rejectionReason) {
    if (registration.payment.status === 'REJECTED') {
      logger.warn(`Payment already rejected for ${registrationId}`);
      return registration;
    }
    if (registration.payment.status === 'VERIFIED') {
      throw new Error('Cannot reject a verified payment');
    }
    registration.payment.status = 'REJECTED';
    registration.payment.rejectionReason = rejectionReason;
    registration.payment.rejectedAt = new Date();
    registration.payment.verifiedBy = verifiedBy;
    registration.registrationStatus = 'rejected';
    await registration.save();
    logger.info(`Payment rejected for ${registrationId}: ${rejectionReason}`);
    return registration;
  }

  if (registration.payment.status === 'VERIFIED') {
    logger.warn(`Payment already verified for ${registrationId}`);
    return registration;
  }

  if (registration.payment.status === 'REJECTED') {
    throw new Error('Cannot verify a rejected payment');
  }

  registration.payment.status = 'VERIFIED';
  registration.payment.verifiedAt = new Date();
  registration.payment.verifiedBy = verifiedBy;
  registration.registrationStatus = 'confirmed';
  registration.markModified('payment');
  await registration.save();
  logger.info(`Payment verified for ${registrationId}`);

  return registration;
}

export async function getRegistrationByRegId(registrationId) {
  return await Registration.findOne({ registrationId }).lean();
}

export async function getRegistrationByEmail(email) {
  return await Registration.findOne({ email }).lean();
}

export async function checkDuplicateRegistration(email) {
  return await Registration.findOne({ email }).lean();
}
