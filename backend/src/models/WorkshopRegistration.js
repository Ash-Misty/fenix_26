import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const workshopRegistrationSchema = new mongoose.Schema({
  registrationId: { type: String, required: true, unique: true, immutable: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  college: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1, max: 5 },
  foodPreference: { type: String, required: true, enum: ['Vegetarian', 'Non-vegetarian'] },
  workshopName: { type: String, default: 'Data Science with AI Technology' },
  totalAmount: { type: Number, required: true, default: 250, immutable: true },
  payment: {
    status: { type: String, required: true, enum: ['pending', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED'], default: 'pending' },
    qrPayload: { type: String, trim: true },
    screenshotUrl: { type: String, trim: true },
    screenshotPublicId: { type: String, trim: true },
    uploadedAt: Date,
    verifiedAt: Date,
    verifiedBy: { type: String, trim: true },
  },
  registrationStatus: { type: String, required: true, enum: ['pending', 'payment_submitted', 'confirmed', 'rejected'], default: 'pending' },
}, { timestamps: true });

workshopRegistrationSchema.pre('validate', function (next) {
  if (!this.registrationId) this.registrationId = `WS26-${randomUUID().slice(0, 8).toUpperCase()}`;
  next();
});

workshopRegistrationSchema.index({ email: 1 });
workshopRegistrationSchema.index({ registrationStatus: 1, createdAt: -1 });

export default mongoose.model('WorkshopRegistration', workshopRegistrationSchema);
