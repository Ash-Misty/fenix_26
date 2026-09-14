import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  published: { type: Boolean, default: true },
}, { timestamps: true });

announcementSchema.index({ published: 1 });
announcementSchema.index({ createdAt: -1 });

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
