import logger from '../utils/logger.js';

const BREVO_EMAIL_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function getBrevoConfig() {
  const required = ['BREVO_API_KEY', 'BREVO_SENDER_EMAIL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Brevo email configuration is incomplete: ${missing.join(', ')}`);
  }

  return {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.BREVO_SENDER_EMAIL,
    senderName: process.env.BREVO_SENDER_NAME || "FENIX'26",
  };
}

function isRetryable(error) {
  return error.name === 'AbortError' || error.retryable === true;
}

/**
 * Sends transactional email through Brevo's HTTPS API.
 * HTTPS works on Render free services, where outbound SMTP ports are blocked.
 */
export async function sendEmail(to, subject, html) {
  const { apiKey, senderEmail, senderName } = getBrevoConfig();
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(BREVO_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { email: senderEmail, name: senderName },
          to: [{ email: to }],
          subject,
          htmlContent: html,
          tags: ['fenix26-transactional'],
        }),
        signal: controller.signal,
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(body.message || body.code || `Brevo request failed with status ${response.status}`);
        error.retryable = response.status === 429 || response.status >= 500;
        throw error;
      }

      logger.info(`Brevo email accepted for ${to}: ${body.messageId || 'message-id-unavailable'}`);
      return body;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS && isRetryable(error)) {
        await pause(attempt * 500);
        continue;
      }
      break;
    } finally {
      clearTimeout(timeout);
    }
  }

  logger.error(`Brevo email sending error to ${to}: ${lastError.message}`);
  throw lastError;
}
