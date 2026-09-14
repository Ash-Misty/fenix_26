import Announcement from '../models/Announcement.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

export async function createAnnouncement(req, res, next) {
  try {
    const { title, content } = req.body;
    const author = req.admin?.name || 'Admin';

    const announcement = new Announcement({ title, content, author, published: true });
    await announcement.save();
    logger.info(`Announcement created: ${title}`);

    res.status(201).json({
      success: true,
      data: announcement,
      message: 'Announcement created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getAnnouncements(req, res, next) {
  try {
    const announcements = await Announcement.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: { announcements },
      message: 'Announcements retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getAnnouncementById(req, res, next) {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id).lean();

    if (!announcement) {
      throw new AppError('Announcement not found', 404, 'ANNOUNCEMENT_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: announcement,
      message: 'Announcement retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAnnouncement(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      throw new AppError('Announcement not found', 404, 'ANNOUNCEMENT_NOT_FOUND');
    }

    if (title !== undefined) announcement.title = title;
    if (content !== undefined) announcement.content = content;
    if (published !== undefined) announcement.published = published;

    await announcement.save();
    logger.info(`Announcement updated: ${id}`);

    res.status(200).json({
      success: true,
      data: announcement,
      message: 'Announcement updated successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAnnouncement(req, res, next) {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      throw new AppError('Announcement not found', 404, 'ANNOUNCEMENT_NOT_FOUND');
    }

    logger.info(`Announcement deleted: ${id}`);

    res.status(200).json({
      success: true,
      data: { message: 'Announcement deleted successfully' },
      message: 'Announcement deleted successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllAnnouncements(req, res, next) {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      data: { announcements },
      message: 'Announcements retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}
