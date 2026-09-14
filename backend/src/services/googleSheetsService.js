import { getSheetsInstance } from '../config/google.js';
import logger from '../utils/logger.js';

const HEADERS = [
  'Registration ID',
  'Registration Date',
  'Team Name',
  'Team Leader',
  'Email',
  'Phone',
  'College',
  'Department',
  'Year',
  'Participants',
  'Selected Events',
  'Selected Workshops',
  'Total Amount',
  'Payment Status',
  'Transaction ID',
  'Payment Screenshot',
  'Registration Status',
  'Verified At',
  'Verified By',
];

export async function initializeSheet() {
  try {
    const sheets = await getSheetsInstance();
    const res = await sheets.spreadsheets.get({ spreadsheetId: process.env.GOOGLE_SHEET_ID });
    const sheetsList = res.data.sheets;

    const registrationsSheet = sheetsList?.find((s) => s.properties.title === 'Registrations');

    if (!registrationsSheet) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        resource: {
          requests: [
            {
              addSheet: {
                properties: { title: 'Registrations' },
              },
            },
          ],
        },
      });
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Registrations!A1',
        valueInputOption: 'RAW',
        resource: {
          values: [HEADERS],
        },
      });
      logger.info('Created "Registrations" sheet with headers');
    } else {
      await ensureHeaders(registrationsSheet.properties.sheetId);
      logger.info('"Registrations" sheet already exists');
    }
  } catch (err) {
    logger.error(`Google Sheets initialization error: ${err.message}`);
    throw err;
  }
}

async function ensureHeaders(sheetId) {
  const sheets = await getSheetsInstance();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Registrations!A1:S1`,
  });
  const existingHeaders = res.data.values?.[0];
  if (!existingHeaders || existingHeaders.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Registrations!A1',
      valueInputOption: 'RAW',
      resource: {
        values: [HEADERS],
      },
    });
    logger.info('Added headers to existing "Registrations" sheet');
  }
}

export async function appendRegistrationToSheet(registration) {
  try {
    const sheets = await getSheetsInstance();

    const participantsStr = registration.participants
      .map((p) => `${p.name} (${p.email})`)
      .join('; ');
    const eventsStr = registration.selectedEvents
      .map((e) => `${e.eventName} (₹${e.amount})`)
      .join('; ');
    const workshopsStr = registration.workshops
      .map((w) => `${w.workshopName} (₹${w.amount})`)
      .join('; ');
    const screenshotUrl = registration.payment.screenshotUrl || '';
    const screenshotLink = screenshotUrl
      ? `=HYPERLINK("${screenshotUrl}", "View Payment Screenshot")`
      : '';

    const row = [
      registration.registrationId,
      new Date(registration.createdAt).toISOString().split('T')[0],
      registration.teamName,
      registration.teamLeader,
      registration.email,
      registration.phone,
      registration.college,
      registration.department,
      registration.year,
      participantsStr,
      eventsStr,
      workshopsStr,
      registration.totalAmount,
      registration.payment.status,
      registration.payment.transactionId || '',
      screenshotLink,
      registration.registrationStatus,
      registration.payment.verifiedAt
        ? new Date(registration.payment.verifiedAt).toISOString().split('T')[0]
        : '',
      registration.payment.verifiedBy || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Registrations!A2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [row],
      },
    });

    logger.info(`Registration ${registration.registrationId} added to Google Sheets`);
    return true;
  } catch (err) {
    logger.error(`Failed to add registration to Google Sheets: ${err.message}`);
    throw err;
  }
}

export async function updateRegistrationInSheet(registration) {
  try {
    const sheets = await getSheetsInstance();

    const searchRange = 'Registrations!A:A';
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: searchRange,
    });

    const rows = res.data.values || [];
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === registration.registrationId) {
        rowIndex = i + 1;
        break;
      }
    }

    const participantsStr = registration.participants
      .map((p) => `${p.name} (${p.email})`)
      .join('; ');
    const eventsStr = registration.selectedEvents
      .map((e) => `${e.eventName} (₹${e.amount})`)
      .join('; ');
    const workshopsStr = registration.workshops
      .map((w) => `${w.workshopName} (₹${w.amount})`)
      .join('; ');
    const screenshotUrl = registration.payment.screenshotUrl || '';
    const screenshotLink = screenshotUrl
      ? `=HYPERLINK("${screenshotUrl}", "View Payment Screenshot")`
      : '';

    const row = [
      registration.registrationId,
      new Date(registration.createdAt).toISOString().split('T')[0],
      registration.teamName,
      registration.teamLeader,
      registration.email,
      registration.phone,
      registration.college,
      registration.department,
      registration.year,
      participantsStr,
      eventsStr,
      workshopsStr,
      registration.totalAmount,
      registration.payment.status,
      registration.payment.transactionId || '',
      screenshotLink,
      registration.registrationStatus,
      registration.payment.verifiedAt
        ? new Date(registration.payment.verifiedAt).toISOString().split('T')[0]
        : '',
      registration.payment.verifiedBy || '',
    ];

    if (rowIndex > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `Registrations!A${rowIndex}:S${rowIndex}`,
        valueInputOption: 'RAW',
        resource: { values: [row] },
      });
      logger.info(`Registration ${registration.registrationId} updated in Google Sheets`);
    } else {
      await appendRegistrationToSheet(registration);
    }

    return true;
  } catch (err) {
    logger.error(`Failed to update registration in Google Sheets: ${err.message}`);
    throw err;
  }
}
