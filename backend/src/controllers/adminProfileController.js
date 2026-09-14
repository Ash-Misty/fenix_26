import Admin from '../models/Admin.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function getProfile(req, res, next) {
  try {
    const admin = await Admin.findById(req.admin._id).select('-passwordHash').lean();

    if (!admin) {
      throw new AppError('Admin not found', 404, 'ADMIN_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: admin,
      message: 'Profile retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { name } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      throw new AppError('Admin not found', 404, 'ADMIN_NOT_FOUND');
    }

    if (name !== undefined) {
      if (name.trim().length < 2) {
        throw new AppError('Name must be at least 2 characters', 400, 'VALIDATION_ERROR');
      }
      admin.name = name.trim();
    }

    await admin.save();
    logger.info(`Admin profile updated: ${admin.email}`);

    res.status(200).json({
      success: true,
      data: { id: admin._id.toString(), email: admin.email, name: admin.name },
      message: 'Profile updated successfully',
    });
  } catch (err) {
    next(err);
  }
}
