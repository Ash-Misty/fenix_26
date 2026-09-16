import { Router } from 'express';
import { createRegistration, getRegistration, getRegistrationCount, uploadPaymentScreenshot } from '../controllers/registrationController.js';
import { paymentScreenshotUpload } from '../middleware/upload.js';
import { handleUploadError } from '../middleware/upload.js';
import { validateRegistration, validatePaymentScreenshotUpload } from '../middleware/validation.js';

/**
 * @openapi
 * /api/registrations:
 *   post:
 *     summary: Create a new registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamName
 *               - teamLeader
 *               - email
 *               - phone
 *               - college
 *               - department
 *               - year
 *               - registrationType
 *               - selectedEvents
 *             properties:
 *               teamName:
 *                 type: string
 *                 example: "Example Team"
 *               teamLeader:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "team@example.com"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               college:
 *                 type: string
 *                 example: "Example College"
 *               department:
 *                 type: string
 *                 example: "CSE"
 *               year:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *               registrationType:
 *                 type: string
 *                 enum: [Individual, Team]
 *                 example: "Individual"
 *               selectedEvents:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["paper-presentation", "ai-battle"]
 *               workshops:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *               participants:
 *                 type: array
 *                 description: "Required only for Team registration. Must have 2-3 participants. Not allowed for Individual."
 *                 items:
 *                   type: object
 *                   required: [name, email, phone, year]
 *                   properties:
 *                     name: { type: string, example: "Jane Doe" }
 *                     email: { type: string, format: email, example: "jane@example.com" }
 *                     phone: { type: string, example: "9876543211" }
 *                     year: { type: integer, example: 3 }
*               foodPreference:
*                 type: string
*                 enum: [Vegetarian, Non-vegetarian]
*                 example: "Vegetarian"
*               totalAmount:
*                 type: number
*                 description: "Optional. Calculated server-side based on registration type and event count. Individual: ₹250 (≤2 tech + ≤2 non-tech) / ₹300 (more). Team 2: ₹450 / ₹500. Team 3: ₹750 / ₹800."
*                 example: 250
*     responses:
 *       201:
 *         description: Registration created successfully
 *       400:
 *         description: Validation error (invalid events/workshops, participants required for Team, participants forbidden for Individual, etc.)
 *       409:
 *         description: Duplicate registration
 */

/**
 * @openapi
 * /api/registrations/{registrationId}:
 *   get:
 *     summary: Get registration by ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "F26-2026-000001"
 *     responses:
 *       200:
 *         description: Registration retrieved successfully
 *       404:
 *         description: Registration not found
 */

/**
 * @openapi
 * /api/registrations/{registrationId}/payment-screenshot:
 *   post:
 *     summary: Upload payment screenshot
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "F26-2026-000001"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               screenshot:
 *                 type: string
 *                 format: binary
 *                 description: "Image file (JPEG, PNG, GIF, WebP, BMP, max 10MB)"
*     responses:
*       200:
*         description: Payment screenshot uploaded successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success: { type: boolean, example: true }
*                 message: { type: string, example: "Payment screenshot uploaded successfully. Verification is pending." }
*                 data:
*                   type: object
*                   properties:
*                     registrationId: { type: string, example: "F26-2026-000001" }
*                     paymentStatus: { type: string, example: "PENDING_VERIFICATION" }
*       400:
*         description: No file uploaded or invalid file
*       404:
*         description: Registration not found
*       500:
*         description: Screenshot storage or email failure
 */

const router = Router();

router.post('/', validateRegistration, createRegistration);
router.get('/count', getRegistrationCount);
router.get('/:registrationId', getRegistration);
router.post(
  '/:registrationId/payment-screenshot',
  validatePaymentScreenshotUpload,
  paymentScreenshotUpload,
  handleUploadError,
  uploadPaymentScreenshot,
);

export default router;

