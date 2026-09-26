import { sendEmail } from '../config/mail.js';
import logger from '../utils/logger.js';

const detailsList = (registration) => registration.foodPreferences?.map((item) => `${item.name}: ${item.preference}`).join('<br>') || registration.foodPreference;

const workshopDetails = (registration) => `<p><strong>Name:</strong> ${registration.name}</p><p><strong>College:</strong> ${registration.college}</p><p><strong>Year:</strong> ${registration.year}</p><p><strong>Food:</strong> ${registration.foodPreference}</p><p><strong>Amount:</strong> ₹${registration.totalAmount}</p>`;

export async function sendWorkshopPendingEmail(registration) {
  await sendEmail(registration.email, `FENIX'26 workshop registration under review — ${registration.registrationId}`, `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Workshop application submitted</h2><p>Your FENIX'26 workshop registration has been successfully submitted and is currently <strong>UNDER REVIEW</strong>.</p><p><strong>Applicant:</strong> ${registration.name}<br><strong>Workshop:</strong> ${registration.workshopName}<br><strong>Registration ID:</strong> ${registration.registrationId}<br><strong>Status:</strong> UNDER REVIEW</p></div>`);
}

export async function sendWorkshopAdminNotification(registration) {
  if (!process.env.ADMIN_EMAIL) return false;
  await sendEmail(process.env.ADMIN_EMAIL, `FENIX'26 workshop payment review — ${registration.registrationId}`, `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Workshop registration needs approval</h2><p><strong>Registration ID:</strong> ${registration.registrationId}</p>${workshopDetails(registration)}<p><a href="${registration.payment.screenshotUrl}">View payment screenshot</a></p><p>Open the admin panel to approve this workshop slot.</p></div>`);
  return true;
}

export async function sendWorkshopConfirmationEmail(registration) {
  await sendEmail(registration.email, `FENIX'26 workshop slot confirmed — ${registration.registrationId}`, `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Your workshop slot is confirmed</h2><p>Your payment has been verified for <strong>Data Science with AI Technology</strong>.</p><p><strong>Registration ID:</strong> ${registration.registrationId}</p>${workshopDetails(registration)}<p>We look forward to seeing you at FENIX'26.</p></div>`);
}

export async function sendRegistrationPendingEmail(registration) {
  const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#050303;color:#f1e1d6;padding:32px;line-height:1.7"><div style="max-width:600px;margin:auto"><p style="display:inline-block;padding:4px 12px;background:#3f2c09;color:#fbbf24;border-radius:4px;font-weight:700">UNDER REVIEW</p><h1 style="color:#fbbf24">Application submitted</h1><p>Your FENIX'26 registration has been successfully submitted and is currently under review.</p><p><strong>Applicant:</strong> ${registration.teamLeader}<br><strong>Registration ID:</strong> ${registration.registrationId}<br><strong>Events:</strong> ${registration.selectedEvents.map((event) => event.eventName).join(', ')}<br><strong>Status:</strong> UNDER REVIEW<br><strong>Amount:</strong> ₹${registration.totalAmount}</p><p style="color:#a8a29e;font-size:.85rem">This is an automated FENIX'26 message. Please do not reply.</p></div></body></html>`.trim();
  await sendEmail(registration.email, `FENIX'26 registration under verification — ${registration.registrationId}`, html);
  logger.info(`Pending registration email sent to ${registration.email}`);
  return true;
}

export async function sendConfirmationEmail(registration) {
  try {
    const eventsList = registration.selectedEvents
      .map((e) => `- ${e.eventName} (${e.category}, ₹${e.amount})`)
      .join('<br>');
    const workshopsList = registration.workshops.length
      ? registration.workshops.map((w) => `- ${w.workshopName} (₹${w.amount})`).join('<br>')
      : 'None';

    const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Manrope, Arial, sans-serif; background: #050303; color: #f1e1d6; padding: 32px; line-height: 1.7; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { color: #fbbf24; font-size: 1.8rem; margin-bottom: 8px; }
  .badge { color: #fbbf24; font-size: .72rem; letter-spacing: .3em; text-transform: uppercase; font-weight: 700; }
  .detail { margin: 8px 0; }
  .label { color: #a8a29e; font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }
  .value { color: #f1e1d6; font-size: 1rem; }
  .status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: .85rem; }
  .status.verified { background: rgba(37,211,102,.15); color: #25D366; }
  .status.pending { background: rgba(251,191,36,.15); color: #fbbf24; }
  .rules { margin-top: 24px; padding: 16px; border: 1px solid #292524; border-radius: 8px; background: rgba(5,3,3,.5); }
  .rules h3 { color: #fbbf24; margin-top: 0; }
</style></head>
<body>
<div class="container">
  <p class="badge">FENIX26 Symposium</p>
  <h1>Registration successfully confirmed</h1>

  <div class="detail"><span class="label">Registration ID</span><br><span class="value">${registration.registrationId}</span></div>
  <div class="detail"><span class="label">Team Name</span><br><span class="value">${registration.teamName}</span></div>
  <div class="detail"><span class="label">Team Leader</span><br><span class="value">${registration.teamLeader}</span></div>
  <div class="detail"><span class="label">College</span><br><span class="value">${registration.college}</span></div>
  <div class="detail"><span class="label">Selected Events</span><br>${eventsList}</div>
  <div class="detail"><span class="label">Selected Workshops</span><br>${workshopsList}</div>
  <div class="detail"><span class="label">Total Amount</span><br><span class="value">₹${registration.totalAmount}</span></div>
  <div class="detail"><span class="label">Payment Status</span><br><span class="status verified">Verified</span></div>
  <div class="detail"><span class="label">Registration Status</span><br><span class="value">Confirmed</span></div>

  ${(process.env.WORKSHOP_RULES || '') ? `<div class="rules"><h3>Important Instructions / Rules</h3><p>${process.env.WORKSHOP_RULES}</p></div>` : ''}

  <p style="margin-top: 32px; color: #a8a29e; font-size: .8rem;">This is an automated message from FENIX26. Please do not reply.</p>
</div>
</body>
</html>
    `.trim();

    await sendEmail(registration.email, `FENIX'26 registration confirmed — ${registration.registrationId}`, html);
    logger.info(`Confirmation email sent to ${registration.email}`);
    return true;
  } catch (err) {
    logger.error(`Failed to send confirmation email to ${registration.email}: ${err.message}`);
    throw err;
  }
}

export async function sendAdminNotification(registration) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      logger.warn('ADMIN_EMAIL not configured, skipping admin notification');
      return false;
    }

    const eventsList = registration.selectedEvents
      .map((e) => `- ${e.eventName} (${e.category})`)
      .join('<br>');

    const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Manrope, Arial, sans-serif; background: #050303; color: #f1e1d6; padding: 32px; line-height: 1.7; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { color: #ef4444; font-size: 1.4rem; }
  .detail { margin: 8px 0; }
  .label { color: #a8a29e; font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }
  .value { color: #f1e1d6; font-size: 1rem; }
  .status-verified { color: #25D366; font-weight: 600; }
</style></head>
<body>
<div class="container">
  <h1>New FENIX26 Registration needs verification</h1>
  <div class="detail"><span class="label">Registration ID</span><br><span class="value">${registration.registrationId}</span></div>
  <div class="detail"><span class="label">Registration type</span><br><span class="value">${registration.registrationType}</span></div>
  <div class="detail"><span class="label">Team / participant</span><br><span class="value">${registration.teamName}</span></div>
  <div class="detail"><span class="label">Members</span><br><span class="value">${registration.participants?.map((participant) => participant.name).join(', ') || registration.teamLeader}</span></div>
  <div class="detail"><span class="label">College</span><br><span class="value">${registration.college}</span></div>
  <div class="detail"><span class="label">Department / year</span><br><span class="value">${registration.department} / ${registration.year}</span></div>
  <div class="detail"><span class="label">Email</span><br><span class="value">${registration.email}</span></div>
  <div class="detail"><span class="label">Mobile</span><br><span class="value">${registration.phone}</span></div>
  <div class="detail"><span class="label">Food preferences</span><br><span class="value">${detailsList(registration)}</span></div>
  <div class="detail"><span class="label">Amount</span><br><span class="value">₹${registration.totalAmount}</span></div>
  <div class="detail"><span class="label">Payment Status</span><br><span class="status-verified">${registration.payment.status.replace('_', ' ')}</span></div>
  <div class="detail"><span class="label">Events</span><br>${eventsList}</div>
  <div class="detail"><span class="label">Payment screenshot</span><br>${registration.payment.screenshotUrl ? `<a href="${registration.payment.screenshotUrl}" style="color:#fbbf24">View screenshot</a>` : 'Unavailable'}</div>
</div>
</body>
</html>
    `.trim();

    await sendEmail(adminEmail, `FENIX'26 payment review required — ${registration.registrationId}`, html);
    logger.info(`Admin notification email sent to ${adminEmail}`);
    return true;
  } catch (err) {
    logger.error(`Failed to send admin notification: ${err.message}`);
    throw err;
  }
}

export async function sendPaymentVerificationEmail(registration) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      logger.warn('ADMIN_EMAIL not configured, skipping payment verification email');
      return false;
    }

    const eventsList = registration.selectedEvents
      .map((e) => `- ${e.eventName} (${e.category})`)
      .join('<br>');

    const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Manrope, Arial, sans-serif; background: #050303; color: #f1e1d6; padding: 32px; line-height: 1.7; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { color: #fbbf24; font-size: 1.4rem; }
  .detail { margin: 8px 0; }
  .label { color: #a8a29e; font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; }
  .value { color: #f1e1d6; font-size: 1rem; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: .8rem; background: rgba(251,191,36,.15); color: #fbbf24; }
</style></head>
<body>
<div class="container">
  <p class="badge">PENDING VERIFICATION</p>
  <h1>FENIX26 Payment Verification Required</h1>

  <div class="detail"><span class="label">Registration ID</span><br><span class="value">${registration.registrationId}</span></div>
  <div class="detail"><span class="label">Name</span><br><span class="value">${registration.teamLeader}</span></div>
  <div class="detail"><span class="label">Email</span><br><span class="value">${registration.email}</span></div>
  <div class="detail"><span class="label">Phone</span><br><span class="value">${registration.phone}</span></div>
  <div class="detail"><span class="label">College</span><br><span class="value">${registration.college}</span></div>
  <div class="detail"><span class="label">Amount</span><br><span class="value">INR ${registration.totalAmount}</span></div>
  <div class="detail"><span class="label">Payment Status</span><br><span class="value">${registration.payment.status.replace('_', ' ')}</span></div>
  <div class="detail"><span class="label">Events</span><br>${eventsList}</div>

  <p style="margin-top: 24px;">Please open the FENIX26 Admin Panel to review the payment screenshot and verify or reject the payment.</p>
  <p style="color: #a8a29e; font-size: .8rem;">This is an automated notification. Do not reply to this email. Only the Admin Panel VERIFY/REJECT action will update the payment status.</p>
</div>
</body>
</html>
    `.trim();

    await sendEmail(adminEmail, `FENIX26 Payment Verification - ${registration.registrationId}`, html);
    logger.info(`Payment verification email sent to ${adminEmail} for ${registration.registrationId}`);
    return true;
  } catch (err) {
    logger.error(`Failed to send payment verification email: ${err.message}`);
    throw err;
  }
}

export async function sendPaymentVerifiedEmail(registration) {
  try {
    const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Manrope, Arial, sans-serif; background: #050303; color: #f1e1d6; padding: 32px; line-height: 1.7; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { color: #25D366; font-size: 1.4rem; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: .8rem; background: rgba(37,211,102,.15); color: #25D366; }
</style></head>
<body>
<div class="container">
  <p class="badge">VERIFIED</p>
  <h1>Payment Verified</h1>
  <p>Your payment for registration <strong>${registration.registrationId}</strong> has been verified.</p>
  <p>Amount: INR ${registration.totalAmount}</p>
  <p style="color: #a8a29e; font-size: .8rem;">This is an automated message from FENIX26. Please do not reply.</p>
</div>
</body>
</html>
    `.trim();

    await sendEmail(registration.email, `FENIX26 Payment Verified - ${registration.registrationId}`, html);
    logger.info(`Payment verified email sent to ${registration.email}`);
    return true;
  } catch (err) {
    logger.error(`Failed to send payment verified email: ${err.message}`);
    throw err;
  }
}

export async function sendPaymentRejectedEmail(registration) {
  try {
    const reason = registration.payment.rejectionReason ? `Reason: ${registration.payment.rejectionReason}` : '';
    const html = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Manrope, Arial, sans-serif; background: #050303; color: #f1e1d6; padding: 32px; line-height: 1.7; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { color: #ef4444; font-size: 1.4rem; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: .8rem; background: rgba(239,68,68,.15); color: #ef4444; }
</style></head>
<body>
<div class="container">
  <p class="badge">REJECTED</p>
  <h1>Payment Rejected</h1>
  <p>Your payment for registration <strong>${registration.registrationId}</strong> has been rejected.</p>
  <p>Amount: INR ${registration.totalAmount}</p>
  ${reason ? `<p>${reason}</p>` : ''}
  <p style="color: #a8a29e; font-size: .8rem;">This is an automated message from FENIX26. Please do not reply.</p>
</div>
</body>
</html>
    `.trim();

    await sendEmail(registration.email, `FENIX26 Payment Rejected - ${registration.registrationId}`, html);
    logger.info(`Payment rejected email sent to ${registration.email}`);
    return true;
  } catch (err) {
    logger.error(`Failed to send payment rejected email: ${err.message}`);
    throw err;
  }
}
