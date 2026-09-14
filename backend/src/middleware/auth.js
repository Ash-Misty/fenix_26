import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import logger from '../utils/logger.js';

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
        code: 'AUTH_MISSING',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId).select('-passwordHash');
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or admin account deactivated',
        code: 'AUTH_INVALID',
      });
    }

    req.admin = admin;
    req.adminId = admin._id.toString();
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'AUTH_INVALID',
      });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
        code: 'AUTH_EXPIRED',
      });
    }
    logger.error(`Auth middleware error: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      code: 'AUTH_ERROR',
    });
  }
}

export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.adminId).select('-passwordHash');
      if (admin && admin.isActive) {
        req.admin = admin;
        req.adminId = admin._id.toString();
      }
    }
    next();
  } catch {
    next();
  }
}
