import multer from 'multer';
import path from 'path';
import logger from '../utils/logger.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP, BMP)'), false);
    logger.warn(`Rejected upload: unsupported file type ${file.mimetype}`);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
});

export const paymentScreenshotUpload = upload.single('screenshot');

export function handleUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.',
        code: 'FILE_TOO_LARGE',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Only one file is allowed.',
        code: 'TOO_MANY_FILES',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
      code: 'UPLOAD_ERROR',
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: 'INVALID_FILE',
    });
  }
  next();
}
