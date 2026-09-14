import Contact from '../models/Contact.js';
import { sendEmail } from '../config/mail.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function createContact(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = new Contact({ name, email, phone, subject, message });
    await contact.save();
    logger.info(`Contact created: ${email}`);

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const html = `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `;
        await sendEmail(adminEmail, `FENIX26 Contact Form - ${subject}`, html);
      }
    } catch (err) {
      logger.warn(`Contact notification email failed: ${err.message}`);
    }

    res.status(201).json({
      success: true,
      data: { id: contact._id.toString(), message: 'Contact enquiry submitted successfully' },
      message: 'Contact enquiry submitted successfully',
    });
  } catch (err) {
    next(err);
  }
}
