import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

let transporter = null;

export function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      logger.error(`SMTP verification error: ${error.message}`);
    } else {
      logger.info('SMTP server ready for messages');
    }
  });

  return transporter;
}

export async function sendEmail(to, subject, html) {
  const t = getTransporter();
  const from = process.env.EMAIL_FROM || 'FENIX26 <no-reply@fenix26.in>';

  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  try {
    const info = await t.sendMail(mailOptions);
    logger.info(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    logger.error(`Email sending error to ${to}: ${err.message}`);
    throw err;
  }
}
