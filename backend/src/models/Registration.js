import mongoose from 'mongoose';
import { generateRegistrationId } from '../utils/generateRegistrationId.js';

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  foodPreference: { type: String, required: true, enum: ['Vegetarian', 'Non-vegetarian'] },
}, { _id: false });

const foodPreferenceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  preference: { type: String, required: true, enum: ['Vegetarian', 'Non-vegetarian'] },
}, { _id: false });

const selectedEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventName: { type: String, required: true },
  category: { type: String, required: true, enum: ['Technical', 'Non-Technical'] },
  amount: { type: Number, required: true, min: 0 },
});

const workshopSchema = new mongoose.Schema({
  workshopId: { type: String, required: true },
  workshopName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
});

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['pending', 'PENDING_VERIFICATION', 'VERIFIED', 'REJECTED'],
    default: 'pending',
  },
  transactionId: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 },
  qrPayload: { type: String, trim: true },
  upiPayload: { type: String, trim: true },
  screenshotUrl: { type: String, trim: true },
  screenshotPublicId: { type: String, trim: true },
  uploadedAt: { type: Date },
  verifiedAt: { type: Date },
  verifiedBy: { type: String, trim: true },
  rejectedAt: { type: Date },
  rejectionReason: { type: String, trim: true },
});

const registrationSchema = new mongoose.Schema({
  registrationId: {
    type: String,
    unique: true,
    sparse: true,
  },
  submissionKey: { type: String, unique: true, sparse: true, immutable: true },
  teamName: { type: String, required: true, trim: true },
  teamLeader: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  college: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1, max: 5 },
  registrationType: {
    type: String,
    required: true,
    enum: ['Individual', 'Team'],
  },
  participants: [participantSchema],
  foodPreferences: [foodPreferenceSchema],
  selectedEvents: [selectedEventSchema],
  workshops: [workshopSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  foodPreference: {
    type: String,
    enum: ['Vegetarian', 'Non-vegetarian'],
    default: 'Vegetarian',
  },
  payment: paymentSchema,
  registrationStatus: {
    type: String,
    required: true,
    enum: ['pending', 'payment_submitted', 'payment_verified', 'confirmed', 'rejected'],
    default: 'pending',
  },
  emailsSent: {
    confirmation: { type: Boolean, default: false },
    adminNotification: { type: Boolean, default: false },
  },
}, { timestamps: true });

registrationSchema.index({ email: 1 });
registrationSchema.index({ phone: 1 });
registrationSchema.index({ 'payment.transactionId': 1 }, { sparse: true });
registrationSchema.index({ registrationStatus: 1 });
registrationSchema.index({ createdAt: -1 });

registrationSchema.pre('save', function (next) {
  if (!this.registrationId) {
    this.registrationId = generateRegistrationId();
  }
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
