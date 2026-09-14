import QRCode from 'qrcode';
import logger from '../utils/logger.js';

export async function generateUPIPayload(amount, upiId, upiName) {
  const payload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amount.toFixed(2)}&cu=INR`;
  return payload;
}

export async function generateQRCode(data) {
  try {
    const qrDataUrl = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#080b1d',
        light: '#ffffff',
      },
    });
    return qrDataUrl;
  } catch (err) {
    logger.error(`QR code generation error: ${err.message}`);
    throw new Error('Failed to generate QR code');
  }
}

export async function generateQRCodeBuffer(data) {
  try {
    const buffer = await QRCode.toBuffer(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#080b1d',
        light: '#ffffff',
      },
    });
    return buffer;
  } catch (err) {
    logger.error(`QR code buffer generation error: ${err.message}`);
    throw new Error('Failed to generate QR code');
  }
}
