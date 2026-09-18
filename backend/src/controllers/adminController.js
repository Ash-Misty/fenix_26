import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Registration from '../models/Registration.js';
import Contact from '../models/Contact.js';
import { getTransporter } from '../config/mail.js';
import { buildVerifiedRegistrationsWorkbook } from '../services/registrationExportService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email, isActive: true });
    if (!admin) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
        },
      },
      message: 'Login successful',
    });
  } catch (err) {
    next(err);
  }
}

export async function getRegistrations(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.registrationStatus = status;

    const registrations = await Registration.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .lean();

    const total = await Registration.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        registrations,
        pagination: { page: parseInt(page, 10), limit: parseInt(limit, 10), total },
      },
      message: 'Registrations retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getRegistrationById(req, res, next) {
  try {
    const { registrationId } = req.params;
    const registration = await Registration.findOne({ registrationId }).lean();

    if (!registration) {
      throw new AppError('Registration not found', 404, 'REGISTRATION_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: registration,
      message: 'Registration retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function downloadVerifiedRegistrations(req, res, next) {
  try {
    const workbook = await buildVerifiedRegistrationsWorkbook();
    const date = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="fenix26-verified-registrations-${date}.xlsx"`);
    res.send(workbook);
  } catch (err) {
    next(err);
  }
}

export async function createAdmin(req, res, next) {
  try {
    const { email, password, name } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      throw new AppError('Admin account already exists', 409, 'ADMIN_EXISTS');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = new Admin({ email, passwordHash, name });
    await admin.save();

    logger.info(`Admin account created: ${email}`);

    res.status(201).json({
      success: true,
      data: { id: admin._id.toString(), email: admin.email, name: admin.name },
      message: 'Admin account created',
    });
  } catch (err) {
    next(err);
  }
}

export async function initAdmin(req, res, next) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(200).json({
        success: true,
        message: 'No admin credentials configured, skipping initialization',
      });
    }

    const existing = await Admin.findOne({ email: adminEmail });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Admin already exists' });
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const admin = new Admin({ email: adminEmail, passwordHash, name: 'FENIX26 Admin' });
    await admin.save();

    logger.info(`Default admin initialized: ${adminEmail}`);

    res.status(201).json({
      success: true,
      data: { id: admin._id.toString(), email: admin.email },
      message: 'Default admin created. Please change the password after login.',
    });
  } catch (err) {
    next(err);
  }
}

export async function getContacts(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .lean();

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: { page: parseInt(page, 10), limit: parseInt(limit, 10), total },
      },
      message: 'Contacts retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      throw new AppError('Invalid contact status', 400, 'VALIDATION_ERROR');
    }

    const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!contact) {
      throw new AppError('Contact enquiry not found', 404, 'CONTACT_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: 'Contact status updated successfully',
    });
  } catch (err) {
    next(err);
  }
}
