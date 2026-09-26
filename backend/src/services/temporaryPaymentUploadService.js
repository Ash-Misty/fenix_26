import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_SECONDS = 60 * 60;

function getSecret() {
  const secret = process.env.PAYMENT_UPLOAD_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('Temporary payment upload signing is not configured');
  return secret;
}

function sign(encodedPayload) {
  return createHmac('sha256', getSecret()).update(encodedPayload).digest('base64url');
}

export function createTemporaryPaymentUploadToken({ url, publicId, scope }) {
  const payload = Buffer.from(JSON.stringify({ url, publicId, scope, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyTemporaryPaymentUploadToken(token, scope) {
  if (!token || typeof token !== 'string') throw new Error('Payment screenshot reference is required');
  const [payload, signature] = token.split('.');
  if (!payload || !signature) throw new Error('Invalid payment screenshot reference');

  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new Error('Invalid payment screenshot reference');
  }

  let data;
  try { data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')); }
  catch { throw new Error('Invalid payment screenshot reference'); }

  if (data.scope !== scope || !data.url || !data.publicId || !data.exp || data.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Payment screenshot reference has expired. Please upload it again.');
  }

  return data;
}
