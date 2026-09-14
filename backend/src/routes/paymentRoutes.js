import { Router } from 'express';
import { verifyPaymentHandler, rejectPaymentHandler } from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validateVerifyPayment } from '../middleware/validation.js';

/**
 * @openapi
 * /api/payments/{registrationId}/verify-payment:
 *   patch:
 *     summary: Verify payment (admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verifiedBy:
 *                 type: string
 *                 example: "Admin Name"
 *     responses:
 *       200:
 *         description: Payment verified
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */

/**
 * @openapi
 * /api/payments/{registrationId}/reject-payment:
 *   patch:
 *     summary: Reject payment (admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rejectionReason:
 *                 type: string
 *                 example: "Payment not received"
 *     responses:
 *       200:
 *         description: Payment rejected
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */

const router = Router();

router.patch('/:registrationId/verify-payment', authMiddleware, validateVerifyPayment, verifyPaymentHandler);
router.patch('/:registrationId/reject-payment', authMiddleware, validateVerifyPayment, rejectPaymentHandler);

export default router;
