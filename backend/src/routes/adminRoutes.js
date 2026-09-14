import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { loginAdmin, getRegistrations, getRegistrationById, createAdmin, initAdmin, getContacts, updateContactStatus } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateAdminLogin } from '../middleware/validation.js';

/**
 * @openapi
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@fenix26.in"
 *               password:
 *                 type: string
 *                 example: "your-password"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: { type: string, example: "eyJhbGciOiJIUzI1NiIs..." }
 *                     admin:
 *                       type: object
 *                       properties:
 *                         id: { type: string }
 *                         email: { type: string }
 *                         name: { type: string }
 *                 message: { type: string, example: "Login successful" }
 *       401:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /api/admin/registrations:
 *   get:
 *     summary: List all registrations (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, payment_submitted, payment_verified, confirmed, rejected]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Registrations retrieved
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/admin/registrations/{registrationId}:
 *   get:
 *     summary: Get registration details (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "F26-2026-000001"
 *     responses:
 *       200:
 *         description: Registration details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */

/**
 * @openapi
 * /api/admin/init:
 *   post:
 *     summary: Initialize default admin from .env
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin initialized or already exists
 */

/**
 * @openapi
 * /api/admin/create:
 *   post:
 *     summary: Create a new admin account
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created
 *       409:
 *         description: Admin already exists
 */

/**
 * @openapi
 * /api/admin/contacts:
 *   get:
 *     summary: List all contacts (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, read, replied]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Contacts retrieved
 *       401:
 *         description: Unauthorized
 */

const router = Router();
const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: 'Too many login attempts. Please try again later.',
		code: 'AUTH_RATE_LIMIT_EXCEEDED',
	},
});

router.post('/login', loginLimiter, validateAdminLogin, loginAdmin);
router.get('/registrations', authMiddleware, getRegistrations);
router.get('/registrations/:registrationId', authMiddleware, getRegistrationById);
router.post('/init', initAdmin);
router.post('/create', authMiddleware, createAdmin);
router.get('/contacts', authMiddleware, getContacts);
router.patch('/contacts/:id', authMiddleware, updateContactStatus);

export default router;
