import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import logger from '../utils/logger.js';

let configured = false;

export function configureCloudinary() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

export async function uploadScreenshot(file, registrationId) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      const wrapped = new Error('Cloudinary not configured');
      wrapped.code = 'CLOUDINARY_NOT_CONFIGURED';
      throw wrapped;
    }
    configureCloudinary();

    const publicId = `payment-screenshot-${registrationId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: 'fenix26/payments',
          resource_type: 'image',
          transformation: [{ quality: 'auto:good' }],
        },
        (error, response) => {
          if (error) reject(error);
          else resolve(response);
        }
      );

      const bufferStream = Readable.from(file.buffer);
      bufferStream.pipe(stream);
    });

    logger.info(`Screenshot uploaded to Cloudinary: ${result.public_id} for ${registrationId}`);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (err) {
    logger.error(`Cloudinary upload error: ${err.message}`);
    const wrapped = new Error('Failed to upload screenshot to Cloudinary');
    wrapped.cause = err;
    throw wrapped;
  }
}

export async function deleteScreenshot(publicId) {
  try {
    configureCloudinary();
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info(`Cloudinary screenshot deleted: ${publicId}`);
    return result;
  } catch (err) {
    logger.error(`Cloudinary delete error: ${err.message}`);
    throw err;
  }
}