import { google } from 'googleapis';
import crypto from 'node:crypto';
import logger from '../utils/logger.js';

let sheetsAuth = null;
let sheetsInstance = null;

function getPrivateKey() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ?.replace(/\\n/g, '\n')
    .replace(/\r/g, '')
    .trim();

  if (!privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY is missing');
  }

  try {
    crypto.createPrivateKey({ key: privateKey, format: 'pem' });
  } catch {
    throw new Error(
      'GOOGLE_PRIVATE_KEY is not a valid PEM key; copy the complete private_key from the service-account JSON'
    );
  }

  return privateKey;
}

export function getSheetsAuth() {
  if (sheetsAuth) return sheetsAuth;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_AUTH_TYPE || 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: getPrivateKey(),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  sheetsAuth = auth;
  return auth;
}

export async function getSheetsInstance() {
  if (sheetsInstance) return sheetsInstance;
  const auth = getSheetsAuth();
  sheetsInstance = google.sheets({ version: 'v4', auth });
  return sheetsInstance;
}