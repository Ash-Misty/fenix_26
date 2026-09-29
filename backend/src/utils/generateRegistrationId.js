import RegistrationCounter from '../models/RegistrationCounter.js';

const PREFIX = 'F26';
const SEQUENCE_WIDTH = 6;

function counterKey(year) {
  return `event-registration:${year}`;
}

function highestStoredSequence(registrations, year) {
  const idPattern = new RegExp(`^${PREFIX}-${year}-(\\d+)$`);

  return registrations.reduce((highest, registration) => {
    const match = idPattern.exec(registration.registrationId || '');
    const sequence = match ? Number(match[1]) : 0;
    return Number.isSafeInteger(sequence) ? Math.max(highest, sequence) : highest;
  }, 0);
}

/**
 * Aligns the durable counter with existing data. This fixes databases that have
 * deleted records or historical IDs with gaps; document count is never used.
 */
export async function initRegistrationIdCounter(RegistrationModel, year = new Date().getFullYear()) {
  const registrations = await RegistrationModel
    .find({ registrationId: { $regex: `^${PREFIX}-${year}-` } })
    .select({ registrationId: 1, _id: 0 })
    .lean();

  const highest = highestStoredSequence(registrations, year);
  await RegistrationCounter.findOneAndUpdate(
    { _id: counterKey(year) },
    { $max: { sequence: highest } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

/**
 * Atomically reserves the next ID only during final registration submission.
 */
export async function generateRegistrationId(RegistrationModel, year = new Date().getFullYear()) {
  // This is intentionally inside final submission, not server startup or QR
  // generation. No registration metadata is written before the user submits.
  await initRegistrationIdCounter(RegistrationModel, year);

  const counter = await RegistrationCounter.findOneAndUpdate(
    { _id: counterKey(year) },
    { $inc: { sequence: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return `${PREFIX}-${year}-${String(counter.sequence).padStart(SEQUENCE_WIDTH, '0')}`;
}
