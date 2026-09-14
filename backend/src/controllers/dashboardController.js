import Registration from '../models/Registration.js';
import PricingConfig from '../models/Event.js';
import Contact from '../models/Contact.js';
import Announcement from '../models/Announcement.js';
import logger from '../utils/logger.js';

export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalRegistrations,
      pendingRegistrations,
      paymentSubmitted,
      verifiedRegistrations,
      confirmedRegistrations,
      rejectedRegistrations,
      pendingPayments,
      totalPaymentsVerified,
      totalRevenue,
      eventsData,
      workshopsData,
    ] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ registrationStatus: 'pending' }),
      Registration.countDocuments({ registrationStatus: 'payment_submitted' }),
      Registration.countDocuments({ registrationStatus: 'payment_verified' }),
      Registration.countDocuments({ registrationStatus: 'confirmed' }),
      Registration.countDocuments({ registrationStatus: 'rejected' }),
      Registration.countDocuments({ 'payment.status': 'PENDING_VERIFICATION' }),
      Registration.countDocuments({ 'payment.status': 'VERIFIED' }),
      Registration.aggregate([
        { $match: { 'payment.status': 'VERIFIED' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]).then((result) => (result.length > 0 ? result[0].total : 0)),
      PricingConfig.findOne().select('events').lean(),
      PricingConfig.findOne().select('workshops').lean(),
    ]);

    const recentRegistrations = await Registration.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        registrations: {
          total: totalRegistrations,
          byStatus: {
            pending: pendingRegistrations,
            payment_submitted: paymentSubmitted,
            payment_verified: verifiedRegistrations,
            confirmed: confirmedRegistrations,
            rejected: rejectedRegistrations,
          },
        },
        payments: {
          pending: pendingPayments,
          totalVerified: totalPaymentsVerified,
          totalRevenue,
        },
        events: (eventsData?.events || []).length,
        workshops: (workshopsData?.workshops || []).length,
        recentRegistrations,
      },
      message: 'Dashboard statistics retrieved successfully',
    });
  } catch (err) {
    logger.error(`Dashboard stats error: ${err.message}`);
    next(err);
  }
}
